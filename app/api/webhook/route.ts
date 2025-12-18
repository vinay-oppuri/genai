
import { and, eq, not } from "drizzle-orm"
import { ChatCompletionMessageParam } from "openai/resources/chat/completions"

import {
    MessageNewEvent,
    CallEndedEvent,
    CallTranscriptionReadyEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent,
    CallSessionStartedEvent
} from "@stream-io/node-sdk"

import { db } from "@/db"
import { agents, meetings } from "@/db/schema"
import { streamVideo } from "@/lib/stream-video"
import { NextRequest, NextResponse } from "next/server"
import { inngest } from "@/inngest/client"
import { GenerateAvatarUri } from "@/lib/avatar"
import { streamChat } from "@/lib/stream-chat"

// const openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

function verifySignatureWithSDK(body: string, signature: string): boolean {
    return streamVideo.verifyWebhook(body, signature)
}

export async function POST(req: NextRequest) {
    const signature = req.headers.get("x-signature")
    const apiKey = req.headers.get("x-api-key")

    if (!signature || !apiKey) {
        return NextResponse.json({ error: "Missing signature or API Key" }, { status: 400 })
    }

    const body = await req.text()

    if (!verifySignatureWithSDK(body, signature)) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    let payload: unknown
    try {
        payload = JSON.parse(body) as Record<string, unknown>
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
    }

    const eventType = (payload as Record<string, unknown>)?.type

    if (eventType === "call.session_started") {
        console.log("Webhook: call.session_started triggered");
        const event = payload as CallSessionStartedEvent
        const meetingId = event.call.custom?.meetingId
        console.log("Webhook: meetingId from payload:", meetingId);

        if (!meetingId) {
            console.error("Webhook: Missing meetingId");
            return NextResponse.json({ error: "Missing meetingId" })
        }

        const [existingMeeting] = await db
            .select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, meetingId),
                    not(eq(meetings.status, "cancelled")),
                    not(eq(meetings.status, "completed")),
                    not(eq(meetings.status, "active")),
                    not(eq(meetings.status, "processing"))
                )
            )

        console.log("Webhook: Existing meeting found:", !!existingMeeting);

        if (!existingMeeting) {
            console.log("Webhook: Meeting not found or already active/completed");
            return NextResponse.json({ status: "ignored" })
        }

        await db
            .update(meetings)
            .set({
                status: "active",
                startedAt: new Date()
            })
            .where(eq(meetings.id, existingMeeting.id))


        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(eq(agents.id, existingMeeting.agentId))

        console.log("Webhook: Existing agent found:", !!existingAgent, existingAgent?.id);

        if (!existingAgent) {
            console.error("Webhook: Agent not found");
            return NextResponse.json({ error: "Agent not found" }, { status: 404 })
        }

        const call = streamVideo.video.call("default", meetingId)
        console.log("Webhook: Connecting OpenAI...");
        try {
            const realtimeClient = await streamVideo.video.connectOpenAi({
                call,
                openAiApiKey: process.env.OPENAI_API_KEY!,
                agentUserId: existingAgent.id
            })
            console.log("Webhook: OpenAI connected successfully");

            realtimeClient.updateSession({
                instructions: existingAgent.instructions
            })
        } catch (error) {
            console.error("Webhook: Error connecting OpenAI:", error);
        }
    } else if (eventType === "call.session_participant_left") {
        const event = payload as CallSessionParticipantLeftEvent
        const meetingId = event.call_cid.split(":")[1]

        const call = streamVideo.video.call("default", meetingId)
        await call.end()

    } else if (eventType === "call.session_ended") {
        const event = payload as CallEndedEvent
        const meetingId = event.call.custom?.meetingId

        if (!meetingId) {
            return NextResponse.json({ error: "Missing meetingId" }, { status: 400 })
        }

        await db
            .update(meetings)
            .set({
                status: "processing",
                endedAt: new Date()
            })
            .where(and(eq(meetings.id, meetingId), eq(meetings.status, "active")))

    } else if (eventType === "call.transcription_ready") {
        const event = payload as CallTranscriptionReadyEvent
        const meetingId = event.call_cid.split(":")[1]

        const [updatedMeeting] = await db
            .update(meetings)
            .set({
                transcriptUrl: event.call_transcription.url,
            })
            .where(eq(meetings.id, meetingId))
            .returning()

        if (!updatedMeeting) {
            return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
        }

        await inngest.send({
            name: "dashboard/meetings/processing",
            data: {
                meetingId: updatedMeeting.id,
                transcriptUrl: updatedMeeting.transcriptUrl
            }
        })

    } else if (eventType === "call.recording_ready") {
        const event = payload as CallRecordingReadyEvent
        const meetingId = event.call_cid.split(":")[1]

        await db
            .update(meetings)
            .set({
                recordingUrl: event.call_recording.url
            })
            .where(eq(meetings.id, meetingId))

    } else if (eventType === "message.new") {
        const event = payload as MessageNewEvent

        const userId = event.user?.id
        const channelId = event.channel_id
        const text = event.message?.text

        if (!userId || !channelId || !text) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const [existingMeeting] = await db
            .select()
            .from(meetings)
            .where(
                and(
                    eq(meetings.id, channelId),
                    eq(meetings.status, "completed")
                )
            )

        if (!existingMeeting) {
            return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
        }

        const [existingAgent] = await db
            .select()
            .from(agents)
            .where(
                eq(agents.id, existingMeeting.agentId)
            )

        if (!existingAgent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 })
        }

        if (userId !== existingAgent.id) {
            const instructions = `
            You are an AI assistant helping the user revisit a recently completed meeting.
             Below is a summary of the meeting, generated from the transcript:
      
            ${existingMeeting.summary}
      
            The following are your original instructions from the live meeting assistant. Please continue to follow these behavioral guidelines as you assist the user:
      
            ${existingAgent.instructions}
      
            The user may ask questions about the meeting, request clarifications, or ask for follow-up actions.
            Always base your responses on the meeting summary above.
      
            You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
            If the summary does not contain enough information to answer a question, politely let the user know.
      
            Be concise, helpful, and focus on providing accurate information from the meeting and the ongoing conversation.
            `

            const channel = streamChat.channel("messaging", channelId)
            await channel.watch()

            const previousMessages = channel.state.messages
                .slice(-5)
                .filter((msg) => msg.text?.trim() !== "")
                .map<ChatCompletionMessageParam>((message) => ({
                    role: message.user?.id === existingAgent.id ? "assistant" : "user",
                    content: message.text || ""
                }))

            const geminiResponse = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [
                            {
                                role: "user",
                                parts: [{ text: instructions + "\n\n" + previousMessages.map(m => `${m.role}: ${m.content}`).join("\n") + "\n\nuser: " + text }]
                            }
                        ]
                    })
                }
            )

            const result = await geminiResponse.json()
            const GPTResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text

            if (!GPTResponseText) {
                return NextResponse.json({ error: "No response from Gemini" }, { status: 400 })
            }

            const avatarUrl = GenerateAvatarUri({ seed: existingAgent.name, variant: "botttsNeutral" })

            streamChat.upsertUser({
                id: existingAgent.id,
                name: existingAgent.name,
                image: avatarUrl
            })

            channel.sendMessage({
                text: GPTResponseText,
                user: {
                    id: existingAgent.id,
                    name: existingAgent.name,
                    image: avatarUrl
                }
            })
        }
    }

    return NextResponse.json({ status: "ok" })
}