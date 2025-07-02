"use client"

import { useState } from 'react'
import { motion } from '../components/framer-motion-fix'
import { ThemeProvider } from '../contexts/ThemeContext'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FloatingParticles from '../components/floating-particles'

export default function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [userName, setUserName] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)

  const questions = [
    {
      id: 'personal-features',
      title: 'Tell us about your natural features',
      type: 'grouped',
      description: 'Takes less than 1 minute',
      sections: [
        {
          id: 'skin-tone',
          title: 'Skin Tone',
          options: ['Very fair with pink undertones', 'Fair with neutral undertones', 'Medium with warm undertones', 'Medium with cool undertones', 'Deep with warm undertones', 'Deep with cool undertones']
        },
        {
          id: 'hair-color', 
          title: 'Natural Hair Color',
          options: ['Platinum blonde', 'Golden blonde', 'Light brown', 'Medium brown', 'Dark brown', 'Black', 'Red/Auburn', 'Gray/Silver']
        },
        {
          id: 'eye-color',
          title: 'Eye Color', 
          options: ['Blue', 'Green', 'Brown', 'Hazel', 'Gray', 'Amber']
        }
      ]
    },
    {
      id: 'style-preference',
      title: 'What describes your style best?',
      type: 'radio',
      description: 'This helps us personalize your recommendations',
      options: ['Classic and timeless', 'Modern and trendy', 'Bohemian and relaxed', 'Professional and polished', 'Edgy and bold', 'Romantic and feminine']
    },
    {
      id: 'photos',
      title: 'Upload Your Photos',
      type: 'upload',
      description: '3 specific photos needed for accurate analysis • No payment required'
    },
    {
      id: 'contact',
      title: 'Get Your Results',
      type: 'contact',
      description: 'Email required for results delivery • Newsletter is optional'
    }
  ]

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    if (questionId === 'contact' && answer.name) {
      setUserName(answer.name)
    }
  }

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files).slice(0, 3)
    setUploadedFiles(fileArray)
    handleAnswer('photos', fileArray)
  }

  const isStepComplete = (question) => {
    if (question.type === 'grouped') {
      return question.sections.every(section => answers[section.id])
    }
    if (question.type === 'contact') {
      return answers[question.id]?.email
    }
    return !!answers[question.id]
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
      <ThemeProvider>
        <div className="min-h-screen text-primary" style={{ background: 'var(--bg-primary)' }}>
          <Navbar />
          <section className="relative pt-32 pb-20 overflow-hidden">
            <FloatingParticles particleCount={20} opacity={0.2} />
            <div className="container mx-auto px-4">
              <div className="max-w-2xl mx-auto">
                <motion.div
                  className="glass-panel rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-3xl font-bold mb-6 text-accent">Your Mini Color Analysis</h1>
                  
                  <div className="mb-8">
                    <div className="text-5xl font-bold text-primary mb-2">{analysisResults.season}</div>
                    <div className="text-secondary mb-4">Confidence: {analysisResults.confidence}%</div>
                    <p className="text-secondary leading-relaxed">{analysisResults.description}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-primary">Your Top Colors</h3>
                    <div className="flex justify-center gap-4">
                      {analysisResults.topColors.map((color, index) => (
                        <div key={index} className="text-center">
                          <div 
                            className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-champagne"
                            style={{ backgroundColor: color }}
                          ></div>
                          <div className="text-sm text-secondary">{color}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass-panel-light rounded-lg p-6 mb-8">
                    <h3 className="text-lg font-semibold text-accent mb-2">Want Your Complete Analysis?</h3>
                    <p className="text-secondary text-sm mb-4">Get your full 30+ color palette, styling guide, and personalized recommendations</p>
                  </div>

                  <div className="flex gap-4">
                    <a
                      href="/services"
                      className="flex-1 py-3 px-6 rounded-full text-primary bg-gray-600 hover:bg-gray-700 transition-colors text-center"
                    >
                      View Services
                    </a>
                    <button
                      className="flex-1 py-3 px-6 rounded-full btn-champagne transition-colors"
                      onClick={() => alert('Booking consultation...')}
                    >
                      Book Consultation
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen text-primary" style={{ background: 'var(--bg-primary)' }}>
        <Navbar />
        
        <section className="relative pt-32 pb-20 overflow-hidden">
          <FloatingParticles particleCount={20} opacity={0.2} />
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <motion.div
                className="glass-panel rounded-2xl p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-primary">Style Questionnaire</h1>
                    <span className="text-sm text-secondary">
                      {currentStep + 1} of {questions.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
                    <div 
                      className="bg-gradient-to-r from-champagne-primary to-champagne-deep h-3 rounded-full transition-all duration-500 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg transform translate-x-1/2 -translate-y-0"></div>
                    </div>
                  </div>
                  <div className="text-center">
                    {progress < 25 && (
                      <p className="text-accent text-sm font-medium">🌟 {userName ? `Great start, ${userName}!` : 'Great start!'} Let's discover your colors</p>
                    )}
                    {progress >= 25 && progress < 50 && (
                      <p className="text-accent text-sm font-medium">✨ {userName ? `You're doing amazing, ${userName}!` : 'You're doing amazing!'} Keep going</p>
                    )}
                    {progress >= 50 && progress < 75 && (
                      <p className="text-accent text-sm font-medium">🎨 You're halfway there! Almost done</p>
                    )}
                    {progress >= 75 && progress < 100 && (
                      <p className="text-accent text-sm font-medium">🚀 So close! Final steps ahead</p>
                    )}
                    {progress === 100 && (
                      <p className="text-accent text-sm font-medium">🎉 Perfect! Ready for your analysis</p>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-6 text-primary">{currentQuestion.title}</h2>
                  {currentQuestion.description && (
                    <p className="text-secondary mb-4">{currentQuestion.description}</p>
                  )}
                  
                  {currentQuestion.type === 'grouped' ? (
                    <div className="space-y-6">
                      {currentQuestion.sections.map((section, sectionIndex) => (
                        <div key={section.id} className="space-y-3">
                          <h3 className="text-lg font-medium text-accent flex items-center">
                            {answers[section.id] && <span className="text-green-400 mr-2">✓</span>}
                            {section.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {section.options.map((option, index) => (
                              <label key={index} className="flex items-center p-3 rounded-lg glass-panel-light dropdown-item cursor-pointer transition-all">
                                <input
                                  type="radio"
                                  name={section.id}
                                  value={option}
                                  checked={answers[section.id] === option}
                                  onChange={(e) => handleAnswer(section.id, e.target.value)}
                                  className="mr-3 text-accent focus:ring-accent"
                                />
                                <span className="text-primary text-sm">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : currentQuestion.type === 'upload' ? (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-champagne rounded-lg p-6 md:p-8 text-center glass-panel-light">
                        <svg className="w-12 h-12 mx-auto text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-primary mb-2">Upload your 3 photos</p>
                        <p className="text-secondary text-sm mb-4">Face with hair back • Face with hair down • Wrist showing veins</p>
                        
                        <div className="mb-4 p-3 rounded-lg" style={{background: uploadedFiles.length > 0 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(156, 163, 175, 0.2)', border: uploadedFiles.length > 0 ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(156, 163, 175, 0.3)'}}>
                          <p className={`text-sm font-medium ${uploadedFiles.length > 0 ? 'text-green-400' : 'text-gray-400'}`}>
                            {uploadedFiles.length === 0 ? '📷 0/3 photos uploaded' :
                             uploadedFiles.length === 1 ? '✓ 1/3 photos uploaded - Great lighting! Upload 2 more' :
                             uploadedFiles.length === 2 ? '✓ 2/3 photos uploaded - Perfect! One more needed' :
                             '✓ 3/3 photos uploaded - Excellent! Ready for analysis'}
                          </p>
                        </div>
                        
                        {uploadedFiles.length > 0 && (
                          <div className="flex justify-center gap-2 mb-4">
                            {uploadedFiles.map((file, index) => (
                              <div key={index} className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center text-xs text-gray-300">
                                📷 {index + 1}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          className="hidden"
                          id="photo-upload"
                          onChange={(e) => handleFileUpload(e.target.files)}
                        />
                        <label htmlFor="photo-upload" className="mt-4 inline-block btn-champagne px-6 py-2 rounded-full cursor-pointer transition-colors">
                          {uploadedFiles.length > 0 ? 'Change Photos' : 'Choose Photos'}
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-2 text-secondary text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>🔒 Your photos are secure and only seen by certified analysts</span>
                      </div>
                    </div>
                  ) : currentQuestion.type === 'contact' ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your name (optional)"
                        className="w-full p-3 md:p-4 rounded-lg glass-panel-light text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-champagne transition-all"
                        onChange={(e) => handleAnswer(currentQuestion.id, {...(answers[currentQuestion.id] || {}), name: e.target.value})}
                      />
                      <input
                        type="email"
                        placeholder="Email address (required for results)"
                        required
                        className="w-full p-3 md:p-4 rounded-lg glass-panel-light text-primary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-champagne transition-all"
                        onChange={(e) => handleAnswer(currentQuestion.id, {...(answers[currentQuestion.id] || {}), email: e.target.value})}
                      />
                      <label className="flex items-start text-secondary">
                        <input
                          type="checkbox"
                          className="mr-3 mt-1 text-accent focus:ring-accent"
                          onChange={(e) => handleAnswer(currentQuestion.id, {...(answers[currentQuestion.id] || {}), newsletter: e.target.checked})}
                        />
                        <span className="text-sm">Send me styling tips and color updates (optional)</span>
                      </label>
                      <div className="flex items-center justify-center space-x-2 text-secondary text-xs">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>🔒 Your data is secure and used only for your analysis</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentQuestion.options?.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center p-3 md:p-4 rounded-lg glass-panel-light dropdown-item cursor-pointer transition-all"
                        >
                          <input
                            type="radio"
                            name={currentQuestion.id}
                            value={option}
                            checked={answers[currentQuestion.id] === option}
                            onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                            className="mr-3 text-accent focus:ring-accent"
                          />
                          <span className="text-primary">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="py-3 px-6 rounded-full text-primary bg-gray-600 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  {currentStep === questions.length - 1 ? (
                    <button
                      onClick={submitQuestionnaire}
                      disabled={!isStepComplete(currentQuestion)}
                      className="py-3 px-6 rounded-full btn-champagne disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Get My Analysis
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      disabled={!isStepComplete(currentQuestion)}
                      className="py-3 px-6 rounded-full btn-champagne disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
    </ThemeProvider>
  )
}