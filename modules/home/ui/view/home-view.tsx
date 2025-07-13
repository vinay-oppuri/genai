"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function HomeView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-black text-gray-900 dark:text-gray-100 flex flex-col font-sans relative overflow-hidden">
      

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-black/10 dark:border-white/10 backdrop-blur-xl bg-white/60 dark:bg-black/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Image src="/logo.svg" height={40} width={40} alt="Meet.AI" className="filter drop-shadow-md brightness-110 dark:brightness-125"/>
              <div className="absolute inset-0 bg-primary/50 rounded-full blur-sm animate-pulse-slow"></div>
            </div>
            <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-1">
              Meet<span className="text-primary">.AI</span>
            </Link>
          </div>

          <nav className="flex items-center gap-4 text-sm font-medium">
            {[
              { label: "Features", href: "/#features" },
              { label: "Pricing", href: "/#pricing" },
              { label: "FAQ", href: "/#faq" }
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hidden md:flex text-gray-700 dark:text-gray-300 hover:text-primary transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <Link href="/sign-in">
              <Button variant="ghost" className="text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-primary transition-colors duration-300">
                Login
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white dark:text-black shadow-lg shadow-primary/30 transition-all duration-300">Sign Up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 md:px-6 py-12 md:py-20 relative z-10">
        <section className={cn(
          "max-w-4xl text-center space-y-8 p-8 md:p-12 rounded-3xl relative overflow-hidden",
          "bg-white/70 dark:bg-white/5 backdrop-blur-2xl border border-black/10 dark:border-white/10",
          "shadow-2xl shadow-primary/10 dark:shadow-blue-500/10",
          "transition-all duration-500 ease-in-out hover:scale-[1.01]"
        )}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 blur-xl pointer-events-none rounded-3xl"></div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight text-black dark:text-white relative z-10">
            Run Smarter Meetings with <span className="text-primary drop-shadow-lg shadow-primary">AI Agents</span>
          </h2>
          <p className="text-md sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto relative z-10">
            Create intelligent agents, assign them to meetings, and automate your decision workflows. Let AI handle summaries, notes, and action items.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white dark:text-black font-semibold py-3 px-8 rounded-full shadow-xl shadow-primary/40 transition-all duration-300 hover:scale-105"
              >
                Start Free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Login
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Tailwind animation for logo glow */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.6;
            transform: scale(1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  )
}
