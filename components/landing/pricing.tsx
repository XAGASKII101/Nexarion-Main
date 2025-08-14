"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Star, Zap, Crown, Rocket } from "lucide-react"

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false)

  const plans = [
    {
      name: "Starter",
      icon: Zap,
      description: "Perfect for solopreneurs and small creators",
      monthlyPrice: 49,
      annualPrice: 39,
      features: [
        "1,000 AI responses/month",
        "Instagram + WhatsApp integration",
        "Basic voice cloning",
        "Email support",
        "Analytics dashboard",
        "7-day free trial",
      ],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Professional",
      icon: Crown,
      description: "For growing businesses and agencies",
      monthlyPrice: 149,
      annualPrice: 119,
      features: [
        "10,000 AI responses/month",
        "All platform integrations",
        "Advanced voice cloning",
        "Priority support",
        "Advanced analytics",
        "Custom AI training",
        "Team collaboration",
        "API access",
      ],
      popular: true,
      cta: "Start Free Trial",
    },
    {
      name: "Enterprise",
      icon: Rocket,
      description: "For large teams and enterprises",
      monthlyPrice: 499,
      annualPrice: 399,
      features: [
        "Unlimited AI responses",
        "White-label solution",
        "Custom integrations",
        "Dedicated account manager",
        "Custom voice models",
        "Advanced security",
        "SLA guarantee",
        "Custom onboarding",
      ],
      popular: false,
      cta: "Contact Sales",
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Simple, Transparent
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your business. All plans include a 7-day free trial.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className={`text-sm ${!isAnnual ? "text-white" : "text-slate-400"}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isAnnual ? "bg-gradient-to-r from-cyan-500 to-pink-500" : "bg-slate-600"
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-1 transition-transform ${
                  isAnnual ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
            <span className={`text-sm ${isAnnual ? "text-white" : "text-slate-400"}`}>
              Annual
              <span className="ml-2 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-300 hover:transform hover:scale-105 ${
                plan.popular
                  ? "border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
                  : "border-slate-700/50 hover:border-slate-600/50"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-cyan-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center ${
                    plan.popular ? "bg-gradient-to-r from-cyan-500 to-pink-500" : "bg-slate-700/50"
                  }`}
                >
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-slate-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold text-white">
                      ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-slate-400">/month</span>
                  </div>
                  {isAnnual && (
                    <div className="text-sm text-green-400 mt-1">
                      Save ${(plan.monthlyPrice - plan.annualPrice) * 12}/year
                    </div>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center space-x-3">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        plan.popular ? "bg-cyan-500/20" : "bg-slate-700/50"
                      }`}
                    >
                      <Check className={`w-3 h-3 ${plan.popular ? "text-cyan-400" : "text-slate-400"}`} />
                    </div>
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href="/auth/sign-up" className="block">
                <Button
                  className={`w-full py-3 font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white text-center mb-12">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Can I change plans anytime?</h4>
                <p className="text-slate-400 text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">What happens after the free trial?</h4>
                <p className="text-slate-400 text-sm">
                  Your trial automatically converts to the plan you selected. Cancel anytime during the trial with no
                  charges.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Do you offer refunds?</h4>
                <p className="text-slate-400 text-sm">
                  Yes, we offer a 30-day money-back guarantee if you're not completely satisfied.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Is there a setup fee?</h4>
                <p className="text-slate-400 text-sm">
                  No setup fees, no hidden costs. The price you see is exactly what you pay.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
