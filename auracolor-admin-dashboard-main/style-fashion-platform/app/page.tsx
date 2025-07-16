'use client'

import { motion } from 'framer-motion'
import { Camera, ShoppingBag, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const services = [
    {
      icon: Camera,
      title: 'AI Color Analysis',
      description: 'Discover your perfect color palette with advanced AI analysis',
      price: '£75',
      href: '/color-analysis'
    },
    {
      icon: ShoppingBag,
      title: 'Personal Shopper',
      description: 'Curated product recommendations tailored to your style',
      price: '£150',
      href: '/personal-shopper'
    },
    {
      icon: Users,
      title: 'Stylist Coaching',
      description: 'Expert style consultations and personalized advice',
      price: '£300',
      href: '/stylist-coaching'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <Sparkles className="w-16 h-16 text-yellow-300" />
            </div>
            <h1 className="text-6xl font-bold mb-6">
              Style & Fashion Platform
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Transform your style with AI-powered color analysis, personal shopping, and expert coaching
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/color-analysis" className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Color Analysis
              </Link>
              <Link href="/services" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Professional styling solutions powered by AI and expert knowledge</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-lg card-hover"
              >
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <div className="text-3xl font-bold text-purple-600 mb-6">{service.price}</div>
                  <Link 
                    href={service.href}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors inline-block"
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'AI-Powered', desc: 'Advanced machine learning algorithms' },
              { title: 'Expert Stylists', desc: 'Professional fashion consultants' },
              { title: 'Personalized', desc: 'Tailored to your unique style' },
              { title: 'Fast Results', desc: 'Get insights in minutes' }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Style?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands who've discovered their perfect style</p>
          <Link href="/color-analysis" className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  )
}