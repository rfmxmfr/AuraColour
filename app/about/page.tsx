"use client"

import { motion } from '../components/framer-motion-fix'
import { ThemeProvider } from '../contexts/ThemeContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'
import ServiceHero from '../components/service-hero'

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Clients Styled", icon: "👥" },
    { number: "3+", label: "Years Experience", icon: "⭐" },
    { number: "98%", label: "Satisfaction Rate", icon: "💯" },
    { number: "4.9", label: "Average Rating", icon: "⭐" }
  ]

  return (
    <ThemeProvider>
      <div className="min-h-screen text-primary" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingParticles particleCount={25} opacity={0.2} />
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Your
            <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Perfect Colors
            </span>
          </motion.h1>
        </div>
      </section>
      
      <ServiceHero 
        title="The Art and Science of Personal Style"
        subtitle="From Barcelona to Glasgow - Blending Mediterranean artistry with British sophistication"
        imageUrl="https://as2.ftcdn.net/v2/jpg/01/02/31/71/1000_F_102317149_coOdTqA9pvyd3WMBoNCCgwEbmBr9DKLf.jpg"
      />

      <section className="relative py-12 md:py-20 overflow-hidden" style={{ background: 'var(--bg-secondary)', backdropFilter: 'blur(12px)' }}>
        <FloatingParticles particleCount={20} opacity={0.15} />
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="glass-panel rounded-2xl p-6 md:p-8 mb-8 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent">Meet Tania</h2>
                  <div className="text-sm text-accent mb-4 font-medium">Barcelona → Glasgow</div>
                  <div className="text-sm text-secondary mb-6">Fashion Design & Business</div>
                  
                  <p className="text-base md:text-lg leading-relaxed mb-6 text-secondary">
                    Aura was created by Tania Hernando Crespo, a Barcelona-born fashion expert with a degree in Fashion Design, Business, and Marketing.
                  </p>
                  
                  <p className="text-base md:text-lg leading-relaxed text-secondary">
                    Tania's career bridges the creative vibrancy of Barcelona and the contemporary style of Glasgow. Her unique background allows her to blend Mediterranean artistry with British sophistication, resulting in a service that is both globally relevant and deeply personal.
                  </p>
                </div>
                
                <div className="flex justify-center">
                  <div className="w-80 h-80 bg-black/50 backdrop-blur-sm border-2 border-champagne rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-champagne/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-secondary text-sm">Tania's Photo</p>
                      <p className="text-secondary text-xs mt-2">Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-panel-light rounded-2xl p-6 text-center">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-sm text-secondary">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="glass-panel rounded-2xl p-6 md:p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">Explore Our Services</h2>
              <p className="text-secondary mb-6">Discover how we can transform your personal style</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/services"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full btn-champagne transition-colors text-base md:text-lg font-semibold"
                >
                  View All Services
                </a>
                <a
                  href="/questionnaire"
                  className="py-3 md:py-4 px-6 md:px-8 rounded-full text-primary bg-gray-600 hover:bg-gray-700 transition-colors text-base md:text-lg font-semibold"
                >
                  Start Free Quiz
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </ThemeProvider>
  )
}