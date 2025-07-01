'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    { name: '12-Season Color Analysis', href: '/12-season-analysis', price: '$149' },
    { name: 'Virtual Wardrobe Curation', href: '/services', price: '$299' },
    { name: 'Personal Shopping Service', href: '/services', price: '$399' },
    { name: 'Style Consultation', href: '/services', price: '$199' }
  ]

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="py-3 px-6 w-28 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10 text-sm font-medium">Services</span>
        <svg className={`w-4 h-4 ml-2 relative z-10 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 min-w-64 bg-black/80 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-xl transition-all duration-300">
          <div className="p-4">
            <span className="text-xs text-gray-400 tracking-wider">Our Services</span>
          </div>
          <ul className="py-2">
            {services.map((service, index) => (
              <li key={index}>
                <Link href={service.href} className="w-full text-left px-4 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                  <span>{service.name}</span>
                  <span className="text-orange-400 text-xs">{service.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}