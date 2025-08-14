"use client"

import { ArrowRight, Settings, MessageCircle, BarChart } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: "1",
      icon: Settings,
      title: "Connect Your Platforms",
      description:
        "Link your WhatsApp, Instagram, Gmail, and other communication channels in minutes with our simple setup wizard.",
      color: "bg-blue-500",
    },
    {
      step: "2",
      icon: MessageCircle,
      title: "Train Your AI Assistant",
      description:
        "Customize your AI's personality, responses, and workflows to match your brand voice and business needs.",
      color: "bg-purple-500",
    },
    {
      step: "3",
      icon: BarChart,
      title: "Watch It Work",
      description:
        "Your AI handles customer inquiries 24/7 while you focus on growing your business. Monitor performance in real-time.",
      color: "bg-green-500",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From setup to automation in under 10 minutes. No technical expertise required.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-32">
              <ArrowRight className="h-8 w-8 text-gray-300" />
              <ArrowRight className="h-8 w-8 text-gray-300" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div
                  className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-gray-100">
                  <span className="text-sm font-bold text-gray-700">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
