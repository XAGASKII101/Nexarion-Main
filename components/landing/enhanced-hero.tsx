"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Zap, MessageSquare, Mail } from "lucide-react"

export function EnhancedHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" />
      <div
        className="absolute top-0 right-1/3 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute -top-40 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-blue-100 text-blue-800 mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Business Automation Platform
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Transform Your Business with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              Intelligent Automation
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl sm:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Connect WhatsApp, Instagram, Gmail, and more with AI-powered responses. Automate customer service, lead
            generation, and business workflows in minutes.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <Link href="/auth/sign-up">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 transition-all duration-300 group bg-transparent"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Logo */}
          <div
            className={`flex justify-center mb-12 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="relative">
              <Image
                src="/images/nexarion-logo.png"
                alt="NexarionAI Logo"
                width={120}
                height={120}
                className="h-24 w-24 sm:h-32 sm:w-32 animate-pulse-glow"
              />
              <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-20 animate-pulse" />
            </div>
          </div>

          {/* Feature Icons */}
          <div
            className={`grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-8 w-8 text-green-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
              </div>
              <span className="text-sm font-medium text-gray-700">Instagram</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Mail className="h-8 w-8 text-red-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">Gmail</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">AI Powered</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
