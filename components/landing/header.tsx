"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image src="/images/nexarion-logo.png" alt="NexarionAI" width={32} height={32} className="rounded-lg" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NexarionAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">
              Testimonials
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
              Login
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/auth/sign-up">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="#features" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Features
              </Link>
              <Link href="#pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Testimonials
              </Link>
              <Link href="/auth/login" className="block px-3 py-2 text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Button asChild className="w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600">
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
