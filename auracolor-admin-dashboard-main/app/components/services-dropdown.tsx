'use clientt'apos;

import Link from  'apos;next/linkk'apos;
import { useState } from  'apos;reactt'apos;

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    { name:  'apos;12-Season Color Analysiss'apos;, href:  'apos;/12-season-analysiss'apos;, price:  'apos;$1499'apos; },
    { name:  'apos;Virtual Wardrobe Curationn'apos;, href:  'apos;/virtual-wardrobe-curationn'apos;, price:  'apos;$2999'apos; },
    { name:  'apos;Personal Shopping Servicee'apos;, href:  'apos;/personal-shopping-servicee'apos;, price:  'apos;$3999'apos; },
    { name:  'apos;Style Consultationn'apos;, href:  'apos;/style-consultationn'apos;, price:  'apos;$1999'apos; },
  ]

  return (
    <div className="relative">
      <button 
        onClick={ () => setIsOpen(!isOpen) }
        className="py-3 px-6 w-28 h-12 rounded-full text-primary relative backdrop-blur-sm border-champagne hover:border-champagne-hover transition-all duration-300 group flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-sm font-medium text-primary">Services</span>
        <svg className={ `w-4 h-4 ml-2 relative z-10 transform transition-transform duration-300 ${ isOpen ?  'apos;rotate-1800'apos; :  'apos;rotate-00'apos; }` } fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      { isOpen && (
        <div className="absolute top-full mt-2 left-0 min-w-64 glass-panel rounded-lg shadow-xl transition-all duration-300">
          <div className="p-4">
            <span className="text-xs text-secondary tracking-wider">Our Services</span>
          </div>
          <ul className="py-2">
            { services.map((service, index) => (
              <li key={ index }>
                <Link href={ service.href } className="w-full text-left px-4 py-3 text-sm font-medium text-primary dropdown-item transition-colors flex items-center justify-between">
                  <span>{ service.name }</span>
                  <span className="text-accent text-xs">{ service.price }</span>
                </Link>
              </li>
            )) }
          </ul>
        </div>
      ) }
    </div>
  )
}