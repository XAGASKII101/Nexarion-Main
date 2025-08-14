"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Bot, Mic, BarChart3, Settings, Instagram, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/actions"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Automations", href: "/dashboard/automations", icon: Bot },
  { name: "Voice Clones", href: "/dashboard/voice", icon: Mic },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Integrations", href: "/dashboard/integrations", icon: Instagram },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col bg-slate-900/50 backdrop-blur-sm border-r border-slate-700/50">
      <div className="flex items-center px-6 py-6">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <Image src="/images/nexarion-logo.png" alt="Nexarion AI" width={32} height={32} className="rounded-lg" />
          <span className="text-xl font-bold text-white">Nexarion AI</span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === item.href
                ? "bg-gradient-to-r from-cyan-500/20 to-pink-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}
