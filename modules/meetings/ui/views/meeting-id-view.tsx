"use client"

import { LoadingState } from "@/components/loading-state"
import { useTRPC } from "@/trpc/client"
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query"
import { MeetingIdViewHeader } from "../components/meeting-id-view-header"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useConfirm } from "@/hooks/use-confirm"
import { UpdateMeetingDialog } from "../components/update-meeting-dialog"
import { useState } from "react"
import { UpcomingState } from "../components/upcoming-state"
import { ActiveState } from "../components/active-state"
import { CancelledState } from "../components/cancelled-state"
import { ProcessingState } from "../components/processing-state"
import { CompletedState } from "../components/completed-state"

interface Props {
    meetingId: string
}

export const MeetingIdView = ({ meetingId }: Props) => {
    const [UpdateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)

    const trpc = useTRPC()
    const queryClient = useQueryClient()
    const router = useRouter()

    const { data } = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({ id: meetingId })
    )

    const isActive = data.status === "active"
    const isUpcoming = data.status === "upcoming"
    const isCancelled = data.status === "cancelled"
    const isCompleted = data.status === "completed"
    const isProcessing = data.status === "processing"

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting."
    )


    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: async () => {
                await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                await queryClient.invalidateQueries(
                    trpc.premium.getFreeUsage.queryOptions()
                )
                router.push('/dashboard/meetings')
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    )

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove()
        if (!ok) return

        await removeMeeting.mutateAsync({ id: meetingId })
    }

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog
                open={UpdateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader
                    meetingId={meetingId}
                    meetingName={data.name}
                    onEdit={() => setUpdateMeetingDialogOpen(true)}
                    onRemove={handleRemoveMeeting}
                />
                {isCompleted && <CompletedState data={data} />}
                {isProcessing && <ProcessingState />}
                {isCancelled && <CancelledState />}
                {isActive && <ActiveState meetingId={meetingId} />}
                {isUpcoming && <UpcomingState meetingId={meetingId} />}
            </div>
        </>
    )
}

export const MeetingIdViewLoading = () => {
    return (
        <LoadingState
            title="Loading Meeting"
            description="This may take a few seconds"
        />
    )
}

export const MeetingIdViewError = () => {
    return (
        <LoadingState
            title="Error Loading Meetinf"
            description="Please try again later"
        />
    )
}