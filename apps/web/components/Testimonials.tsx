'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Michael & Sarah Thompson',
    role: 'Purchased in Henderson County',
    content: 'Jennifer made our dream home a reality. Her expertise in the luxury market and attention to detail throughout the entire process was exceptional. We could not have asked for a better advocate.',
    rating: 5,
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Sold in Evansville',
    content: 'After interviewing several agents, we chose Jennifer and it was the best decision we made. She sold our home above asking price in just two weeks. Her marketing strategy was brilliant.',
    rating: 5,
  },
  {
    id: 3,
    name: 'The Richardson Family',
    role: 'Relocated from Chicago',
    content: 'Relocating from out of state seemed daunting until we found Jennifer. She took the time to understand exactly what we were looking for and made the transition seamless. Highly recommend!',
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            Client Stories
          </p>
          <h2 className="section-heading">What Our Clients Say</h2>
          <div className="divider-gold" />
          <p className="section-subheading mx-auto">
            We take pride in exceeding expectations and building lasting relationships with our clients.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-luxury-cream p-8 relative group hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6">
                <Quote className="h-12 w-12 text-gold-500/20" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-gold-500 fill-gold-500" />
                ))}
              </div>

              {/* Content */}
              <p className="text-luxury-slate text-lg leading-relaxed mb-6 italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="pt-6 border-t border-gold-500/20">
                <div className="font-heading font-medium text-primary-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-luxury-slate">
                  {testimonial.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
