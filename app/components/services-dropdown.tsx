'apos;use clientt'apos;apos;

import Link from  'apos;apos;next/linkk'apos;apos;
import { useState } from  'apos;apos;reactt'apos;apos;

export default function ServicesDropdown() {
  const [isOpen, setIsOpen] = useState(false)

  const services = [
    { name:  'apos;apos;12-Season Color Analysiss'apos;apos;, href:  'apos;apos;/12-season-analysiss'apos;apos;, price:  'apos;apos;$1499'apos;apos; },
    { name:  'apos;apos;Virtual Wardrobe Curationn'apos;apos;, href:  'apos;apos;/virtual-wardrobe-curationn'apos;apos;, price:  'apos;apos;$2999'apos;apos; },
    { name:  'apos;apos;Personal Shopping Servicee'apos;apos;, href:  'apos;apos;/personal-shopping-servicee'apos;apos;, price:  'apos;apos;$3999'apos;apos; },
    { name:  'apos;apos;Style Consultationn'apos;apos;, href:  'apos;apos;/style-consultationn'apos;apos;, price:  'apos;apos;$1999'apos;apos; },
  ]

  return (
    <div className="relative">
      <button 
        onClick={ () => setIsOpen(!isOpen) }
        className="py-3 px-6 w-28 h-12 rounded-full text-primary relative backdrop-blur-sm border-champagne hover:border-champagne-hover transition-all duration-300 group flex items-center justify-center"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-sm font-medium text-primary">Services</span>
        <svg className={ `w-4 h-4 ml-2 relative z-10 transform transition-transform duration-300 ${ isOpen ?  'apos;apos;rotate-1800'apos;apos; :  'apos;apos;rotate-00'apos;apos; }` } fill="none" stroke="currentColor" viewBox="0 0 24 24">
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