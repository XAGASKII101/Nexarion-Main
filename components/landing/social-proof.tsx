"use client"

import { Star } from "lucide-react"

export function SocialProof() {
  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "1M+", label: "Messages Automated" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9/5", label: "User Rating" },
  ]

  const companies = ["TechCorp", "StartupXYZ", "GrowthCo", "ScaleUp", "InnovateLab", "FutureWorks"]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Rating */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-600">Trusted by thousands of businesses worldwide</p>
        </div>

        {/* Company Logos */}
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-8">Trusted by leading companies</p>
          <div className="grid grid-cols-3 gap-8 md:grid-cols-6 items-center opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-gray-400 font-semibold text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
