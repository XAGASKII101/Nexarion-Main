import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Creator",
      avatar: "/placeholder-user.jpg",
      content:
        "NexarionAI has completely transformed how I manage my Instagram. I never miss a DM and my engagement has increased by 300%!",
    },
    {
      name: "Mike Chen",
      role: "E-commerce Owner",
      avatar: "/placeholder-user.jpg",
      content:
        "The WhatsApp automation is incredible. My customers get instant responses even when I'm sleeping. Sales have doubled!",
    },
    {
      name: "Emily Rodriguez",
      role: "Digital Marketer",
      avatar: "/placeholder-user.jpg",
      content:
        "The voice cloning feature is mind-blowing. My clients think I'm personally responding to every message. Game changer!",
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join thousands of creators and businesses who are already automating their success.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2">
              <CardContent className="p-6">
                <p className="text-lg mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Avatar className="mr-4">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-muted-foreground">{testimonial.role}</p>
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
