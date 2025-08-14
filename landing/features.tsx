import { MessageSquare, Mic, Mail, Instagram, Smartphone, Zap } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: MessageSquare,
      title: "GPT-Style AI Chat",
      description:
        "Advanced AI that sounds like you, understanding context and maintaining natural conversations across all platforms.",
    },
    {
      icon: Mic,
      title: "Voice Cloning",
      description:
        "Clone your voice to send emotional, personalized voice notes that build deeper connections with your audience.",
    },
    {
      icon: Instagram,
      title: "Instagram Automation",
      description:
        "Automatically respond to comments, DMs, and mentions with intelligent, contextual replies that drive engagement.",
    },
    {
      icon: Smartphone,
      title: "WhatsApp Integration",
      description: "Seamlessly move conversations from Instagram to WhatsApp for more personal, direct communication.",
    },
    {
      icon: Mail,
      title: "Email Sequences",
      description: "Create smart email follow-up sequences that nurture leads and convert prospects into customers.",
    },
    {
      icon: Zap,
      title: "Smart Workflows",
      description: "Build complex automation workflows: IG comment → WhatsApp message → Email sequence, all automated.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Automate Success
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            The same powerful features that cost $5,000+ to build, now available to everyone at an affordable price.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
