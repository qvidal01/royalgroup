'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Mail } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Properties', href: '#properties' },
    { name: 'About', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      {/* Top bar */}
      <div className="bg-primary-900 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </a>
            <a href="mailto:jennifer@royalgroup-ev.com" className="hidden sm:flex items-center gap-2 hover:text-gold-400 transition-colors">
              <Mail className="h-4 w-4" />
              <span>jennifer@royalgroup-ev.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gold-400 font-medium">Engel & Volkers</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-heading font-semibold text-primary-900">
              <span className="text-gold-500">Royal</span> Group
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-luxury-charcoal hover:text-gold-500 transition-colors uppercase tracking-wider"
              >
                {item.name}
              </Link>
            ))}
            <Link href="#contact" className="btn-gold">
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-primary-900"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-3 text-sm font-medium text-luxury-charcoal hover:text-gold-500 transition-colors uppercase tracking-wider"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#contact"
              className="btn-gold mt-4 w-full text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Schedule Consultation
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}
