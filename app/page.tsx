import Header from "@/components/landing/header"
import Hero from "@/components/landing/hero"
import ProblemSolution from "@/components/landing/problem-solution"
import Features from "@/components/landing/features"
import HowItWorks from "@/components/landing/how-it-works"
import Pricing from "@/components/landing/pricing"
import Testimonials from "@/components/landing/testimonials"
import CTA from "@/components/landing/cta"
import Footer from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
