'use clientt'apos;

import Link from  'apos;next/linkk'apos;
import { useState } from  'apos;reactt'apos;

import BookingModal from  'apos;../components/BookingModall'apos;
import Footer from  'apos;../components/footerr'apos;
import Navbar from  'apos;../components/navbarr'apos;

export default function ServicesPage() {
  const [bookingModal, setBookingModal] = useState({ isOpen: false, serviceType:  'apos;' })

  const openBooking = (serviceType: string) => {
    setBookingModal({ isOpen: true, serviceType })
  }

  const closeBooking = () => {
    setBookingModal({ isOpen: false, serviceType:  'apos;' })
  }
  const services = [
    {
      title: "12-Season Color Analysis",
      price: "£75",
      description: "A service to determine an individuall'apos;s optimal color palette based on their natural coloring.",
      features: ["Personal color season identification", "Comprehensive color palette", "Style guide", "Shopping recommendations"],
      image: "https://i0.wp.com/www.lesbonsplansdemodange.com/wp-content/uploads/2020/04/cercle-chromatique.jpg?w=500&ssl=1",
      link: "/services/color-analysis",
    },
    {
      title: "Virtual Wardrobe Curation",
      price: "£100",
      description: "A service to help clients organize, optimize, and plan their existing wardrobe virtually.",
      features: ["Wardrobe audit", "Outfit combinations", "Gap analysis", "Shopping list"],
      image: "https://i.pinimg.com/736x/eb/4b/80/eb4b8075c2fb78868ba8e2b4b5a0f0d0.jpg",
      link: "/services/virtual-wardrobe",
    },
    {
      title: "Personal Shopping Service",
      price: "£150",
      description: "A service providing guided shopping assistance to help clients acquire new clothing and accessories.",
      features: ["Personal shopping session", "Curated selections", "Fitting assistance", "Style coaching"],
      image: "http://www.charlotteloves.co.uk/wp-content/uploads/2017/03/corporate_styling.jpg",
      link: "/services/personal-shopping",
    },
    {
      title: "Style Evolution Coaching",
      price: "£300",
      description: "A comprehensive style transformation program with ongoing support.",
      features: ["Complete style makeover", "3-month support", "Personal styling sessions", "Confidence coaching"],
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070",
      link: "/services/stylist-coaching",
    },
    {
      title: "Gift Vouchers",
      price: "£75",
      description: "Give the gift of confidence and style with our flexible gift vouchers.",
      features: ["Flexible redemption", "12-month validity", "Personal message", "Digital delivery"],
      image: "https://as2.ftcdn.net/v2/jpg/01/02/31/71/1000_F_102317149_coOdTqA9pvyd3WMBoNCCgwEbmBr9DKLf.jpg",
      link: "/services/gift-vouchers",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 text-gray-900">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional styling services designed to enhance your natural beauty and boost your confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            { services.map((service, index) => (
              <div key={ index } className="group bg-white/20 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img
                    src={ service.image }
                    alt={ service.title }
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-lg font-bold text-purple-600">{ service.price }</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{ service.title }</h3>
                    <p className="text-gray-600 mb-6">{ service.description }</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    { service.features.map((feature, idx) => (
                      <li key={ idx } className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        { feature }
                      </li>
                    )) }
                  </ul>

                  <div className="space-y-3">
                    <Link
                      href={ service.link }
                      className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Learn More
                    </Link>
                    <Link
                      href="/book"
                      className="block w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                      Book Service
                    </Link>
                  </div>
                </div>
              </div>
            )) }
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}