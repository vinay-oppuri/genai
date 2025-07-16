import { and, eq, not } from "drizzle-orm"

import {
    CallEndedEvent,
    CallTranscriptionReadyEvent,
    CallSessionParticipantLeftEvent,
    CallRecordingReadyEvent,
    CallSessionStartedEvent,
} from "@stream-io/node-sdk"

import { db } from "@/db"
import { agents, meetings } from "@/db/schema"
import { streamVideo } from "@/lib/stream-video"
import { NextRequest, NextResponse } from "next/server"

// 👇 Gemini API utility
async function queryGemini(prompt: string): Promise<string> {
    const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        }
    )

    const data = await res.json()
    return (
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "I'm sorry, I couldn't process that."
    )
}

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
        const event = payload as CallSessionStartedEvent
        const meetingId = event.call.custom?.meetingId

        if (!meetingId) {
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

        if (!existingAgent) {
            return NextResponse.json({ error: "Agent not found" }, { status: 404 })
        }

        const call = streamVideo.video.call("default", meetingId)

        // 👇 Query Gemini using agent instructions
        const initialPrompt = existingAgent.instructions || "You are a helpful agent."
        const geminiResponse = await queryGemini(initialPrompt)

        console.log("Gemini Response:", geminiResponse)

        // Optional: Send as in-call message (text)
        // await call.chat.sendMessage({
        //     text: geminiResponse
        // })
    }

    else if (eventType === "call.session_participant_left") {
        const event = payload as CallSessionParticipantLeftEvent
        const meetingId = event.call_cid.split(":")[1]

        const call = streamVideo.video.call("default", meetingId)
        await call.end()
    }

    else if (eventType === "call.session_ended") {
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
    }

    else if (eventType === "call.transcription_ready") {
        const event = payload as CallTranscriptionReadyEvent
        const meetingId = event.call_cid.split(":")[1]

        const [updateMeeting] = await db
            .update(meetings)
            .set({
                transcriptUrl: event.call_transcription.url
            })
            .where(eq(meetings.id, meetingId))
            .returning()

        if (!updateMeeting) {
            return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
        }
    }

    else if (eventType === "call.recording_ready") {
        const event = payload as CallRecordingReadyEvent
        const meetingId = event.call_cid.split(":")[1]

        await db
            .update(meetings)
            .set({
                recordingUrl: event.call_recording.url
            })
            .where(eq(meetings.id, meetingId))
    }

    return NextResponse.json({ status: "ok" })
}