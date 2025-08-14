import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-cyan-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 border border-cyan-500/20 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-pink-500/20 border border-cyan-500/30 mb-8">
            <Zap className="w-4 h-4 text-cyan-400 mr-2" />
            <span className="text-sm text-slate-300">Limited Time: 14-Day Free Trial</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Automate Your
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> Success?</span>
          </h2>

          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join the AI automation revolution. Stop losing leads, start converting them automatically with the power of
            intelligent conversations and voice cloning.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-sm text-slate-400">
            <div>✓ No credit card required</div>
            <div>✓ Setup in under 5 minutes</div>
            <div>✓ Cancel anytime</div>
          </div>
        </div>
      </div>
    </section>
  )
}
