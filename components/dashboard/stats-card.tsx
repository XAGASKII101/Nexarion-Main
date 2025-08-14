"use client"

import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  trend: "up" | "down"
}

export function StatsCard({ title, value, change, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${trend === "up" ? "text-green-400" : "text-red-400"}`}>
          {trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span>{change}</span>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
        <p className="text-slate-400 text-sm">{title}</p>
      </div>
    </div>
  )
}
