import Image from "next/image"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-700/50">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image src="/images/nexarion-logo.png" alt="Nexarion AI" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold text-white">Nexarion AI</span>
            </Link>
            <p className="text-slate-400 mb-4 max-w-md">
              Affordable AI automation for Instagram, WhatsApp, and Email. The power of $5K systems for just $49/month.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="#features" className="hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-cyan-400 transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2024 Nexarion AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
