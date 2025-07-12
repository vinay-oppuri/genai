"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function HomeView() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border backdrop-blur-lg bg-white/40 dark:bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
          <Image src="/logo.svg" height={40} width={40} alt="Meet.AI"/>
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1">
            Meet<span className="text-primary">.AI</span>
          </Link></div>

          <nav className="flex items-center gap-4 text-sm font-medium">
            <Link
              href="/#features"
              className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#pricing"
              className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="hidden md:flex text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm font-medium">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>


      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-6 md:py-20">
        <section className={cn(
          "max-w-3xl text-center space-y-8 p-6 rounded-xl shadow-xl",
          "bg-white/30 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10"
        )}>
          <h2 className="text-4xl sm:text-6xl font-extrabold leading-tight tracking-tight">
            Run Smarter Meetings with <span className="text-primary">AI Agents</span>
          </h2>
          <p className="text-md sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create intelligent agents, assign them to meetings, and automate your decision workflows. Let AI handle summaries, notes, and action items.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">Start Free</Button>
            </Link>
            <Link href="/sign-in">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">Login</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}