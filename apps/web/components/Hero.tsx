'use client'

import { ChevronDown, Search } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 via-primary-900/40 to-primary-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="animate-fade-in">
          <p className="text-gold-400 uppercase tracking-[0.3em] text-sm mb-6 font-medium">
            Engel & Volkers
          </p>
          <h1 className="text-5xl md:text-7xl font-heading font-medium mb-6 leading-tight">
            Luxury Real Estate
            <br />
            <span className="text-gold-400">Elevated</span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 max-w-2xl mx-auto text-gray-200">
            Experience exceptional properties and unparalleled service in the Evansville area
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-2 flex flex-col md:flex-row gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  className="w-full px-6 py-4 bg-white text-primary-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500 placeholder-gray-500"
                />
              </div>
              <button className="btn-gold flex items-center justify-center gap-2 px-8">
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#properties" className="btn-gold">
              View Properties
            </a>
            <a href="#contact" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-900">
              Schedule a Consultation
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="h-8 w-8 text-white/70" />
        </div>
      </div>
    </section>
  )
}
