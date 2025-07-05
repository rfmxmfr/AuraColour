"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: any}>({})
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const questions = [
    {
      id: 'skin-tone',
      title: 'What is your skin tone?',
      type: 'radio',
      options: [
        'Very fair with pink undertones',
        'Fair with neutral undertones', 
        'Medium with warm undertones',
        'Medium with cool undertones',
        'Deep with warm undertones',
        'Deep with cool undertones'
      ]
    },
    {
      id: 'hair-color',
      title: 'What is your natural hair color?',
      type: 'radio',
      options: [
        'Platinum blonde',
        'Golden blonde',
        'Light brown',
        'Medium brown',
        'Dark brown',
        'Black',
        'Red/Auburn',
        'Gray/Silver'
      ]
    },
    {
      id: 'eye-color',
      title: 'What is your eye color?',
      type: 'radio',
      options: [
        'Blue',
        'Green',
        'Brown',
        'Hazel',
        'Gray',
        'Amber'
      ]
    },
    {
      id: 'style-preference',
      title: 'What is your preferred style?',
      type: 'radio',
      options: [
        'Classic and timeless',
        'Modern and trendy',
        'Bohemian and relaxed',
        'Professional and polished',
        'Edgy and bold',
        'Romantic and feminine'
      ]
    },
    {
      id: 'photos',
      title: 'Upload Your Photos',
      type: 'upload',
      description: 'Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veins'
    },
    {
      id: 'newsletter',
      title: 'Get Your Free Mini Analysis',
      type: 'newsletter',
      description: 'Subscribe to receive your AI color analysis results and styling tips'
    }
  ]

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const submitQuestionnaire = async () => {
    try {
      const response = await fetch('/api/mini-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
      
      if (response.ok) {
        const analysis = await response.json()
        setAnalysisResults(analysis)
        setShowResults(true)
      } else {
        console.error('Analysis failed')
        alert('Analysis failed. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong. Please try again.')
    }
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  if (showResults && analysisResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <section className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div
              className="bg-white rounded-3xl shadow-lg p-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Your Mini Color Analysis</h1>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">{analysisResults.season}</div>
                <div className="text-gray-600 mb-4">Confidence: {analysisResults.confidence}%</div>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{analysisResults.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Your Top Colors</h3>
                <div className="flex justify-center gap-6">
                  {analysisResults.topColors.map((color: string, index: number) => (
                    <div key={index} className="text-center">
                      <div 
                        className="w-20 h-20 rounded-full mx-auto mb-3 shadow-lg border-4 border-white"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div className="text-sm text-gray-600 font-medium">{color}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">Want Your Complete Analysis?</h3>
                <p className="text-purple-600 text-sm mb-4">Get your full 30+ color palette, styling guide, and personalized recommendations</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/services"
                  className="py-4 px-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold transition-all duration-200"
                >
                  View Services
                </a>
                <button
                  className="py-4 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
                  onClick={() => alert('Booking consultation...')}
                >
                  Book Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="bg-white/20 backdrop-blur-xl rounded-3xl shadow-lg p-8 border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900">Style Questionnaire</h1>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {currentStep + 1} of {questions.length}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">{currentQuestion.title}</h2>
              {currentQuestion.description && (
                <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
              )}
              
              {currentQuestion.type === 'upload' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-purple-300/50 rounded-2xl p-8 text-center bg-white/30 backdrop-blur-md">
                    <svg className="w-16 h-16 mx-auto text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-gray-900 mb-2 font-semibold">Upload your 3 photos</p>
                    <p className="text-gray-600 text-sm mb-6">JPG, PNG up to 10MB each</p>
                    
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="photo-upload"
                      onChange={(e) => handleAnswer(currentQuestion.id, e.target.files)}
                    />
                    <label htmlFor="photo-upload" className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full cursor-pointer hover:shadow-lg transition-all duration-200 font-semibold">
                      Choose Photos
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Your photos are secure and private</span>
                  </div>
                </div>
              ) : currentQuestion.type === 'newsletter' ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                  />
                  <label className="flex items-center text-gray-600">
                    <input
                      type="checkbox"
                      className="mr-3 text-purple-600 focus:ring-purple-500 rounded"
                      required
                    />
                    <span className="text-sm">I agree to receive styling tips and color analysis updates</span>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-4 rounded-xl border border-white/30 hover:border-purple-300 hover:bg-white/40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                        className="mr-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="py-3 px-6 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
              >
                Previous
              </button>
              
              {currentStep === questions.length - 1 ? (
                <div className="text-center">
                  <div className="mb-2">
                    <span className="text-xs text-purple-600 font-medium">⏰ Get results in 30 seconds</span>
                  </div>
                  <button
                    onClick={submitQuestionnaire}
                    disabled={!answers[currentQuestion.id]}
                    className="py-4 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Get My Color Analysis
                  </button>
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">🔒 No credit card required</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                  className="py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}