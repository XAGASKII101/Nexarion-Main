"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, MessageSquare, Mail } from "lucide-react"

export default function EnhancedHero() {
  const [currentWord, setCurrentWord] = useState(0)
  const words = ["WhatsApp", "Instagram", "Gmail", "Voice Calls"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
              <Sparkles className="w-4 h-4" />
              <span>AI-Powered Business Automation</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Automate Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {words[currentWord]}
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Business
                </span>
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                Transform your customer interactions with AI that handles WhatsApp, Instagram, Gmail, and voice calls
                automatically.
                <span className="font-semibold text-gray-800"> Increase efficiency by 300%</span> while you focus on
                growth.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/auth/sign-up" className="flex items-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 hover:border-gray-400 px-8 py-4 text-lg font-semibold bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>7-day free trial</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Main Logo/Visual */}
            <div className="relative z-10 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <Image
                    src="/images/nexarion-logo.png"
                    alt="NexarionAI"
                    width={120}
                    height={120}
                    className="rounded-2xl"
                  />
                </div>

                {/* Floating Icons */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                  <MessageSquare className="w-8 h-8 text-green-500" />
                </div>

                <div
                  className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Mail className="w-8 h-8 text-blue-500" />
                </div>

                <div className="absolute top-1/2 -right-8 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                  <Zap className="w-6 h-6 text-yellow-500" />
                </div>
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-1/4 left-0 w-32 h-32 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
