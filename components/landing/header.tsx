"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/images/nexarion-logo.png" alt="NexarionAI" width={32} height={32} className="rounded-full" />
            <span className="text-xl font-bold text-white">NexarionAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-slate-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-slate-300 hover:text-white transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="text-slate-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
              Testimonials
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/sign-up">Start Free Trial</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-800">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link
                href="#pricing"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-slate-300 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                <Button variant="ghost" asChild>
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/sign-up">Start Free Trial</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
