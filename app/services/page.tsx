"use client"

import { motion } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function ServicesPage() {
  const services = [
    {
      title: "Color Analysis",
      price: "$149",
      duration: "90 minutes",
      description: "Discover your perfect color palette with our comprehensive seasonal color analysis.",
      features: [
        "Personal color consultation",
        "Seasonal color palette",
        "Digital color guide",
        "Makeup recommendations",
        "Shopping guidelines"
      ],
      image: "https://i0.wp.com/www.lesbonsplansdemodange.com/wp-content/uploads/2020/04/cercle-chromatique.jpg?w=500&ssl=1"
    },
    {
      title: "Style Consultation",
      price: "$199",
      duration: "60 minutes",
      description: "Get personalized styling advice tailored to your unique preferences and lifestyle.",
      features: [
        "Personal style assessment",
        "Body type analysis",
        "Style recommendations",
        "Shopping guidance",
        "Styling tips"
      ],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
    },
    {
      title: "Virtual Wardrobe",
      price: "$299",
      duration: "2-3 hours",
      description: "Transform your closet with strategic wardrobe planning and organization services.",
      features: [
        "Closet audit & organization",
        "Outfit combinations",
        "Gap analysis",
        "Style recommendations",
        "Digital lookbook"
      ],
      image: "https://i.pinimg.com/736x/eb/4b/80/eb4b8075c2fb78868ba8e2b4b5a0f0d0.jpg"
    },
    {
      title: "Personal Shopping",
      price: "$399",
      duration: "Full day",
      description: "Curated shopping experience tailored to your style, budget, and color palette.",
      features: [
        "Pre-shopping consultation",
        "Personal shopping session",
        "Styling & fitting",
        "Budget optimization",
        "Follow-up styling tips"
      ],
      image: "http://www.charlotteloves.co.uk/wp-content/uploads/2017/03/corporate_styling.jpg"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional styling services designed to enhance your natural beauty and boost your confidence.
          </motion.p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className={`relative bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-white/30 ${
                  index === 0 ? 'ring-2 ring-purple-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -8 }}
              >
                {index === 0 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-4xl font-bold text-white mb-1">{service.price}</div>
                    <div className="text-sm text-white/80">{service.duration}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                          <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs">{feature}</span>
                      </li>
                    ))}
                    <li className="text-xs text-gray-500 ml-6">+{service.features.length - 3} more features</li>
                  </ul>
                  
                  <button className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-200 text-sm">
                    Get Started
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}