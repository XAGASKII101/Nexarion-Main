"use client"

import {
  MessageSquare,
  Instagram,
  Mail,
  Mic,
  Bot,
  Zap,
  Clock,
  Users,
  TrendingUp,
  Shield,
  Smartphone,
  Globe,
} from "lucide-react"

export function EnhancedFeatures() {
  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp Automation",
      description: "Instantly respond to WhatsApp messages with AI that sounds exactly like you",
      color: "from-green-500 to-emerald-500",
      highlight: "99.9% Uptime",
    },
    {
      icon: Instagram,
      title: "Instagram Integration",
      description: "Convert comments and DMs into customers with personalized AI responses",
      color: "from-pink-500 to-rose-500",
      highlight: "Real-time Sync",
    },
    {
      icon: Mail,
      title: "Email Sequences",
      description: "Automated email follow-ups that nurture leads into paying customers",
      color: "from-blue-500 to-cyan-500",
      highlight: "Smart Timing",
    },
    {
      icon: Mic,
      title: "Voice Cloning",
      description: "Clone your voice for audio responses that build authentic connections",
      color: "from-purple-500 to-violet-500",
      highlight: "Studio Quality",
    },
    {
      icon: Bot,
      title: "AI Personality",
      description: "Train AI to match your brand voice and communication style perfectly",
      color: "from-orange-500 to-amber-500",
      highlight: "Brand Aligned",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Respond to customers in under 3 seconds, 24/7 without breaks",
      color: "from-yellow-500 to-orange-500",
      highlight: "<3s Response",
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "AI learns optimal timing for maximum engagement and conversions",
      color: "from-indigo-500 to-purple-500",
      highlight: "Peak Times",
    },
    {
      icon: Users,
      title: "Lead Scoring",
      description: "Automatically identify and prioritize your hottest prospects",
      color: "from-teal-500 to-cyan-500",
      highlight: "Hot Leads",
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track conversions, response rates, and ROI in real-time",
      color: "from-emerald-500 to-teal-500",
      highlight: "Live Data",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption keeps your customer data safe and secure",
      color: "from-slate-500 to-gray-500",
      highlight: "256-bit SSL",
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Manage your automations on-the-go with our mobile-first design",
      color: "from-red-500 to-pink-500",
      highlight: "iOS & Android",
    },
    {
      icon: Globe,
      title: "Multi-Language",
      description: "Communicate with customers in 50+ languages automatically",
      color: "from-violet-500 to-purple-500",
      highlight: "50+ Languages",
    },
  ]

  return (
    <section id="features" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Automate Success
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Powerful features that work together to transform every interaction into revenue
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              {/* Gradient Background on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <span className="text-xs bg-slate-700/50 text-slate-300 px-2 py-1 rounded-full">
                    {feature.highlight}
                  </span>
                </div>
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors">{feature.description}</p>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-400 mb-6">Ready to see these features in action?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="border border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
