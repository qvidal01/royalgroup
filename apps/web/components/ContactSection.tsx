'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from 'lucide-react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
    propertyInterest: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Send to n8n webhook for demo
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section id="contact" className="py-24 bg-luxury-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
              Get In Touch
            </p>
            <h2 className="section-heading mb-6">
              Let's Find Your
              <span className="text-gold-500"> Dream Home</span>
            </h2>
            <div className="w-20 h-1 bg-gold-500 my-6" />
            <p className="text-luxury-slate text-lg leading-relaxed mb-8">
              Ready to begin your luxury real estate journey? Whether you're buying, selling, or simply exploring your options, we're here to help. Contact us today for a personalized consultation.
            </p>

            {/* Contact Details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Phone</h3>
                  <a href="tel:+15551234567" className="text-luxury-slate hover:text-gold-500 transition-colors">
                    (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Email</h3>
                  <a href="mailto:jennifer@royalgroup-ev.com" className="text-luxury-slate hover:text-gold-500 transition-colors">
                    jennifer@royalgroup-ev.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Office</h3>
                  <p className="text-luxury-slate">
                    123 Main Street, Suite 100<br />
                    Evansville, IN 47708
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-900 mb-1">Hours</h3>
                  <p className="text-luxury-slate">
                    Monday - Friday: 9am - 6pm<br />
                    Weekends: By Appointment
                  </p>
                </div>
              </div>
            </div>

            {/* AI Chat Widget Preview */}
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="h-6 w-6 text-gold-500" />
                <span className="font-medium text-primary-900">AI-Powered Chat Assistant</span>
              </div>
              <p className="text-sm text-luxury-slate">
                Have a quick question? Our AI assistant is available 24/7 to help with property inquiries, scheduling, and more.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-heading font-medium text-primary-900 mb-2">
                  Thank You!
                </h3>
                <p className="text-luxury-slate">
                  We've received your message and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-heading font-medium text-primary-900 mb-6">
                  Request a Consultation
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-900 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    I'm Interested In
                  </label>
                  <select
                    name="propertyInterest"
                    value={formData.propertyInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Select an option</option>
                    <option value="buying">Buying a Home</option>
                    <option value="selling">Selling My Home</option>
                    <option value="both">Both Buying & Selling</option>
                    <option value="investing">Investment Properties</option>
                    <option value="valuation">Home Valuation</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-primary-900 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your real estate goals..."
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gold-500 focus:ring-1 focus:ring-gold-500 outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-xs text-luxury-slate mt-4 text-center">
                  By submitting this form, you agree to receive communications from Royal Group.
                  Your information will never be shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
