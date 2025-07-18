"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MenuIcon, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export const HomeView = () => {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false) 

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  const headers = [
    { label: "Home", href: "#home" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "/dashboard/upgrade" },
    { label: "FAQ", href: "#faq" },
  ]

  const features = [
    { title: "Unlimited Agents", desc: "Create as many AI agents as you need to manage your meetings." },
    { title: "Intelligent Summaries", desc: "Receive clear, actionable summaries and decisions post-meeting." },
    { title: "Agent Assignment", desc: "Assign AI agents to meetings to handle notes, tasks, and follow-ups." },
  ]

  const faqs = [
    { q: "Can I cancel my plan anytime?", a: "Yes, you can cancel your subscription at any time from your dashboard." },
    { q: "What does '2 months free' mean?", a: "If you choose the yearly plan, you get 12 months for the price of 10 months." },
    { q: "Is there a team discount?", a: "For enterprise teams or special requests, reach out via our contact form for custom pricing." },
  ]

  return (
    <div className="min-h-screen bg-background text-gray-100 flex flex-col font-sans relative overflow-x-hidden">

      <header className="fixed top-1 md:top-0 left-1 md:left-0 right-1 md:right-0 md:mx-0 z-50 backdrop-blur-sm border md:border-none bg-background/70 px-4 py-3 rounded-full md:rounded-none">
        <div className="flex items-center justify-between md:mx-auto md:max-w-6xl">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex relative cursor-pointer">
              <Image
                src="/logo.svg"
                height={32}
                width={32}
                alt="Meet.AI"
                className="filter drop-shadow-md brightness-110 dark:brightness-125 ml-2 md:ml-0"
              />
              <div className="absolute inset-0 bg-primary/50 rounded-full blur-sm animate-pulse-slow ml-2 md:ml-0" />
            </Link>
            <div className="text-foreground text-lg sm:text-xl font-semibold">
              Meet<span className="text-green-500">.AI</span>
            </div>
          </div>



          <nav className="hidden md:flex items-center gap-5 text-sm font-medium border rounded-lg">
            {headers.map((item) => (
              <Link key={item.href} href={item.href} className="text-foreground hover:scale-105 transition-transform duration-200">
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 text-foreground">
            <Link href="/dashboard">
              <Button className="rounded-full text-sm px-4 py-2 bg-primary/80 backdrop-blur-xs">
                Get Started
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
                {mounted && (<DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex justify-between items-center"
                >
                  Theme {theme === "dark" ? <Sun className="w-4 h-4 ml-2" /> : <Moon className="w-4 h-4 ml-2" />}
                </DropdownMenuItem>)}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>



      <main className="flex-1 flex flex-col items-center justify-center pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <section id="home" className="max-w-7xl w-full mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">
          <div className="flex-1 text-center md:text-left space-y-4 sm:space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground drop-shadow-lg">
              Run Smarter Meetings with <span className="text-green-500">AI Agents</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
              Create intelligent agents, assign them to meetings, and automate your decision workflows. Let AI handle summaries, notes, and action items.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start">
              <Link href="/sign-up">
                <Button className="bg-green-500 text-white font-semibold px-6 py-3 rounded-full shadow-md shadow-green-500/40 transition-all duration-300 hover:scale-105 w-40">
                  Start Free
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button variant="outline" className="border-primary text-primary bg-transparent rounded-full w-40">
                  Login
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center md:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px]">
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

        <section id="features" className="max-w-6xl w-full mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-6 md:mb-12">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center text-muted-foreground">
            {features.map((feat) => (
              <div key={feat.title} className="bg-primary dark:bg-muted text-white px-6 py-5 rounded-2xl transition-all duration-300 hover:scale-105">
                <h3 className="font-semibold text-white mb-2 text-sm md:text-lg">{feat.title}</h3>
                <p className="text-sm md:text-base">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="max-w-4xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-6 md:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6 text-sm md:text-base text-white dark:text-muted-foreground bg-primary dark:bg-muted px-6 sm:px-10 py-8 rounded-2xl">
            {faqs.map(({ q, a }) => (
              <div key={q} className="flex flex-col gap-1">
                <h3 className="text-sm md:text-base font-medium text-white">{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}