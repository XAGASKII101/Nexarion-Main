"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  MessageSquare,
  Zap,
  Mic,
  Settings,
  CreditCard,
  Users,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Automations", href: "/dashboard/automations", icon: Zap },
  { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Voice Clone", href: "/dashboard/voice", icon: Mic },
  { name: "Integrations", href: "/dashboard/integrations", icon: Users },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Image src="/images/nexarion-logo.png" alt="NexarionAI" width={32} height={32} className="rounded-full" />
            <span className="text-lg font-semibold text-white">NexarionAI</span>
          </Link>
        )}
        {collapsed && (
          <Link href="/dashboard" className="flex items-center justify-center w-full">
            <Image src="/images/nexarion-logo.png" alt="NexarionAI" width={32} height={32} className="rounded-full" />
          </Link>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white hover:bg-slate-800",
                  collapsed && "justify-center",
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className={cn("h-5 w-5", !collapsed && "mr-3")} />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        {!collapsed && (
          <div className="text-xs text-slate-400">
            <p>© 2024 NexarionAI</p>
            <p>Version 1.0.0</p>
          </div>
        )}
      </div>
    </div>
  )
}
