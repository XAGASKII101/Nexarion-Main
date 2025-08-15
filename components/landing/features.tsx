import { Bot, MessageSquare, Mic, Zap, Shield, BarChart3 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Features() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Responses",
      description: "Smart AI that understands context and responds naturally to your audience.",
    },
    {
      icon: MessageSquare,
      title: "Multi-Platform Support",
      description: "Connect Instagram, WhatsApp, and Gmail all in one dashboard.",
    },
    {
      icon: Mic,
      title: "Voice Cloning",
      description: "Clone your voice for personalized audio messages and responses.",
    },
    {
      icon: Zap,
      title: "Real-Time Automation",
      description: "Instant responses that keep your audience engaged 24/7.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security to protect your data and conversations.",
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track performance, engagement, and conversion metrics in real-time.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to automate your social media presence and never miss a lead.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
