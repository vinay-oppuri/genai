'use client'

import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, HomeIcon, BadgeCheckIcon, WalletIcon, HelpCircleIcon, MenuIcon } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Home", href: "#", icon: <HomeIcon className="h-5 w-5" /> },
    { name: "Features", href: "#features", icon: <BadgeCheckIcon className="h-5 w-5" /> },
    { name: "Pricing", href: "/dashboard/upgrade", icon: <WalletIcon className="h-5 w-5" /> },
    { name: "FAQ", href: "#faq", icon: <HelpCircleIcon className="h-5 w-5" /> },
]

export const Sidebar = () => {
    const [open, setOpen] = useState(false)
    const { setTheme, theme } = useTheme()

    const handleClick = () => setOpen(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MenuIcon size="16"/>
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[235px] p-3 bg-sidebar/80 backdrop-blur-xs text-white shadow-xl">

                <Link href="/" className="flex items-center gap-3 px-7 py-5" onClick={handleClick}>
                    <div className="relative">
                        <Image src="/logo.svg" width={36} height={36} alt="Meet.AI" className="drop-shadow-md dark:brightness-125" />
                        <div className="absolute inset-0 bg-primary/50 rounded-full blur-sm animate-pulse-slow pointer-events-none" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-muted dark:text-gray-100">Meet <span className="text-primary">.AI</span></span>

                </Link>

                {/* Navigation */}
                <nav className="flex flex-col gap-3">
                    {navItems.map((item) => {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleClick}
                                className={cn(
                                    "flex items-center w-full h-10 gap-3 px-4 rounded-lg text-sidebar-foreground text-sm transition-all hover:bg-white/10",
                                )}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                {/* Theme Toggle */}
                <div className="mt-8 px-1 pt-6 border-t flex items-center justify-between text-sidebar-foreground">
                    <span className="text-sm font-medium">Theme</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-blue-500" />}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}
