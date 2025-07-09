"use client"

import { ResponsiveDialog } from "@/components/responsive-dialog"
import { Button } from "@/components/ui/button"

interface NewAgentDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const NewAgentDialog = ({
    open,
    onOpenChange
}: NewAgentDialogProps) => {

    return (
        <ResponsiveDialog
            title="New Agent"
            description="Create a new agent"
            open={open}
            onOpenChange={onOpenChange}
        >
            <Button className="w-full">Some Action</Button>
        </ResponsiveDialog>
    )
}