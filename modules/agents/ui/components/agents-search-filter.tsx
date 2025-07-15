import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useAgentsFilters } from "../../hooks/use-agents-filters";

export const AgentsSearchFilter = () => {
    const [filters, setFilters] = useAgentsFilters()

    return (
        <div className="relative">
            <Input
                placeholder="Filter by name"
                value={filters.search}
                className="h-9 w-[240px] pl-10 rounded-full"
                onChange={(e) => setFilters({ search: e.target.value })}
            />
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/>
        </div>
    )
}