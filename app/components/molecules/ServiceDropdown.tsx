import { useState } from 'react'
import Link from 'next/link'
import { NavButton } from '../ui'
import { Icon } from '../atoms'

interface Service {
  name: string
  href: string
  price: string
}

interface ServiceDropdownProps {
  services: Service[]
}

export default function ServiceDropdown({ services }: ServiceDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="nav-button group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <span className="relative z-10 text-sm font-medium text-primary">Services</span>
        <Icon size="sm" className={`ml-2 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Icon>
      </button>
      
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 min-w-64 glass-champagne rounded-lg shadow-xl transition-all duration-300">
          <div className="p-4">
            <span className="text-xs text-secondary tracking-wider">Our Services</span>
          </div>
          <ul className="py-2">
            {services.map((service, index) => (
              <li key={index}>
                <Link href={service.href} className="w-full text-left px-4 py-3 text-sm font-medium text-primary hover:bg-white/10 transition-colors flex items-center justify-between">
                  <span>{service.name}</span>
                  <span className="text-accent text-xs">{service.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}