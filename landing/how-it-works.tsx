import { ArrowRight } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect Your Accounts",
      description:
        "Link your Instagram, WhatsApp, and email accounts in just a few clicks. No technical setup required.",
    },
    {
      step: "02",
      title: "Train Your AI",
      description:
        "Upload voice samples and customize your AI's personality to match your brand and communication style.",
    },
    {
      step: "03",
      title: "Set Up Workflows",
      description: "Create automated sequences: comment triggers → voice message → WhatsApp follow-up → email nurture.",
    },
    {
      step: "04",
      title: "Watch It Work",
      description:
        "Your AI handles conversations 24/7, qualifying leads and moving them through your sales funnel automatically.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            From Setup to Success in
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              4 Simple Steps
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            No coding, no complexity, no weeks of setup. Get your AI automation running in minutes, not months.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                <div className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-cyan-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
