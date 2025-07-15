"use client"

import { Button } from "@/components/ui/button"
import { PlusIcon, X } from "lucide-react"
import { NewAgentDialog } from "./new-agent-dialog"
import { useState } from "react"
import { useAgentsFilters } from "../../hooks/use-agents-filters"
import { AgentsSearchFilter } from "./agents-search-filter"
import { DEFAULT_PAGE } from "@/constants"

export const AgentsListHeader = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [filters, setFilters] = useAgentsFilters()

    const isAntFilterModified = !!filters.search

    const onClearFilters = () => {
        setFilters({
            search: "",
            page: DEFAULT_PAGE
        })
    }

    return (
        <>
            <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
            <div className="flex flex-col px-4 md:px-8 py-8 gap-y-4">
                <div className="flex items-center justify-between p-1">
                    <h5 className="font-medium text-xl">My Agents</h5>
                    <Button onClick={() => { setIsDialogOpen(true) }} className="shadow-primary/40 shadow-md">
                        <PlusIcon /> <p className="hidden md:flex">New Agent</p>
                    </Button>
                </div>
                <div className="flex items-center gap-x-2 relative">
                    <AgentsSearchFilter />
                    {isAntFilterModified && (
                        <Button variant="outline" className="rounded-full" onClick={onClearFilters}>
                            <X className="text-muted-foreground"/> <p className="mr-3">Clear</p>
                        </Button>
                    )}
                </div>
            </div>
        </>
    )
}