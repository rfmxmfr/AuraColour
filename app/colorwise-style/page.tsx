"use client"

import { useState } from 'react'
import { motion } from '../components/framer-motion-fix'
import { ThemeProvider } from '../contexts/ThemeContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function ColorWiseStylePage() {
  const [selectedSeason, setSelectedSeason] = useState('spring')

  const seasons = {
    spring: {
      name: 'Spring',
      subtitle: 'Warm & Bright',
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'],
      description: 'Fresh, warm, and vibrant colors that reflect the energy of spring blooms.',
      celebrities: ['Emma Stone', 'Scarlett Johansson', 'Amy Adams']
    },
    summer: {
      name: 'Summer',
      subtitle: 'Cool & Soft',
      colors: ['#A8E6CF', '#88D8C0', '#7FCDCD', '#B4A7D6', '#D4A5A5', '#FFB6C1'],
      description: 'Soft, cool, and muted colors that capture the gentle essence of summer.',
      celebrities: ['Reese Witherspoon', 'Naomi Watts', 'Gwyneth Paltrow']
    },
    autumn: {
      name: 'Autumn',
      subtitle: 'Warm & Deep',
      colors: ['#D2691E', '#CD853F', '#A0522D', '#8B4513', '#B22222', '#DAA520'],
      description: 'Rich, warm, and earthy colors inspired by autumn foliage.',
      celebrities: ['Julia Roberts', 'Julianne Moore', 'Jessica Chastain']
    },
    winter: {
      name: 'Winter',
      subtitle: 'Cool & Clear',
      colors: ['#000080', '#8B0000', '#4B0082', '#2F4F4F', '#000000', '#FFFFFF'],
      description: 'Bold, cool, and dramatic colors that embody winter clarity.',
      celebrities: ['Anne Hathaway', 'Megan Fox', 'Zooey Deschanel']
    }
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
        <Navbar />
        
        <section className="relative pt-32 pb-20 text-center">
          <div className="container mx-auto px-4">
            <motion.h1 
              className="font-bold mb-6 text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover Your
              <span className="block text-accent">Perfect Colors</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-secondary mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Professional color analysis by Tania Hernando Crespo. 
              Transform your style with scientifically-backed seasonal color theory.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a
                href="/questionnaire"
                className="py-4 px-8 rounded-full btn-champagne text-lg font-semibold"
              >
                Take Free Color Quiz
              </a>
              <a
                href="#seasons"
                className="py-4 px-8 rounded-full border border-champagne text-primary hover:bg-champagne hover:text-black transition-colors text-lg font-semibold"
              >
                Explore Color Seasons
              </a>
            </motion.div>
          </div>
        </section>

        <section id="seasons" className="py-20" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-bold text-primary mb-4">
                The Four Seasons
              </h2>
              <p className="text-xl text-secondary max-w-2xl mx-auto">
                Each season represents a unique color palette that complements your natural features
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {Object.entries(seasons).map(([key, season]) => (
                <button
                  key={key}
                  onClick={() => setSelectedSeason(key)}
                  className={`py-3 px-6 rounded-full font-semibold transition-all ${
                    selectedSeason === key
                      ? 'bg-champagne text-black'
                      : 'border border-champagne text-primary hover:bg-champagne hover:text-black'
                  }`}
                >
                  {season.name}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedSeason}
              className="glass-panel rounded-2xl p-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-accent mb-2">
                  {seasons[selectedSeason].name}
                </h3>
                <p className="text-lg text-secondary mb-4">
                  {seasons[selectedSeason].subtitle}
                </p>
                <p className="text-secondary max-w-2xl mx-auto">
                  {seasons[selectedSeason].description}
                </p>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                {seasons[selectedSeason].colors.map((color, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-2 border-2 border-champagne shadow-lg"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-secondary">{color}</span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold text-primary mb-3">Celebrity Examples</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {seasons[selectedSeason].celebrities.map((celebrity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-champagne/20 rounded-full text-sm text-secondary"
                    >
                      {celebrity}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-bold text-primary mb-4">
                Professional Services
              </h2>
              <p className="text-xl text-secondary max-w-2xl mx-auto">
                Expert color analysis and styling services tailored to your unique needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: '12-Season Analysis',
                  price: '$149',
                  duration: '90 minutes',
                  features: [
                    'Personal color consultation',
                    'Seasonal color palette',
                    'Digital color guide',
                    'Makeup recommendations',
                    'Shopping guidelines'
                  ]
                },
                {
                  title: 'Virtual Wardrobe',
                  price: '$299',
                  duration: '2-3 hours',
                  features: [
                    'Closet audit & organization',
                    'Outfit combinations',
                    'Gap analysis',
                    'Style recommendations',
                    'Digital lookbook'
                  ]
                },
                {
                  title: 'Personal Shopping',
                  price: '$399',
                  duration: 'Full day',
                  features: [
                    'Pre-shopping consultation',
                    'Personal shopping session',
                    'Styling & fitting',
                    'Budget optimization',
                    'Follow-up styling tips'
                  ]
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="glass-panel rounded-2xl p-6 text-center card-hover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-accent mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-1">{service.price}</div>
                  <div className="text-sm text-secondary mb-6">{service.duration}</div>
                  
                  <ul className="space-y-2 mb-8 text-left">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-secondary">
                        <svg className="w-4 h-4 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-3 px-6 rounded-full btn-champagne font-semibold">
                    Book Now
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20" style={{ background: 'var(--bg-secondary)' }}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                className="glass-panel rounded-2xl p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl font-bold text-accent mb-6">Meet Tania</h2>
                <p className="text-lg text-secondary mb-6 leading-relaxed">
                  Barcelona-born fashion expert with a degree in Fashion Design, Business, and Marketing. 
                  Tania bridges Mediterranean artistry with British sophistication, creating a service 
                  that is both globally relevant and deeply personal.
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { number: '500+', label: 'Clients Styled' },
                    { number: '3+', label: 'Years Experience' },
                    { number: '98%', label: 'Satisfaction Rate' },
                    { number: '4.9', label: 'Average Rating' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl font-bold text-accent">{stat.number}</div>
                      <div className="text-sm text-secondary">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <a
                  href="/questionnaire"
                  className="inline-block py-4 px-8 rounded-full btn-champagne text-lg font-semibold"
                >
                  Start Your Color Journey
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ThemeProvider>
  )
}