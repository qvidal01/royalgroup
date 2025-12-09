'use client'

import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-primary-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-heading font-semibold mb-4">
              <span className="text-gold-400">Royal</span> Group
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner in luxury real estate. Engel & Volkers affiliate providing exceptional service in the Evansville area.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold-500 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-medium mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#properties" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Featured Properties
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-gold-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Client Stories
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Home Valuation
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-medium mb-4 text-gold-400">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Buyer Representation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Seller Representation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Luxury Marketing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Investment Properties
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                  Relocation Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-medium mb-4 text-gold-400">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                123 Main Street, Suite 100<br />
                Evansville, IN 47708
              </li>
              <li>
                <a href="tel:+15551234567" className="hover:text-gold-400 transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:jennifer@royalgroup-ev.com" className="hover:text-gold-400 transition-colors">
                  jennifer@royalgroup-ev.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Royal Group | Engel & Volkers. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gold-400 transition-colors">
                Fair Housing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Powered by AIQSO badge */}
      <div className="bg-primary-950 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs text-gray-500">
            Powered by <span className="text-gold-400">AIQSO</span> - AI-Driven Business Solutions
          </p>
        </div>
      </div>
    </footer>
  )
}
