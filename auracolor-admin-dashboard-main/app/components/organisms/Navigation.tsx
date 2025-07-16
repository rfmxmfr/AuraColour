import { motion } from '../framer-motion-fix'
import { NavButton } from '../ui'
import ServiceDropdown from '../molecules/ServiceDropdown'
import { fadeInUp } from '../../lib/animations'
import { useState } from 'react'
import { useTheme } from '../../contexts/ThemeContext'

const services = [
  { name: '12-Season Color Analysis', href: '/12-season-analysis', price: '$149' },
  { name: 'Virtual Wardrobe Curation', href: '/virtual-wardrobe-curation', price: '$299' },
  { name: 'Personal Shopping Service', href: '/personal-shopping-service', price: '$399' },
  { name: 'Style Consultation', href: '/style-consultation', price: '$199' }
]

export default function Navigation() {
  const [isLangOpen, setIsLangOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  
  const languages = [
    { code: 'en', name: 'ENGLISH', selected: true },
    { code: 'es', name: 'SPANISH' },
    { code: 'fr', name: 'FRENCH' },
    { code: 'pt', name: 'PORTUGUESE' },
    { code: 'ca', name: 'CATALONIAN' }
  ]
  
  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50 p-6"
      {...fadeInUp}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex space-x-4">
          <NavButton href="/">Home</NavButton>
          <NavButton href="/color-analysis" hidden>Analysis</NavButton>
          <ServiceDropdown services={services} />
          <NavButton href="/about">About</NavButton>
          <NavButton hidden>Contact</NavButton>
        </div>
        
        <div className="flex items-center space-x-4 ml-auto">
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="nav-button-wide group"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 text-sm font-medium text-primary text-slide">
                <span className="main-text">ENGLISH</span>
                <span className="hover-text">ENGLISH</span>
              </div>
              <svg className={`w-4 h-4 ml-2 relative z-10 transform transition-transform duration-300 ${isLangOpen ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full mt-2 right-0 min-w-48 glass-panel rounded-lg shadow-xl transition-all duration-300">
                <div className="p-4">
                  <span className="text-xs text-secondary tracking-wider">Select a language</span>
                </div>
                <ul className="py-2">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button className="w-full text-left px-4 py-2 text-sm font-medium text-primary hover:bg-white/10 transition-colors flex items-center justify-between">
                        {lang.name}
                        {lang.selected && (
                          <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <button onClick={toggleTheme} className="nav-button group" aria-label="Toggle theme">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/10 to-amber-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            {theme === 'dark' ? (
              <svg className="w-5 h-5 relative z-10 transition-all text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            ) : (
              <svg className="w-5 h-5 relative z-10 transition-all text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </motion.nav>
  )
}