"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Zap, MessageSquare, Mail, Instagram } from "lucide-react"

export function EnhancedHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const features = ["WhatsApp", "Instagram", "Gmail", "Voice AI"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [features.length])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20 sm:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Image
                src="/images/nexarion-logo.png"
                alt="NexarionAI"
                width={80}
                height={80}
                className="h-20 w-20 animate-float"
              />
              <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse-glow" />
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            AI-Powered Automation for{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {features[currentFeature]}
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-gradient" />
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mb-8 text-lg leading-8 text-gray-600 sm:text-xl">
            Transform your customer interactions with intelligent AI that responds like a human across WhatsApp,
            Instagram, Gmail, and voice calls. Start your 7-day free trial today.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/auth/sign-up">
              <Button size="lg" className="group relative overflow-hidden bg-blue-600 hover:bg-blue-700">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="group bg-transparent">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Feature Icons */}
          <div className="mb-16 flex justify-center space-x-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-green-100 p-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">WhatsApp</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-pink-100 p-3">
                <Instagram className="h-6 w-6 text-pink-600" />
              </div>
              <span className="text-sm text-gray-600">Instagram</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-red-100 p-3">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <span className="text-sm text-gray-600">Gmail</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-blue-100 p-3">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Voice AI</span>
            </div>
          </div>

          {/* Hero Image/Video Placeholder */}
          <div className="relative mx-auto max-w-3xl">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 shadow-2xl">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center">
                    <Play className="h-8 w-8 text-white ml-1" />
                  </div>
                  <p className="text-gray-600">Watch NexarionAI in Action</p>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -left-4 top-4 rounded-lg bg-white p-3 shadow-lg animate-float">
              <MessageSquare className="h-6 w-6 text-green-600" />
            </div>
            <div
              className="absolute -right-4 top-8 rounded-lg bg-white p-3 shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
            >
              <Mail className="h-6 w-6 text-red-600" />
            </div>
            <div
              className="absolute -left-8 bottom-8 rounded-lg bg-white p-3 shadow-lg animate-float"
              style={{ animationDelay: "2s" }}
            >
              <Instagram className="h-6 w-6 text-pink-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
