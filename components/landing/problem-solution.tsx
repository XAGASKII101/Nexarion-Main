"use client"

import { X, Check, ArrowRight } from "lucide-react"

export function ProblemSolution() {
  const problems = [
    "Missing leads while you sleep",
    "Generic, robotic responses",
    "Hours spent on manual replies",
    "Inconsistent follow-up timing",
    "Lost opportunities in DMs",
  ]

  const solutions = [
    "24/7 automated lead capture",
    "Human-like AI responses with your voice",
    "Instant, personalized replies",
    "Perfect timing, every time",
    "Never miss a potential customer",
  ]

  return (
    <section className="py-20 bg-gradient-to-r from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Stop Losing Customers to
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {" "}
              Slow Responses
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Every minute you don't respond is a potential customer walking away. Here's how NexarionAI solves this
            forever.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problems */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-red-400 mb-4">Without NexarionAI</h3>
              <p className="text-slate-400">The painful reality most businesses face</p>
            </div>

            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-slate-300">{problem}</span>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-6">
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-2xl font-bold text-green-400 mb-4">With NexarionAI</h3>
              <p className="text-slate-400">Transform your business overnight</p>
            </div>

            {solutions.map((solution, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-slate-300">{solution}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transformation Arrow */}
        <div className="flex justify-center my-12">
          <div className="bg-gradient-to-r from-cyan-500 to-pink-500 p-4 rounded-full">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Results */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-white mb-6">The Result?</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-cyan-500/10 to-pink-500/10 p-6 rounded-2xl border border-cyan-500/20">
              <div className="text-4xl font-bold text-cyan-400 mb-2">300%</div>
              <div className="text-slate-300">More Leads Converted</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 p-6 rounded-2xl border border-green-500/20">
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-300">Customer Engagement</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20">
              <div className="text-4xl font-bold text-purple-400 mb-2">0</div>
              <div className="text-slate-300">Missed Opportunities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
