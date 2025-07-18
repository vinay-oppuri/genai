"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession } from "@/lib/auth-client"
import { MenuIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export const HomeView = () => {
  const { data: session } = useSession()
  const { setTheme, theme } = useTheme()

  const headers = [
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ]

  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col font-sans relative overflow-x-hidden">
      {/* headers */}
      <header className="fixed top-1 md:top-0 left-1 md:left-0 right-1 md:right-0 md:mx-0 z-50  backdrop-blur-xs border md:border-none bg-background/70 p-4 rounded-full md:rounded-none">
        <div className="flex items-center justify-between md:mx-30">
          <div className="flex items-center gap-3">
            <Link href='/' className="flex relative cursor-pointer">
              <Image
                src="/logo.svg"
                height={36}
                width={36}
                alt="Meet.AI"
                className="filter drop-shadow-md brightness-110 dark:brightness-125 not-md:ml-2"
              />
              <div className="absolute inset-0 bg-primary/50 rounded-full blur-sm animate-pulse-slow not-md:ml-2" />
            </Link>
            <div className="text-foreground text-xl font-semibold">Meet<span className="text-green-500">.AI</span></div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium border-2 rounded-lg px-8 py-3">
            {headers.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground hover:scale-105 transition-transform">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-foreground">
            <Link href="/dashboard">
              <Button className="rounded-full w-30 bg-primary/80 backdrop-blur-xs">
                {session ? "Dashboard" : "Get Started"}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hidden md:flex"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="md:hidden">
                  <MenuIcon className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-background/70 backdrop-blur-xs font-medium w-40">
                {headers.map((item) => (
                  <DropdownMenuItem asChild key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex justify-between items-center"
                >
                  Theme
                  {theme === "dark" ? <Sun className="w-4 h-4 ml-2" /> : <Moon className="w-4 h-4 ml-2" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

        </div>
      </header>

      {/* Main Hero Section */}
      <main className="flex-1 flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <section className="max-w-7xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground drop-shadow-lg">
              Run Smarter Meetings with{" "}
              <span className="text-green-500">AI Agents</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
              Create intelligent agents, assign them to meetings, and automate your decision workflows. Let AI handle summaries, notes, and action items.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/sign-up">
                <Button className="bg-green-500 text-white font-semibold py-3 w-40 sm:w-32 rounded-full shadow-lg shadow-green-500/40 transition-all duration-300 hover:scale-105">
                  Start Free
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="border-primary text-primary bg-transparent rounded-full w-40 sm:w-28">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          {/* Image / Agent Visual */}
          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[500px] lg:h-[500px]">
              <Image
                src="/agent.jpg"
                alt="Agent"
                layout="fill"
                objectFit="contain"
                className="rounded-full brightness-75 contrast-125 saturate-150 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}