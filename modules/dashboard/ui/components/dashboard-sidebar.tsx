"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"

import { VideoIcon, BotIcon, StarIcon, Sun, Moon } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"
import { DashboardUserButton } from "./dashboard-user-button"
import { Button } from "@/components/ui/button"

const firstSection = [
    { icon: VideoIcon, label: "Meetings", href: "/dashboard/meetings" },
    { icon: BotIcon, label: "Agents", href: "/dashboard/agents" }
]

const secondSection = [
    { icon: StarIcon, label: "Updrade", href: "/upgrade" },
]

export const DashboardSidebar = () => {
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()
    const { isMobile, setOpenMobile } = useSidebar()

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center text-sidebar-accent-foreground mr-5 mt-5">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-2 pt-2"
                    onClick={() => {
                        if (isMobile) setOpenMobile(false)
                    }}
                >
                    <Image src="/logo.svg" height={36} width={36} alt="Meet.AI" />
                    <p className="text-2xl font-semibold">Meet.AI</p>
                </Link>
            </SidebarHeader>
            <br />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {isMobile && <DashboardUserButton />}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {firstSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild
                                        className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                            pathname === item.href && "bg-linear-to-r/oklch"
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}
                                            onClick={() => {
                                                if (isMobile) setOpenMobile(false)
                                            }}
                                        >
                                            <item.icon className="size-5" />
                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <br />
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {secondSection.map((item) => (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton asChild
                                        className={cn(
                                            "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
                                            pathname === item.href && "bg-linear-to-r/oklchx`"
                                        )}
                                        isActive={pathname === item.href}
                                    >
                                        <Link href={item.href}>
                                            <item.icon className="size-5" />
                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {/* <SidebarMenuItem> */}
                            {/* <SidebarMenuButton asChild> */}
                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <span className="font-semibold">Theme</span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                    >
                                        {theme === "dark" ? <Sun /> : <Moon />}
                                    </Button>
                                </div>
                            {/* </SidebarMenuButton> */}
                        {/* </SidebarMenuItem> */}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarFooter className="text-white">
                {!isMobile && <DashboardUserButton />}
            </SidebarFooter>
        </Sidebar>
    )
}