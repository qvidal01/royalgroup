"use client";

import { Award, Users, Home, Star } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in luxury real estate with numerous industry awards.",
  },
  {
    icon: Users,
    title: "Dedicated Team",
    description: "A passionate team of professionals committed to your real estate goals.",
  },
  {
    icon: Home,
    title: "Local Expertise",
    description: "Deep knowledge of the Evansville market and surrounding communities.",
  },
  {
    icon: Star,
    title: "Global Network",
    description: "Access to Engel & Volkers extensive worldwide network of luxury properties.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Jennifer Royal"
                className="w-full h-[600px] object-cover shadow-xl"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 border-4 border-gold-500 -z-10" />
            <div className="absolute top-8 -left-8 bg-primary-900 text-white p-8 z-20">
              <div className="text-4xl font-heading font-bold text-gold-400 mb-1">15+</div>
              <div className="text-sm uppercase tracking-wider">Years Experience</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              About Royal Group
            </p>
            <h2 className="section-heading">
              Your Trusted Partner in
              <span className="text-gold-500"> Luxury Real Estate</span>
            </h2>
            <div className="w-20 h-1 bg-gold-500 my-6" />
            <p className="text-luxury-slate text-lg leading-relaxed mb-6">
              At Royal Group, we believe that finding your dream home should be an exceptional
              experience. With over 15 years of expertise in the luxury real estate market, we bring
              unparalleled knowledge, dedication, and personal service to every client relationship.
            </p>
            <p className="text-luxury-slate text-lg leading-relaxed mb-8">
              As part of the prestigious Engel & Volkers network, we combine local expertise with
              global reach, offering you access to an exclusive portfolio of premium properties and
              a worldwide network of discerning buyers and sellers.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-gold-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-primary-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-luxury-slate">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-gold">
              Meet Jennifer Royal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
