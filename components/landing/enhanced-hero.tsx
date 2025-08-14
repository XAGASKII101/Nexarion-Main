"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle } from "lucide-react"

export function EnhancedHero() {
  const [currentText, setCurrentText] = useState(0)
  const texts = ["WhatsApp Automation", "Instagram DMs", "Email Sequences", "Voice Cloning"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <Image
              src="/images/nexarion-logo.png"
              alt="NexarionAI"
              width={64}
              height={64}
              className="mx-auto rounded-full"
            />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            AI-Powered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Business Automation
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl text-slate-300">
              for <span className="text-blue-400 transition-all duration-500">{texts[currentText]}</span>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Transform your customer interactions with intelligent AI that responds like you. Connect WhatsApp,
            Instagram, Gmail, and more with AI-powered responses that feel human.
          </p>

          {/* Social Proof */}
          <div className="flex items-center justify-center space-x-6 mb-8 text-sm text-slate-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-400 mr-2" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg" asChild>
              <Link href="/auth/sign-up">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-slate-300 hover:text-white px-8 py-3 text-lg bg-transparent"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-slate-400">Messages Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <div className="text-slate-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">99.9%</div>
              <div className="text-slate-400">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-slate-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-slate-400 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
