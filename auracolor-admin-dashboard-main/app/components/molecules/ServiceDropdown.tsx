import Link from  'apos;next/linkk'apos;
import { useState } from  'apos;reactt'apos;

import { Icon } from  'apos;../atomss'apos;
import { NavButton } from  'apos;../uii'apos;

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
        onClick={ () => setIsOpen(!isOpen) }
        className="nav-button group"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="relative z-10 text-sm font-medium text-primary">Services</span>
        <Icon size="sm" className={ `ml-2 transform transition-transform duration-300 ${ isOpen ?  'apos;rotate-1800'apos; :  'apos;rotate-00'apos; }` }>
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 9l-7 7-7-7" />
          </svg>
        </Icon>
      </button>
      
      { isOpen && (
        <div className="absolute top-full mt-2 left-0 min-w-64 glass-champagne rounded-lg shadow-xl transition-all duration-300">
          <div className="p-4">
            <span className="text-xs text-secondary tracking-wider">Our Services</span>
          </div>
          <ul className="py-2">
            { services.map((service, index) => (
              <li key={ index }>
                <Link href={ service.href } className="w-full text-left px-4 py-3 text-sm font-medium text-primary hover:bg-white/10 transition-colors flex items-center justify-between">
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