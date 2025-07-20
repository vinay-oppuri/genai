'use client'

import { Home, VideoIcon, BotIcon, LayoutDashboardIcon } from "lucide-react"
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/dashboard/agents', icon: BotIcon, label: 'Agents' },
  { href: '/dashboard/meetings', icon: VideoIcon, label: 'Meetings' },
  { href: '/dashboard', icon: LayoutDashboardIcon, label: 'Dashboard' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-1 left-1 right-1 z-50 md:hidden rounded-full border backdrop-blur-md bg-background/70 py-2 px-3">
      <div className="flex justify-between items-center">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center text-xs transition-all duration-200"
            >
              <div
                className={cn(
                  'w-11 h-11 flex items-center justify-center rounded-full transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'bg-transparent text-muted-foreground'
                )}
              >
                <Icon className="w-5 h-5"/>
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}