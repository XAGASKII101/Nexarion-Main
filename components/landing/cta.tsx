import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Automate Your Success?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of creators and businesses who are already using NexarionAI to automate their social media
            and never miss a lead again.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link href="/auth/sign-up">Start Free Trial</Link>
            </Button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
