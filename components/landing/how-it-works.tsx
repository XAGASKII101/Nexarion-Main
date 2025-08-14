"use client"

import { ArrowRight, Upload, Settings, Zap, TrendingUp } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: Upload,
      title: "Upload Your Voice",
      description: "Record 2-3 minutes of your voice and we'll create a perfect AI clone that sounds exactly like you.",
      color: "from-cyan-500 to-blue-500",
      time: "2 minutes",
    },
    {
      step: "02",
      icon: Settings,
      title: "Connect Your Platforms",
      description: "Link Instagram, WhatsApp, and email with one-click integrations. No technical skills required.",
      color: "from-purple-500 to-pink-500",
      time: "1 minute",
    },
    {
      step: "03",
      icon: Zap,
      title: "AI Starts Working",
      description: "Your AI assistant begins responding to customers instantly with your voice and personality.",
      color: "from-green-500 to-emerald-500",
      time: "Instant",
    },
    {
      step: "04",
      icon: TrendingUp,
      title: "Watch Revenue Grow",
      description: "Monitor conversions, track performance, and watch your business grow on autopilot.",
      color: "from-orange-500 to-red-500",
      time: "24/7",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Get Started in
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Under 5 Minutes
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            From setup to your first automated customer response - it's that simple
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 via-green-500 to-orange-500 opacity-30" />

              <div className="grid grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <div key={index} className="relative">
                    {/* Step Card */}
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105">
                      {/* Step Number */}
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
                      >
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>

                      {/* Icon */}
                      <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <step.icon className="w-8 h-8 text-slate-300" />
                      </div>

                      {/* Content */}
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                        <p className="text-slate-400 mb-4 text-sm leading-relaxed">{step.description}</p>
                        <div className="inline-flex items-center px-3 py-1 bg-slate-700/50 rounded-full">
                          <span className="text-xs text-slate-300">{step.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    {index < steps.length - 1 && (
                      <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div
                          className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}
                        >
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
                  <div className="flex items-start space-x-4">
                    {/* Step Number & Icon */}
                    <div className="flex-shrink-0">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center mb-3`}
                      >
                        <span className="text-white font-bold">{step.step}</span>
                      </div>
                      <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-slate-300" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                        <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                          {step.time}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>

                {/* Mobile Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-4">
                    <div
                      className={`w-8 h-8 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center`}
                    >
                      <ArrowRight className="w-4 h-4 text-white rotate-90" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
          <p className="text-slate-400 mb-8">Join thousands of entrepreneurs already using NexarionAI</p>
          <button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/25">
            Start Your Free Trial Now
          </button>
        </div>
      </div>
    </section>
  )
}
