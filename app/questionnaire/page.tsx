"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import BookingModal from '../components/BookingModal'
import MultiplePhotoUpload from '@/components/MultiplePhotoUpload'
import ProgressIndicator from '../components/ProgressIndicator'
import FeedbackWidget from '../components/FeedbackWidget'

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: any}>({})
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

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

  const submitQuestionnaire = () => {
    setShowBookingModal(true)
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
                <a
                  href="/contact"
                  className="py-4 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Book Consultation
                </a>
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
      
      <section className="pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <motion.div
            className="bg-white/20 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-lg p-4 md:p-8 border border-white/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4 md:mb-8">
              <div className="text-center mb-4 md:mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Style Questionnaire</h1>
                <p className="text-sm md:text-base text-gray-600 mt-2">Discover your perfect color palette in just a few steps</p>
              </div>
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={questions.length}
                stepLabels={['Skin Tone', 'Hair Color', 'Eye Color', 'Style', 'Photos']}
              />
            </div>

            <div className="mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6 text-gray-900">{currentQuestion.title}</h2>
              {currentQuestion.description && (
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-6">{currentQuestion.description}</p>
              )}
              
              {currentQuestion.type === 'upload' ? (
                <MultiplePhotoUpload 
                  onFilesChange={(files) => handleAnswer(currentQuestion.id, files)}
                  onUploadComplete={(urls) => {
                    setPhotoUrls(urls)
                    // Store the URLs in answers as well
                    handleAnswer('photoUrls', urls)
                  }}
                  maxPhotos={3}
                  required
                />

              ) : (
                <div className="space-y-2 md:space-y-3">
                  {currentQuestion.options?.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-3 md:p-4 rounded-lg md:rounded-xl border border-white/30 hover:border-purple-300 hover:bg-white/40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                        className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm md:text-base text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="py-2 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
              >
                Previous
              </button>
              
              {currentStep === questions.length - 1 ? (
                <button
                  onClick={submitQuestionnaire}
                  disabled={!answers[currentQuestion.id]}
                  className="py-2 md:py-4 px-5 md:px-8 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Book Your Analysis
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id]}
                  className="py-2 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BookingModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        answers={answers}
      />
      <FeedbackWidget page="questionnaire" />
    </div>
  )
}