import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 mb-8">
          <Zap className="w-4 h-4 text-cyan-400 mr-2" />
          <span className="text-sm text-slate-300">The Power of $5K AI Agents, Now for Everyone</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          AI Automation That
          <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Actually Works
          </span>
        </h1>

        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Automate Instagram, WhatsApp, and Email follow-ups with AI voice cloning for just{" "}
          <span className="text-cyan-400 font-semibold">$49/month</span>. No more $5,000 setups. No more weeks of
          development. Just results.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/auth/sign-up">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 px-8 py-4 text-lg bg-transparent"
          >
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="text-3xl font-bold text-cyan-400 mb-2">10x</div>
            <div className="text-slate-300">Faster Setup</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="text-3xl font-bold text-pink-400 mb-2">99%</div>
            <div className="text-slate-300">Cost Savings</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
            <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-slate-300">Automation</div>
          </div>
        </div>
      </div>
    </section>
  )
}
