"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap } from "lucide-react"

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <Zap className="h-16 w-16 text-white mx-auto mb-6 animate-pulse" />
          </div>

          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
            Ready to Transform Your Customer Communication?
          </h2>

          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using NexarionAI to automate their customer interactions. Start your
            free trial today - no credit card required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/auth/sign-up">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 group">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-blue-100 text-sm">
            <span>✓ 7-day free trial</span>
            <span>✓ No credit card required</span>
            <span>✓ Setup in under 10 minutes</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  )
}
