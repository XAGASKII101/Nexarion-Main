import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      description: "Perfect for individuals and small creators",
      features: [
        "1 Instagram account",
        "1 WhatsApp number",
        "Basic AI responses",
        "100 messages/month",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$49",
      description: "Best for growing businesses and influencers",
      features: [
        "3 Instagram accounts",
        "2 WhatsApp numbers",
        "1 Gmail account",
        "Voice cloning",
        "1,000 messages/month",
        "Priority support",
        "Analytics dashboard",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For agencies and large businesses",
      features: [
        "Unlimited accounts",
        "Advanced AI training",
        "Custom voice models",
        "Unlimited messages",
        "24/7 phone support",
        "Custom integrations",
        "White-label option",
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple Pricing</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? "border-primary border-2" : ""}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="text-4xl font-bold">
                  {plan.price}
                  <span className="text-lg font-normal text-muted-foreground">/month</span>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.popular ? "default" : "outline"} asChild>
                  <Link href="/auth/sign-up">Get Started</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
