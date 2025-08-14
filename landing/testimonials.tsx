import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      avatar: "/professional-woman-smiling.png",
      content:
        "Nexarion AI transformed my Instagram engagement. I went from manually responding to hundreds of comments to having intelligent conversations happen automatically. My conversion rate increased by 300%!",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Digital Agency Owner",
      avatar: "/professional-bearded-man.png",
      content:
        "We were quoted $8,000 for a custom AI automation system. Nexarion AI gave us the same functionality for $49/month. The voice cloning feature is incredible - our clients love the personal touch.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "E-commerce Entrepreneur",
      avatar: "/young-businesswoman.png",
      content:
        "The Instagram to WhatsApp to Email sequence is pure magic. I'm capturing leads I would have lost before, and the AI sounds so natural that people don't even realize they're talking to a bot initially.",
      rating: 5,
    },
  ]

  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Loved by Creators &
            <span className="bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              {" "}
              Entrepreneurs
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Join thousands who've already transformed their business with affordable AI automation.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 mb-6 leading-relaxed">"{testimonial.content}"</p>

              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
