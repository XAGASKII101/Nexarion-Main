"use client"

import { CheckCircle, XCircle, ArrowRight } from "lucide-react"

export function ProblemSolution() {
  const problems = [
    "Missing customer messages while sleeping",
    "Delayed responses hurt customer satisfaction",
    "Manual replies are time-consuming",
    "Inconsistent brand voice across platforms",
    "Scaling customer support is expensive",
  ]

  const solutions = [
    "24/7 AI responses in your brand voice",
    "Instant replies maintain customer happiness",
    "Automated workflows save hours daily",
    "Consistent messaging across all channels",
    "Scale infinitely without hiring more staff",
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Stop Losing Customers to Slow Responses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every minute without a response is a potential customer lost. NexarionAI ensures you never miss an
            opportunity.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Problems */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-red-600 mb-6">Without NexarionAI</h3>
            {problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-3">
                <XCircle className="h-6 w-6 text-red-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{problem}</p>
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="hidden lg:flex justify-center">
            <ArrowRight className="h-12 w-12 text-blue-600" />
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-green-600 mb-6">With NexarionAI</h3>
            {solutions.map((solution, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
