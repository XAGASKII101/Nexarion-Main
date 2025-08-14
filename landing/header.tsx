import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3">
          <Image src="/images/nexarion-logo.png" alt="Nexarion AI" width={40} height={40} className="rounded-lg" />
          <span className="text-2xl font-bold text-white">Nexarion AI</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-slate-300 hover:text-cyan-400 transition-colors">
            Pricing
          </Link>
          <Link href="#how-it-works" className="text-slate-300 hover:text-cyan-400 transition-colors">
            How It Works
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/auth/login">
            <Button variant="ghost" className="text-slate-300 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-white font-semibold px-6">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
