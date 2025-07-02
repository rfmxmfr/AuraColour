'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from "framer-motion"
import { useState } from 'react'
import ServicesDropdown from './services-dropdown'

export default function Navbar() {
  const pathname = usePathname()
  const [isLangOpen, setIsLangOpen] = useState(false)

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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex space-x-4">
          <Link href="/">
            <button className="py-3 px-6 w-28 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-sm font-medium">Home</span>
            </button>
          </Link>
          <Link href="/color-analysis">
            <button className="py-3 px-6 w-28 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-sm font-medium">Analysis</span>
            </button>
          </Link>
          <ServicesDropdown />
          <Link href="/questionnaire">
            <button className="py-3 px-6 w-28 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-sm font-medium">Quiz</span>
            </button>
          </Link>
          <button className="hidden py-3 px-6 w-28 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 text-sm font-medium">Contact</span>
          </button>
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="py-3 px-6 w-32 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-sm font-medium">ENGLISH</span>
              <svg className={`w-4 h-4 ml-2 relative z-10 transform transition-transform duration-300 ${isLangOpen ? 'rotate-0' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isLangOpen && (
              <div className="absolute top-full mt-2 left-0 min-w-48 bg-black/80 backdrop-blur-md border border-orange-500/20 rounded-lg shadow-xl transition-all duration-300">
                <div className="p-4">
                  <span className="text-xs text-gray-400 tracking-wider">Select a language</span>
                </div>
                <ul className="py-2">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button className="w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors flex items-center justify-between">
                        {lang.name}
                        {lang.selected && (
                          <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
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
        </div>
        
        <button className="py-3 px-6 w-12 h-12 rounded-full text-white relative backdrop-blur-md border border-orange-500/20 hover:border-orange-500 transition-all duration-300 group flex items-center justify-center" aria-label="Toggle theme">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <svg className="w-5 h-5 relative z-10 transition-all" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
        </button>
        
        <a href="#contact" className="hidden">
          <button className="py-3 px-6 w-36 h-12 rounded-full text-white relative backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500/10 to-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative z-10 text-sm font-medium">Get in touch</span>
          </button>
        </a>
      </div>
    </motion.nav>
  )
}