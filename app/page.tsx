import { Header } from "@/components/landing/header"
import { EnhancedHero } from "@/components/landing/enhanced-hero"
import { SocialProof } from "@/components/landing/social-proof"
import { ProblemSolution } from "@/components/landing/problem-solution"
import { EnhancedFeatures } from "@/components/landing/enhanced-features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Pricing } from "@/components/landing/pricing"
import { Testimonials } from "@/components/landing/testimonials"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />
      <EnhancedHero />
      <SocialProof />
      <ProblemSolution />
      <EnhancedFeatures />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
