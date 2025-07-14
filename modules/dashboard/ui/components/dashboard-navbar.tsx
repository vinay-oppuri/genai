"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { Menu, MenuIcon, PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"
import { DashboardCommand } from "./dashboard-command"
import { useEffect, useState } from "react"

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar()
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      
      <nav className="sticky top-0 z-40 w-full bg-background/80 border-b backdrop-blur-xs shadow-sm px-4 py-3 flex items-center gap-3">
        <Button
          className="size-9 border border-border shadow-primary/80 shadow-xs rounded-full transition-all"
          variant="ghost"
          onClick={toggleSidebar}
        >
          <MenuIcon size="16"/>
        </Button>

        <Button
          onClick={() => setCommandOpen((open) => !open)}
          variant="outline"
          size="sm"
          className="h-9 w-[240px] bg-background shadow-primary/80 justify-start font-normal shadow-xs rounded-full transition-all"
        >
          <SearchIcon className="mr-2 h-4 w-4" />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  )
}