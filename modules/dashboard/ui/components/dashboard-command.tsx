"use client"

import { Dispatch, SetStateAction, useState } from "react"
import {
    CommandResponsiveDialog,
    CommandInput,
    CommandItem,
    CommandList,
    CommandGroup,
    CommandEmpty,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { useTRPC } from "@/trpc/client"
import { useQuery } from "@tanstack/react-query"
import { GeneratedAvatar } from "@/components/generated-avatar"

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
    const router = useRouter()
    const [search, setSearch] = useState('')

    const trpc = useTRPC()
    const meetings = useQuery(trpc.meetings.getMany.queryOptions({search, pageSize: 100}))
    const agents = useQuery(trpc.agents.getMany.queryOptions({search, pageSize: 100}))


    return (
        <CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a meeting or agent..."
                value={search}
                onValueChange={setSearch}
            />
            <CommandList>
                <CommandGroup heading="Meetings">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No meetings found
                        </span>
                    </CommandEmpty>
                    {meetings.data?.items.map((meeting) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/dashboard/meetings/${meeting.id}`)
                                setOpen(false)
                            }}
                        >
                            {meeting.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandGroup heading="Agents">
                    <CommandEmpty>
                        <span className="text-muted-foreground text-sm">
                            No agents found
                        </span>
                    </CommandEmpty>
                    {agents.data?.items.map((agent) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/dashboard/agents/${agent.id}`)
                                setOpen(false)
                            }}
                        >
                            {agent.name}
                            <GeneratedAvatar
                                seed={agent.name}
                                variant="botttsNeutral"
                                className="size-5"
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    )
}