"use client"

import { Star, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "E-commerce Owner",
      company: "StyleHub",
      content:
        "NexarionAI transformed our customer service. We went from 12-hour response times to instant replies. Our customer satisfaction scores increased by 40%!",
      rating: 5,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      company: "TechStart",
      content:
        "The WhatsApp automation alone saved us 20 hours per week. The AI responses are so natural that customers can't tell the difference.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      company: "Local Bakery",
      content:
        "As a small business, I can't afford to hire customer service staff. NexarionAI handles all my Instagram and WhatsApp messages perfectly.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "David Thompson",
      role: "Agency Founder",
      company: "Growth Agency",
      content:
        "We use NexarionAI for all our clients. The voice cloning feature is incredible - it maintains the personal touch while scaling infinitely.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Lisa Wang",
      role: "Consultant",
      company: "Business Solutions",
      content:
        "The analytics dashboard gives me insights I never had before. I can see exactly how AI is improving my business metrics.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "James Miller",
      role: "Startup Founder",
      company: "InnovateCo",
      content:
        "Setup took less than 10 minutes. Within an hour, our AI was handling customer inquiries like a seasoned professional.",
      rating: 5,
      avatar: "/placeholder-user.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">Loved by Thousands of Businesses</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how NexarionAI is transforming customer communication for businesses of all sizes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-gray-300 mb-4" />

                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
