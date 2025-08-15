import { AlertTriangle, CheckCircle, DollarSign, Clock, Wrench } from "lucide-react"

export default function ProblemSolution() {
  return (
    <section className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">The $5,000 Problem We Solved</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            I discovered this while scrolling Instagram Reels. A simple comment triggered an entire AI sales funnel.
            Impressive? Yes. Accessible? Not even close.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              The Old Way (Expensive & Complex)
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <DollarSign className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">$2,000 - $5,000 Setup Cost</h4>
                  <p className="text-muted-foreground text-sm">Custom development for big clients only</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <Clock className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Weeks of Development</h4>
                  <p className="text-muted-foreground text-sm">Complex setup requiring technical expertise</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border border-red-200">
                <Wrench className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Instagram Only</h4>
                  <p className="text-muted-foreground text-sm">Limited to single platform, no voice cloning</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
              The Nexarion Way (Affordable & Simple)
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <DollarSign className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Just $49/month</h4>
                  <p className="text-muted-foreground text-sm">Affordable for creators and solopreneurs</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Clock className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Setup in Minutes</h4>
                  <p className="text-muted-foreground text-sm">No tech skills needed, intuitive interface</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <Wrench className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Multi-Platform + Voice</h4>
                  <p className="text-muted-foreground text-sm">Instagram, WhatsApp, Email with AI voice cloning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
