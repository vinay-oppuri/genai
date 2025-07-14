"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import {
  VideoIcon, BotIcon, StarIcon, Sun, Moon,
  LayoutDashboardIcon
} from "lucide-react"

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
  { icon: LayoutDashboardIcon, label: "Dashboard", href: "/dashboard" },
  { icon: VideoIcon, label: "Meetings", href: "/dashboard/meetings" },
  { icon: BotIcon, label: "Agents", href: "/dashboard/agents" }
]

const secondSection = [
  { icon: StarIcon, label: "Upgrade", href: "/upgrade" },
]

export const DashboardSidebar = () => {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar>
      
      {/* Logo & Brand */}
      <SidebarHeader className="flex items-center mt-6 mb-4 px-4 mr-2">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => isMobile && setOpenMobile(false)}
        >
          <div className="relative">
            <Image src="/logo.svg" width={36} height={36} alt="Meet.AI" className="drop-shadow-md dark:brightness-125" />
            <div className="absolute inset-0 bg-primary/50 rounded-full blur-sm animate-pulse-slow pointer-events-none" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-muted dark:text-gray-100">Meet <span className="text-primary">.AI</span></span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item) => (
                <SidebarMenuItem key={item.href} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 rounded-lg border border-transparent hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:scale-105",
                      pathname === item.href && "bg-primary/10 text-primary font-semibold shadow-primary/10 shadow-xl"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      onClick={() => isMobile && setOpenMobile(false)}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="size-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Secondary Links */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href} className="p-1">
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "h-10 rounded-lg border border-transparent hover:bg-yellow-400/10 hover:text-yellow-500 transition-all duration-300 hover:scale-105",
                      pathname === item.href && "bg-yellow-400/10 text-yellow-600 font-semibold shadow-yellow-400/10 shadow-xl"
                    )}
                    isActive={pathname === item.href}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="size-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Theme Toggle */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex items-center justify-between mt-6 px-2 pt-4 border-t border-border">
                <span className="text-sm font-medium">Theme</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-500" />}
                </Button>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="text-foreground py-4">
        {!isMobile && <DashboardUserButton />}
      </SidebarFooter>
    </Sidebar>
  )
}