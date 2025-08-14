"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-8 py-6 bg-slate-900/30 backdrop-blur-sm border-b border-slate-700/50">
      <div>
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search..."
            className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 w-64"
          />
        </div>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Bell className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}
