"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Clock, Users, TrendingUp } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-cyan-900 via-slate-900 to-pink-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 mb-8">
            <Clock className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-sm text-red-300">Limited Time: 7-Day Free Trial</span>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> 10X </span>
            Your Business?
          </h2>

          {/* Subtitle */}
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs who are already using AI to automate their customer conversations and scale
            their revenue on autopilot.
          </p>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <Users className="w-5 h-5 text-cyan-400" />
              <span className="text-sm">5,000+ Happy Customers</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm">300% Avg. Revenue Increase</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-slate-300">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Setup in Under 5 Minutes</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white px-12 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 animate-glow"
              >
                Start Your Free Trial
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>

            <div className="text-center">
              <div className="text-sm text-slate-400 mb-1">No Credit Card Required</div>
              <div className="text-sm text-slate-400">Cancel Anytime</div>
            </div>
          </div>

          {/* Risk Reversal */}
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">🛡️ 100% Risk-Free Guarantee</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Try NexarionAI for 7 days completely free. If you're not amazed by the results, we'll refund every penny
              within 30 days. No questions asked.
            </p>
          </div>

          {/* Social Proof */}
          <div className="mt-12 text-center">
            <p className="text-slate-400 text-sm mb-4">Trusted by entrepreneurs worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-slate-500 font-semibold">TechCrunch</div>
              <div className="text-slate-500 font-semibold">Forbes</div>
              <div className="text-slate-500 font-semibold">Entrepreneur</div>
              <div className="text-slate-500 font-semibold">Inc.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
