"use client"

import { Star, Users, TrendingUp, Zap } from "lucide-react"

export function SocialProof() {
  const companies = ["TechCorp", "InnovateLab", "GrowthCo", "ScaleUp", "NextGen", "FutureFlow"]

  const metrics = [
    { icon: Users, value: "5,000+", label: "Active Users" },
    { icon: TrendingUp, value: "300%", label: "Avg. Lead Increase" },
    { icon: Zap, value: "24/7", label: "Automation Uptime" },
    { icon: Star, value: "4.9/5", label: "User Rating" },
  ]

  return (
    <section className="py-20 bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Indicators */}
        <div className="text-center mb-16">
          <p className="text-slate-400 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-slate-500 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <metric.icon className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-slate-400 text-sm">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Social Proof Statement */}
        <div className="text-center mt-16">
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            "NexarionAI transformed our customer engagement. We're now converting 3x more leads with automated responses
            that sound completely human."
          </p>
          <p className="text-slate-500 mt-2">- Sarah Chen, Marketing Director</p>
        </div>
      </div>
    </section>
  )
}
