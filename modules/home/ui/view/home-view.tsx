"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useSession } from "@/lib/auth-client"
import { LogInIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function HomeView() {
  const { data: session } = useSession()
  const { setTheme, theme } = useTheme()

  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col font-sans relative overflow-hidden">
      {/* Background Grid and Glow */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-grid-small-white/10 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000,transparent)]"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 z-50 w-full backdrop-blur-sm border-b bg-background/70 shadow-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.svg" height={40} width={40} alt="Meet.AI" className="drop-shadow-md brightness-110" />
            <Link href="/" className="text-xl sm:text-2xl font-bold text-foreground tracking-tight flex items-center gap-1">
              Meet<span className="text-green-500">.AI</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {[
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/#pricing" },
              { label: "FAQ", href: "/#faq" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground hover:scale-105 transition-transform">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-foreground">
            {session ? (
              <Link href="/dashboard">
                <Button>
                  <LogInIcon className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button className="rounded-full">
                  Get Started
                </Button>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
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