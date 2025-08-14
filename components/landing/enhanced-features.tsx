"use client"

import { MessageSquare, Instagram, Mail, Mic, Zap, Shield, BarChart3, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EnhancedFeatures() {
  const features = [
    {
      icon: MessageSquare,
      title: "WhatsApp Automation",
      description:
        "Automate customer support, lead qualification, and sales conversations on WhatsApp with AI that understands context.",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Instagram,
      title: "Instagram DM Management",
      description:
        "Respond to Instagram direct messages instantly, engage with followers, and convert social interactions into sales.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      icon: Mail,
      title: "Gmail Integration",
      description:
        "Smart email responses, automated follow-ups, and intelligent email categorization to never miss important messages.",
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      icon: Mic,
      title: "AI Voice Cloning",
      description:
        "Clone your voice for phone calls and voice messages. Maintain personal touch while scaling your communication.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      icon: Zap,
      title: "Smart Workflows",
      description:
        "Create custom automation workflows that trigger based on keywords, sentiment, or customer behavior patterns.",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description:
        "Bank-level encryption, GDPR compliance, and secure data handling to protect your business and customers.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Track response times, customer satisfaction, conversion rates, and ROI with detailed analytics and insights.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Your AI assistant never sleeps. Provide instant responses to customers across all time zones and holidays.",
      color: "text-teal-600",
      bgColor: "bg-teal-50",
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Everything You Need to Automate Customer Communication
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powerful AI features that work together to transform how you interact with customers across all platforms.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardHeader className="pb-4">
                <div
                  className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
