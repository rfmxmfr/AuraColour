"use client"

import { motion as m } from "./components/framer-motion-fix"
import ClientProvider from "./components/client-provider"
import Navbar from "./components/navbar"
import ColorAnalysisHero from "./components/color-analysis-hero"
import Gallery from "./components/gallery"
import ParallaxSection from "./components/parallax-section"
import ProcessSteps from "./components/process-steps"
import Contact from "./components/contact"
import Footer from "./components/footer"

export default function Page() {
  return (
    <ClientProvider>
      <m.main 
        className="min-h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
      <Navbar />
      <ColorAnalysisHero />
      <Gallery />
      <ParallaxSection 
        imageUrl="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070"
        title="Discover Your Style"
        subtitle="Transform your wardrobe with colors that enhance your natural beauty"
      />
      <ProcessSteps />
      <div className="hidden">
        <Contact />
      </div>
      <Footer />
      </m.main>
    </ClientProvider>
  )
}
