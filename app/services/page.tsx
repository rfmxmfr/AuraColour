"use client"

import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function ServicesPage() {
  const services = [
    {
      title: "12-Season Color Analysis",
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
      title: "Virtual Wardrobe Curation",
      price: "$299",
      duration: "2-3 hours",
      description: "Transform your existing wardrobe with expert styling and organization.",
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
      title: "Personal Shopping Service",
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
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingParticles particleCount={25} opacity={0.2} />
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Services
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Professional styling services designed to enhance your natural beauty and boost your confidence.
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden border border-orange-500/20 hover:border-orange-500 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-400">{service.price}</div>
                      <div className="text-sm text-gray-400">{service.duration}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-300">
                        <svg className="w-5 h-5 text-orange-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button className="w-full py-4 px-8 rounded-full text-white text-lg font-semibold bg-orange-600 hover:bg-orange-700 transition-all duration-300">
                    Book Consultation
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