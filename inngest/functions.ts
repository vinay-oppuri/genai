import { inngest } from "./client";
import JSONL from "jsonl-parse-stringify"
import { StreamTranscription } from "@/modules/meetings/types";

export const meetingsProcessing = inngest.createFunction(
    {id: "meetings/processing"},
    {event: "meetings/processing"},
    async ({event, step}) => {
        const responce = await step.fetch(event.data.transcriptUrl)

        const transcript = await step.run("parse-transcript", async () => {
            const text  = await responce.text()
            return JSONL.parse<StreamTranscription>(text)
        })
    }
)