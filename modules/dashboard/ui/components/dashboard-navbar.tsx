"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import {
  MenuIcon,
  SearchIcon
} from "lucide-react"
import { DashboardCommand } from "./dashboard-command"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

export const DashboardNavbar = () => {
  const { toggleSidebar, isMobile } = useSidebar()
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

      <nav className="sticky top-2 md:top-0 z-40 mx-2 md:mx-0 flex justify-between items-center bg-background/70 border md:border-b backdrop-blur-xs shadow-md px-4 py-5 md:py-3 rounded-full md:rounded-none">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">
          {/* Desktop: Search bar + Menu button */}
          <Button
            className="hidden md:flex size-9 border border-border shadow-primary/80 shadow-xs rounded-full transition-all"
            variant="ghost"
            onClick={toggleSidebar}
          >
            <MenuIcon size="16" />
          </Button>

          <Button
            onClick={() => setCommandOpen((open) => !open)}
            variant="outline"
            size="sm"
            className="hidden md:flex h-9 w-[240px] bg-background shadow-primary/80 justify-start font-normal shadow-xs rounded-full transition-all"
          >
            <SearchIcon className="mr-2 h-4 w-4" /> Search
            <kbd className="ml-auto pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </Button>

          {/* Mobile: Logo */}
          <Link href='/' className="md:hidden relative cursor-pointer">
            <Image
              src="/logo.svg"
              height={36}
              width={36}
              alt="Meet.AI"
              className="filter drop-shadow-md brightness-110 dark:brightness-125 not-md:ml-2"
            />
            <div className="absolute inset-0 bg-primary/50 rounded-full blur-sm animate-pulse-slow not-md:ml-2" />
          </Link>

          <Link href='/' className="md:hidden text-xl font-semibold">Meet<span className="text-green-500">.AI</span></Link>
        </div>

        {/* RIGHT SECTION (Only on Mobile) */}
        <div className="flex items-center gap-1 md:hidden">
          <Button
            onClick={() => setCommandOpen((open) => !open)}
            variant="outline"
            size="sm"
            className="flex h-9 w-[120px] bg-background justify-start font-normal rounded-full transition-all"
          >
            <SearchIcon className="mr-2 h-4 w-4" /> Search
          </Button>

          <Button
            variant="ghost"
            className="size-9"
            onClick={toggleSidebar}
          >
            <MenuIcon size="16" />
          </Button>
        </div>
      </nav>
    </>
  )
}