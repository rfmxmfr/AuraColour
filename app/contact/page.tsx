"use client"

import { motion } from '../components/framer-motion-fix'
import { ThemeProvider } from '../contexts/ThemeContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'
import ServiceHero from '../components/service-hero'

export default function ContactPage() {
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
          title="Discover Your Style"
          subtitle="Transform your wardrobe with expert styling and organization"
          imageUrl="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074"
        />

        <section className="relative py-12 md:py-20 overflow-hidden" style={{ background: 'var(--bg-secondary)', backdropFilter: 'blur(12px)' }}>
          <FloatingParticles particleCount={20} opacity={0.15} />
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="glass-panel rounded-2xl p-6 md:p-8 mb-8 md:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-accent">Get In Touch</h2>
                <p className="text-base md:text-lg leading-relaxed mb-6 text-secondary">
                  Ready to discover your perfect colors? We'd love to hear from you. Reach out to schedule your consultation 
                  or ask any questions about our color analysis services.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-6 md:mt-8">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">Contact Information</h3>
                    <ul className="space-y-3 text-secondary text-sm md:text-base">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Email: hello@auracolors.com
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Phone: +44 (0) 123 456 7890
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Location: Glasgow, Scotland
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Response Time: Within 24 hours
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-primary mb-4">Business Hours</h3>
                    <ul className="space-y-3 text-secondary text-sm md:text-base">
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Monday - Friday: 9:00 AM - 6:00 PM
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Saturday: 10:00 AM - 4:00 PM
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Sunday: Closed
                      </li>
                      <li className="flex items-start">
                        <span className="text-accent mr-2">•</span>
                        Virtual consultations available
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="glass-panel rounded-2xl p-6 md:p-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-accent">Ready to Start Your Journey?</h2>
                <p className="text-secondary mb-6">Begin with our free mini color analysis</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/questionnaire"
                    className="py-3 md:py-4 px-6 md:px-8 rounded-full btn-champagne transition-colors text-base md:text-lg font-semibold"
                  >
                    Start Free Analysis
                  </a>
                  <a
                    href="/services"
                    className="py-3 md:py-4 px-6 md:px-8 rounded-full btn-secondary transition-colors text-base md:text-lg font-semibold"
                  >
                    View All Services
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