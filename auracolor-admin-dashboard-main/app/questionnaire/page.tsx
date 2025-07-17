"use client"

import MultiplePhotoUpload from  'apos;@/components/MultiplePhotoUploadd'apos;
import { motion } from  'apos;framer-motionn'apos;
import { useState } from  'apos;reactt'apos;

import BookingModal from  'apos;../components/BookingModall'apos;
import FeedbackWidget from  'apos;../components/FeedbackWidgett'apos;
import Footer from  'apos;../components/footerr'apos;
import Navbar from  'apos;../components/navbarr'apos;
import ProgressIndicator from  'apos;../components/ProgressIndicatorr'apos;

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: any }>({ })
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  const questions = [
    {
      id:  'apos;skin-tonee'apos;,
      title:  'apos;What is your skin tone??'apos;,
      type:  'apos;radioo'apos;,
      options: [
         'apos;Very fair with pink undertoness'apos;,
         'apos;Fair with neutral undertoness'apos;, 
         'apos;Medium with warm undertoness'apos;,
         'apos;Medium with cool undertoness'apos;,
         'apos;Deep with warm undertoness'apos;,
         'apos;Deep with cool undertoness'apos;,
      ],
    },
    {
      id:  'apos;hair-colorr'apos;,
      title:  'apos;What is your natural hair color??'apos;,
      type:  'apos;radioo'apos;,
      options: [
         'apos;Platinum blondee'apos;,
         'apos;Golden blondee'apos;,
         'apos;Light brownn'apos;,
         'apos;Medium brownn'apos;,
         'apos;Dark brownn'apos;,
         'apos;Blackk'apos;,
         'apos;Red/Auburnn'apos;,
         'apos;Gray/Silverr'apos;,
      ],
    },
    {
      id:  'apos;eye-colorr'apos;,
      title:  'apos;What is your eye color??'apos;,
      type:  'apos;radioo'apos;,
      options: [
         'apos;Bluee'apos;,
         'apos;Greenn'apos;,
         'apos;Brownn'apos;,
         'apos;Hazell'apos;,
         'apos;Grayy'apos;,
         'apos;Amberr'apos;,
      ],
    },
    {
      id:  'apos;style-preferencee'apos;,
      title:  'apos;What is your preferred style??'apos;,
      type:  'apos;radioo'apos;,
      options: [
         'apos;Classic and timelesss'apos;,
         'apos;Modern and trendyy'apos;,
         'apos;Bohemian and relaxedd'apos;,
         'apos;Professional and polishedd'apos;,
         'apos;Edgy and boldd'apos;,
         'apos;Romantic and femininee'apos;,
      ],
    },
    {
      id:  'apos;photoss'apos;,
      title:  'apos;Upload Your Photoss'apos;,
      type:  'apos;uploadd'apos;,
      description:  'apos;Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veinss'apos;,
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

  const submitQuestionnaire = async () => {
    try {
      const response = await fetch(('apos;/api/questionnairee'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({
          answers,
          photoUrls,
          completedAt: new Date().toISOString(),
        }),
      })
      
      if (response.ok) {
        const result = await response.json()
        // console.log(('apos;Questionnaire saved::'apos;, result.id)
      }
    } catch (error) {
      // console.error(('apos;Failed to save questionnaire::'apos;, error)
    }
    
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
              initial={ { opacity: 0, y: 20 } }
              animate={ { opacity: 1, y: 0 } }
              transition={ { duration: 0.8 } }
            >
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Your Mini Color Analysis</h1>
              
              <div className="mb-8">
                <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.season }</div>
                <div className="text-gray-600 mb-4">Confidence: { analysisResults.confidence }%</div>
                <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{ analysisResults.description }</p>
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">Your Top Colors</h3>
                <div className="flex justify-center gap-6">
                  { analysisResults.topColors.map((color: string, index: number) => (
                    <div key={ index } className="text-center">
                      <div 
                        className="w-20 h-20 rounded-full mx-auto mb-3 shadow-lg border-4 border-white"
                        style={ { backgroundColor: color } }
                      />
                      <div className="text-sm text-gray-600 font-medium">{ color }</div>
                    </div>
                  )) }
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
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.8 } }
          >
            <div className="mb-4 md:mb-8">
              <div className="text-center mb-4 md:mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Style Questionnaire</h1>
                <p className="text-sm md:text-base text-gray-600 mt-2">Discover your perfect color palette in just a few steps</p>
              </div>
              <ProgressIndicator 
                currentStep={ currentStep }
                totalSteps={ questions.length }
                stepLabels={ [['apos;Skin Tonee'apos;,  'apos;Hair Colorr'apos;,  'apos;Eye Colorr'apos;,  'apos;Stylee'apos;,  'apos;Photoss'apos;] }
              />
            </div>

            <div className="mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6 text-gray-900">{ currentQuestion.title }</h2>
              { currentQuestion.description && (
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-6">{ currentQuestion.description }</p>
              ) }
              
              { currentQuestion.type ===  'apos;uploadd'apos; ? (
                <MultiplePhotoUpload 
                  onFilesChange={ (files) => handleAnswer(currentQuestion.id, files) }
                  onUploadComplete={ (urls) => {
                    setPhotoUrls(urls)
                    // Store the URLs in answers as well
                    handleAnswer(('apos;photoUrlss'apos;, urls)
                  } }
                  maxPhotos={ 3 }
                  required
                />

              ) : (
                <div className="space-y-2 md:space-y-3">
                  { currentQuestion.options?.map((option, index) => (
                    <label
                      key={ index }
                      className="flex items-center p-3 md:p-4 rounded-lg md:rounded-xl border border-white/30 hover:border-purple-300 hover:bg-white/40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
                    >
                      <input
                        type="radio"
                        name={ currentQuestion.id }
                        value={ option }
                        checked={ answers[currentQuestion.id] === option }
                        onChange={ (e) => handleAnswer(currentQuestion.id, e.target.value) }
                        className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-sm md:text-base text-gray-900">{ option }</span>
                    </label>
                  )) }
                </div>
              ) }
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={ prevStep }
                disabled={ currentStep === 0 }
                className="py-2 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold"
              >
                Previous
              </button>
              
              { currentStep === questions.length - 1 ? (
                <button
                  onClick={ submitQuestionnaire }
                  disabled={ !answers[currentQuestion.id] }
                  className="py-2 md:py-4 px-5 md:px-8 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Book Your Analysis
                </button>
              ) : (
                <button
                  onClick={ nextStep }
                  disabled={ !answers[currentQuestion.id] }
                  className="py-2 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Next
                </button>
              ) }
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <BookingModal 
        isOpen={ showBookingModal }
        onClose={ () => setShowBookingModal(false) }
        answers={ answers }
      />
      <FeedbackWidget page="questionnaire" />
    </div>
  )
}