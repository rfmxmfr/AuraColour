"use client"

import { useState } from 'react'
import { motion } from '../components/framer-motion-fix'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})

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
    }
  ]

  const handleAnswer = (questionId, answer) => {
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
    console.log('Questionnaire answers:', answers)
    // Handle submission
  }

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <section className="relative pt-32 pb-20 overflow-hidden">
        <FloatingParticles particleCount={20} opacity={0.2} />
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <motion.div
              className="bg-black/60 backdrop-blur-md rounded-2xl p-8 border border-orange-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-bold">Style Questionnaire</h1>
                  <span className="text-sm text-gray-400">
                    {currentStep + 1} of {questions.length}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-6">{currentQuestion.title}</h2>
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center p-4 rounded-lg border border-gray-600 hover:border-orange-500 cursor-pointer transition-colors bg-black/40 backdrop-blur-sm"
                    >
                      <input
                        type="radio"
                        name={currentQuestion.id}
                        value={option}
                        checked={answers[currentQuestion.id] === option}
                        onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                        className="mr-3 text-orange-500 focus:ring-orange-500"
                      />
                      <span className="text-white">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="py-3 px-6 rounded-full text-white bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {currentStep === questions.length - 1 ? (
                  <button
                    onClick={submitQuestionnaire}
                    disabled={!answers[currentQuestion.id]}
                    className="py-3 px-6 rounded-full text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    disabled={!answers[currentQuestion.id]}
                    className="py-3 px-6 rounded-full text-white bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}