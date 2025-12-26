"use client";

import { Bed, Bath, Square, MapPin, ArrowRight } from "lucide-react";

const properties = [
  {
    id: 1,
    title: "Lakefront Estate with Private Dock",
    price: 2450000,
    beds: 5,
    baths: 4.5,
    sqft: 6500,
    address: "Lakeshore Drive, Evansville",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Modern Downtown Penthouse",
    price: 1850000,
    beds: 3,
    baths: 3,
    sqft: 4200,
    address: "Main Street, Evansville",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    featured: true,
  },
  {
    id: 3,
    title: "Historic Victorian Mansion",
    price: 1650000,
    beds: 6,
    baths: 5,
    sqft: 7800,
    address: "Heritage Lane, Newburgh",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    featured: true,
  },
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function FeaturedProperties() {
  return (
    <section id="properties" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 uppercase tracking-[0.2em] text-sm mb-4 font-medium">
            Exclusive Listings
          </p>
          <h2 className="section-heading">Featured Properties</h2>
          <div className="divider-gold" />
          <p className="section-subheading mx-auto">
            Discover our curated selection of exceptional homes, each offering unique luxury and
            lifestyle opportunities.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="luxury-card group cursor-pointer">
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-gold-500 text-white px-4 py-1 text-sm font-medium uppercase tracking-wider">
                  Featured
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-full btn-gold text-sm">View Details</button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-luxury-slate text-sm mb-2">
                  <MapPin className="h-4 w-4 text-gold-500" />
                  {property.address}
                </div>
                <h3 className="text-xl font-heading font-medium text-primary-900 mb-3 group-hover:text-gold-500 transition-colors">
                  {property.title}
                </h3>
                <div className="flex items-center gap-6 text-sm text-luxury-slate mb-4">
                  <span className="flex items-center gap-1">
                    <Bed className="h-4 w-4 text-gold-500" />
                    {property.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="h-4 w-4 text-gold-500" />
                    {property.baths} Baths
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="h-4 w-4 text-gold-500" />
                    {property.sqft.toLocaleString()} sqft
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-2xl font-heading font-semibold text-primary-900">
                    {formatPrice(property.price)}
                  </span>
                  <ArrowRight className="h-5 w-5 text-gold-500 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <a href="#" className="btn-secondary inline-flex items-center gap-2">
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
