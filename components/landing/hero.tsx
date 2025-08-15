import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          AI-Powered Social Media Automation
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Automate your Instagram, WhatsApp, and Gmail with AI. Clone your voice, create smart responses, and never miss
          a lead again.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/auth/sign-up">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
