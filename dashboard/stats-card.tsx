import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: LucideIcon
}

export function StatsCard({ title, value, change, changeType, icon: Icon }: StatsCardProps) {
  const changeColor = {
    positive: "text-green-400",
    negative: "text-red-400",
    neutral: "text-slate-400",
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-sm font-medium ${changeColor[changeType]}`}>{change}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </div>
  )
}
