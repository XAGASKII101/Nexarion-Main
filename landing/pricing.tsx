import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"
import Link from "next/link"

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            The power of $5,000 AI automation systems, now accessible to everyone at a fraction of the cost.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free Trial</h3>
              <div className="text-4xl font-bold text-white mb-2">
                $0
                <span className="text-lg text-slate-400 font-normal">/14 days</span>
              </div>
              <p className="text-slate-300">Perfect for testing the waters</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">100 automated responses</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Instagram integration</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Basic AI responses</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Email support</span>
              </li>
            </ul>

            <Link href="/auth/sign-up" className="block">
              <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">Start Free Trial</Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-cyan-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/30 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro Plan</h3>
              <div className="text-4xl font-bold text-white mb-2">
                $49
                <span className="text-lg text-slate-400 font-normal">/month</span>
              </div>
              <p className="text-slate-300">Everything you need to scale</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Unlimited automated responses</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Instagram + WhatsApp + Email</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">AI voice cloning</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Smart workflow sequences</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Advanced analytics</span>
              </li>
              <li className="flex items-center">
                <Check className="w-5 h-5 text-cyan-400 mr-3 flex-shrink-0" />
                <span className="text-slate-300">Priority support</span>
              </li>
            </ul>

            <Link href="/auth/sign-up" className="block">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold">
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-400 mb-4">Compare this to $2,000-$5,000 custom solutions</p>
          <div className="inline-flex items-center px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full">
            <span className="text-green-400 font-semibold">Save 99% vs Custom Development</span>
          </div>
        </div>
      </div>
    </section>
  )
}
