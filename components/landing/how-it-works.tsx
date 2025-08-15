import { ArrowRight, MessageCircle, Settings, Zap } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: Settings,
      title: "Connect Your Accounts",
      description: "Link your Instagram, WhatsApp, and Gmail accounts in seconds.",
    },
    {
      icon: MessageCircle,
      title: "Train Your AI",
      description: "Upload your voice sample and customize your AI responses.",
    },
    {
      icon: Zap,
      title: "Automate Everything",
      description: "Sit back and watch as your AI handles all incoming messages.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get started in just 3 simple steps and transform your social media presence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <step.icon className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-muted-foreground text-lg">{step.description}</p>
              {index < steps.length - 1 && (
                <ArrowRight className="w-8 h-8 text-muted-foreground mx-auto mt-8 hidden md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
