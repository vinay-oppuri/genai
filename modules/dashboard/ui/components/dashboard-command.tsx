"use client"

import { Dispatch, SetStateAction } from "react"
import {
    CommandResponsiveDialog,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    return (
        <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting or agent"
            />
            <CommandList>
                <CommandItem>
                    <div className="flex flex-row items-center justify-center m-auto gap-x-4">
                        <p className="text-2xl font-medium text-muted-foreground">Search Here</p>
                    </div>
                </CommandItem>
            </CommandList>
        </CommandResponsiveDialog>
    )
}