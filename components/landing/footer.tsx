"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Twitter, Linkedin, Github, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/images/nexarion-logo.png" alt="NexarionAI" width={32} height={32} className="rounded-full" />
              <span className="text-xl font-bold text-white">NexarionAI</span>
            </Link>
            <p className="text-slate-400 mb-6 max-w-md">
              Transform your customer interactions with intelligent AI automation. Connect all your platforms and let AI
              handle the conversations.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Github className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-slate-400 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-slate-400 hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/api" className="text-slate-400 hover:text-white transition-colors">
                  API
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-white font-semibold mb-2">Stay updated</h3>
              <p className="text-slate-400">Get the latest news and updates from NexarionAI.</p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-slate-400 text-sm">© 2024 NexarionAI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
