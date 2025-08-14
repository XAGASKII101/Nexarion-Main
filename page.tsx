import { Hero } from "@/components/landing/hero"
import { ProblemSolution } from "@/components/landing/problem-solution"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header />
      <Hero />
      <ProblemSolution />
      <Features />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
