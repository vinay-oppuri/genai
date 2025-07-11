"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NewMeetingDialog } from "./new-meeting-dialog"
import { useState } from "react"

export const MeetingsListHeader = () => {
    const [isDialogOen, setIsDialogOpen] = useState(false)

    return (
        <>
        <NewMeetingDialog
            open={isDialogOen}
            onOpenChange={setIsDialogOpen}
        />
            <div className="flex flex-col px-4 md:px-8 py-4 gap-y-4">
                <div className="flex items-center justify-between">
                    <h5 className="font-medium text-xl">My Meetings</h5>
                    <Button onClick={() => setIsDialogOpen(true)}>
                        <PlusIcon /> New Meetings
                    </Button>
                </div>
            </div>
        </>
    )
}