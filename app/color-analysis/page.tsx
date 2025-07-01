"use client"

import { useState } from 'react'
import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function ColorAnalysisPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleAnalysis = async () => {
    if (!selectedFile) return
    
    setIsAnalyzing(true)
    // Simulate analysis
    setTimeout(() => {
      setResults({
        season: 'Deep Winter',
        colors: ['#000080', '#8B0000', '#4B0082', '#006400', '#FF1493', '#FF4500'],
        confidence: 92
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingParticles particleCount={30} opacity={0.2} />
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            AI Color Analysis
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover your perfect color palette with our advanced AI technology. Upload your photo and get personalized color recommendations.
          </motion.p>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-20 bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-orange-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-center">Upload Your Photo</h2>
              
              <div className="border-2 border-dashed border-orange-500/30 rounded-xl p-12 text-center mb-6 hover:border-orange-500 transition-colors bg-black/40 backdrop-blur-sm">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-lg mb-2">Click to upload or drag and drop</p>
                  <p className="text-gray-400">PNG, JPG up to 10MB</p>
                </label>
              </div>

              {selectedFile && (
                <div className="mb-6 p-4 bg-orange-500/20 backdrop-blur-sm rounded-lg border border-orange-500/30">
                  <p className="text-orange-400">✓ {selectedFile.name} selected</p>
                </div>
              )}

              <button
                onClick={handleAnalysis}
                disabled={!selectedFile || isAnalyzing}
                className="w-full py-4 px-8 rounded-full text-white text-lg font-semibold relative bg-orange-600 hover:bg-orange-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                </span>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {results && (
        <section className="py-20 bg-black/60 backdrop-blur-md">
          <div className="container mx-auto px-4">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-8 text-center">Your Color Analysis Results</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-orange-500/20">
                  <h3 className="text-2xl font-bold mb-4">Your Season</h3>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-orange-400 mb-2">{results.season}</div>
                    <div className="text-gray-300">Confidence: {results.confidence}%</div>
                  </div>
                </div>
                
                <div className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-orange-500/20">
                  <h3 className="text-2xl font-bold mb-4">Your Perfect Colors</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {results.colors.map((color: string, index: number) => (
                      <div key={index} className="text-center">
                        <div 
                          className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-orange-500/30"
                          style={{ backgroundColor: color }}
                        ></div>
                        <div className="text-sm text-gray-400">{color}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button className="py-4 px-8 rounded-full text-white text-lg font-semibold bg-orange-600 hover:bg-orange-700 transition-all duration-300">
                  Download Full Report
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}