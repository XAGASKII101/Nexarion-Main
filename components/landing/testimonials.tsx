"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechFlow",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "NexarionAI transformed our customer engagement completely. We're now converting 3x more leads with automated responses that sound completely human. The voice cloning feature is incredible - customers can't tell it's AI!",
    },
    {
      name: "Marcus Rodriguez",
      role: "E-commerce Owner",
      company: "StyleHub",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "I was skeptical about AI automation, but NexarionAI proved me wrong. It handles my Instagram DMs perfectly, and I've seen a 250% increase in sales conversations. Best investment I've made for my business.",
    },
    {
      name: "Emily Watson",
      role: "Social Media Manager",
      company: "GrowthCo",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "Managing multiple client accounts was overwhelming until I found NexarionAI. Now I can handle 10x more conversations with personalized responses. My clients are thrilled with the engagement rates!",
    },
    {
      name: "David Kim",
      role: "Fitness Coach",
      company: "FitLife Studio",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "The voice cloning feature is a game-changer. My clients love getting personalized audio responses, and it's helped me build stronger relationships while scaling my coaching business effortlessly.",
    },
    {
      name: "Lisa Thompson",
      role: "Real Estate Agent",
      company: "Premier Properties",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "NexarionAI helps me respond to property inquiries instantly, even when I'm showing houses. I've closed 40% more deals since implementing it. The ROI is incredible!",
    },
    {
      name: "Alex Johnson",
      role: "Digital Marketer",
      company: "Boost Agency",
      image: "/placeholder.svg?height=60&width=60",
      rating: 5,
      text: "As an agency, we needed something scalable. NexarionAI handles all our client communications seamlessly. We've been able to take on 3x more clients without hiring additional staff.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Loved by
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent"> Thousands</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            See what our customers are saying about their success with NexarionAI
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-16">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
            <div className="flex items-center justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
              ))}
            </div>

            <blockquote className="text-xl text-slate-200 text-center mb-8 leading-relaxed">
              "{testimonials[currentIndex].text}"
            </blockquote>

            <div className="flex items-center justify-center space-x-4">
              <img
                src={testimonials[currentIndex].image || "/placeholder.svg"}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="font-semibold text-white">{testimonials[currentIndex].name}</div>
                <div className="text-slate-400 text-sm">
                  {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-slate-700/50 hover:bg-slate-600/50 rounded-full flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/30">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm mb-4 leading-relaxed">"{testimonial.text.slice(0, 120)}..."</p>
              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.name}</div>
                  <div className="text-slate-400 text-xs">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? "bg-cyan-500" : "bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
