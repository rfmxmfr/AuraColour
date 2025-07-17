"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import BookingModal from '../components/BookingModal'
import DropzoneUpload from '@/components/DropzoneUpload'
import { useStyleAnalysis } from '@/hooks/use-style-analysis'
import { useAtom } from 'jotai'
import { questionnaireAtom, colorAnalysisAtom } from '@/lib/store'
import ProgressIndicator from '../components/ProgressIndicator'
import FeedbackWidget from '../components/FeedbackWidget'
import { TrustSignals } from '@/components/ui/trust-signals'

export default function QuestionnairePage() {
  const searchParams = useSearchParams()
  const serviceType = searchParams.get('service') || '12-Season Color Analysis'
  
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: any}>({})
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [questionnaire, setQuestionnaire] = useAtom(questionnaireAtom)
  const [analysisResults, setAnalysisResults] = useAtom(colorAnalysisAtom)
  const styleAnalysis = useStyleAnalysis()
  const [showBookingModal, setShowBookingModal] = useState(false)

  // Define questions based on service type
  const getQuestionsByService = () => {
    const commonQuestions = [
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
    ];
    
    // Service-specific questions
    switch(serviceType) {
      case 'Virtual Wardrobe Curation':
        return [
          ...commonQuestions,
          {
            id: 'wardrobe-size',
            title: 'How would you describe your current wardrobe size?',
            type: 'radio',
            options: [
              'Minimal (under 50 items)',
              'Average (50-100 items)',
              'Large (100-200 items)',
              'Extensive (200+ items)'
            ]
          },
          {
            id: 'wardrobe-refresh',
            title: 'How often do you update or refresh your wardrobe?',
            type: 'radio',
            options: [
              'Every season',
              'Twice a year',
              'Once a year',
              'Only as needed/seldom'
            ]
          },
          {
            id: 'frequent-items',
            title: 'Which clothing items do you wear most frequently?',
            type: 'checkbox',
            options: [
              'Jeans/trousers',
              'Skirts/dresses',
              'Suits/blazers',
              'T-Shirts/tops',
              'Sweaters/knits',
              'Outerwear/coats',
              'Athletic wear'
            ]
          },
          {
            id: 'specific-items',
            title: 'Are there specific items you want to incorporate or avoid?',
            type: 'textarea',
            placeholder: 'Please describe any specific items you want to add or avoid in your wardrobe'
          },
          {
            id: 'missing-colors',
            title: 'What colors do you feel your wardrobe currently lacks?',
            type: 'textarea',
            placeholder: 'Describe colors you would like to add to your wardrobe'
          },
          {
            id: 'style-inspiration',
            title: 'Do you have style icons, celebrities, or Pinterest boards you draw inspiration from?',
            type: 'textarea',
            placeholder: 'Share names, links, or descriptions of your style inspiration'
          },
          {
            id: 'wardrobe-photos',
            title: 'Upload Photos of Your Current Wardrobe',
            type: 'upload',
            description: 'Please upload 3 photos of your current wardrobe/closet to help us analyze your style'
          }
        ];
      case 'Personal Shopping Service':
        return [
          ...commonQuestions,
          {
            id: 'budget',
            title: 'What is your shopping budget?',
            type: 'radio',
            options: [
              'Budget-friendly (under £500)',
              'Mid-range (£500-£1000)',
              'Premium (£1000-£2000)',
              'Luxury (£2000+)'
            ]
          },
          {
            id: 'shopping-goals',
            title: 'What are your shopping goals?',
            type: 'radio',
            options: [
              'Complete wardrobe refresh',
              'Specific occasion outfits',
              'Workwear update',
              'Seasonal additions',
              'Statement pieces',
              'Other (please specify)'
            ]
          },
          {
            id: 'shopping-goals-other',
            title: 'If you selected "Other" above, please specify',
            type: 'textarea',
            placeholder: 'Describe your specific shopping goals',
            conditional: answers => answers['shopping-goals'] === 'Other (please specify)'
          },
          {
            id: 'wardrobe-gaps',
            title: 'Are there wardrobe gaps or must-have pieces you\'d like to fill?',
            type: 'textarea',
            placeholder: 'Describe specific items or categories you need'
          },
          {
            id: 'material-preferences',
            title: 'Do you have material or brand preferences?',
            type: 'textarea',
            placeholder: 'E.g., vegan materials, ethical brands, specific designers'
          },
          {
            id: 'silhouette-preferences',
            title: 'What silhouettes or fits do you love?',
            type: 'textarea',
            placeholder: 'Describe the shapes and styles that work best for you'
          },
          {
            id: 'avoid-styles',
            title: 'Are there shapes/styles you would avoid?',
            type: 'textarea',
            placeholder: 'Describe any silhouettes or styles you dislike'
          },
          {
            id: 'style-photos',
            title: 'Upload Your Style Reference Photos',
            type: 'upload',
            description: 'Please upload photos of yourself or style inspiration to help us understand your preferences'
          }
        ];
      case 'Style Evolution Coaching':
        return [
          ...commonQuestions,
          {
            id: 'occupation',
            title: 'What is your occupation/primary daily activity?',
            type: 'textarea',
            placeholder: 'Describe your job or daily activities to help us tailor recommendations'
          },
          {
            id: 'style-challenges',
            title: 'What are your current style challenges?',
            type: 'radio',
            options: [
              'Lack of confidence in style choices',
              'Career transition requiring new image',
              'Body changes requiring wardrobe adaptation',
              'Style feels outdated or inconsistent',
              'Need to define personal brand',
              'Other (please specify)'
            ]
          },
          {
            id: 'style-challenges-other',
            title: 'If you selected "Other" above, please specify',
            type: 'textarea',
            placeholder: 'Describe your specific style challenges',
            conditional: answers => answers['style-challenges'] === 'Other (please specify)'
          },
          {
            id: 'transformation-goals',
            title: 'What are your style transformation goals?',
            type: 'radio',
            options: [
              'More polished professional appearance',
              'Authentic expression of personality',
              'Age-appropriate yet modern style',
              'Versatile wardrobe for multiple occasions',
              'Confidence in personal image',
              'Other (please specify)'
            ]
          },
          {
            id: 'transformation-goals-other',
            title: 'If you selected "Other" above, please specify',
            type: 'textarea',
            placeholder: 'Describe your specific transformation goals',
            conditional: answers => answers['transformation-goals'] === 'Other (please specify)'
          },
          {
            id: 'feeling-dressed',
            title: 'How do you want to feel when you get dressed each morning?',
            type: 'checkbox',
            options: [
              'Confident',
              'Comfortable',
              'Modern',
              'Put-together',
              'Powerful',
              'Creative',
              'Authentic'
            ]
          },
          {
            id: 'context-considerations',
            title: 'Are there social, cultural, or work context considerations for your new style?',
            type: 'textarea',
            placeholder: 'Describe any specific contexts or requirements for your style'
          },
          {
            id: 'current-photos',
            title: 'Upload Current Style Photos',
            type: 'upload',
            description: 'Please upload 3 photos showing your current style to help us create your transformation plan'
          }
        ];
      default: // 12-Season Color Analysis
        return [
          ...commonQuestions,
          {
            id: 'photos',
            title: 'Upload Your Photos',
            type: 'upload',
            description: 'Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veins'
          }
        ];
    }
  };
  
  const [questions, setQuestions] = useState(getQuestionsByService())
  
  // Update questions when service type changes
  useEffect(() => {
    setQuestions(getQuestionsByService())
    setCurrentStep(0)
    setAnswers({})
    setPhotoUrls([])
  }, [serviceType])

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
    // Mark questionnaire as completed with all answers
    setQuestionnaire(prev => ({
      ...prev,
      serviceType,
      skinTone: answers['skin-tone'],
      hairColor: answers['hair-color'],
      eyeColor: answers['eye-color'],
      stylePreference: answers['style-preference'],
      photoUrls: photoUrls,
      allAnswers: answers,
      completed: true
    }))
    
    // If we have photos, we can run a quick style analysis
    if (photoUrls.length > 0) {
      styleAnalysis.mutate(
        { 
          imageUrl: photoUrls[0],
          userId: undefined,
          email: undefined,
          name: undefined,
          serviceType: serviceType
        },
        {
          onSuccess: (data) => {
            setAnalysisResults(data)
            setShowResults(true)
          },
          onError: () => {
            // If style analysis fails, just show booking modal
            setShowBookingModal(true)
          }
        }
      )
    } else {
      setShowBookingModal(true)
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
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Your {serviceType} Results</h1>
              
              <div className="mb-8">
                {serviceType === '12-Season Color Analysis' ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{analysisResults.season}</div>
                    <div className="text-gray-600 mb-4">Confidence: {analysisResults.confidence}%</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{analysisResults.description}</p>
                  </>
                ) : serviceType === 'Virtual Wardrobe Curation' ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{analysisResults.dominant_style || 'Wardrobe Analysis'}</div>
                    <div className="text-gray-600 mb-4">Versatility Score: {analysisResults.versatility_score || 0}/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Organization Level: {analysisResults.organization_level || 0}/100</p>
                  </>
                ) : serviceType === 'Personal Shopping Service' ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{analysisResults.style_profile || 'Style Profile'}</div>
                    <div className="text-gray-600 mb-4">Shopping Priority: {analysisResults.shopping_priority_score || 0}/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Based on your preferences and current style</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{analysisResults.current_style_assessment || 'Style Assessment'}</div>
                    <div className="text-gray-600 mb-4">Transformation Potential: {analysisResults.transformation_potential || 0}/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Recommended Direction: {analysisResults.recommended_direction || 'Personalized coaching plan'}</p>
                  </>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                  {serviceType === '12-Season Color Analysis' ? 'Your Top Colors' :
                   serviceType === 'Virtual Wardrobe Curation' ? 'Recommended Additions' :
                   serviceType === 'Personal Shopping Service' ? 'Statement Pieces' :
                   'Key Pieces to Acquire'}
                </h3>
                {serviceType === '12-Season Color Analysis' && analysisResults.topColors ? (
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
                ) : serviceType === 'Virtual Wardrobe Curation' && analysisResults.recommended_additions ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    {analysisResults.recommended_additions.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{index + 1}</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : serviceType === 'Personal Shopping Service' && analysisResults.statement_pieces ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    {analysisResults.statement_pieces.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{index + 1}</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : analysisResults.key_pieces_to_acquire ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    {analysisResults.key_pieces_to_acquire.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{index + 1}</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-gray-600">Analysis in progress...</div>
                )}
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  {serviceType === '12-Season Color Analysis' ? 'Want Your Complete Color Analysis?' :
                   serviceType === 'Virtual Wardrobe Curation' ? 'Ready for Your Full Wardrobe Curation?' :
                   serviceType === 'Personal Shopping Service' ? 'Ready for Your Personal Shopping Experience?' :
                   'Ready to Begin Your Style Evolution?'}
                </h3>
                <p className="text-purple-600 text-sm mb-4">
                  {serviceType === '12-Season Color Analysis' ? 'Get your full 30+ color palette, styling guide, and personalized recommendations' :
                   serviceType === 'Virtual Wardrobe Curation' ? 'Get a complete wardrobe audit, outfit combinations, and shopping recommendations' :
                   serviceType === 'Personal Shopping Service' ? 'Get personalized shopping assistance, curated selections, and styling advice' :
                   'Get a 3-month transformation program with personal styling sessions and confidence coaching'}
                </p>
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
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{serviceType} Questionnaire</h1>
                <p className="text-sm md:text-base text-gray-600 mt-2">Complete this questionnaire for your personalized style analysis</p>
              </div>
              <ProgressIndicator 
                currentStep={currentStep}
                totalSteps={questions.length}
                stepLabels={questions.map(q => q.id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '))}
              />
              <div className="mt-4">
                <TrustSignals variant="inline" />
              </div>
            </div>

            <div className="mb-4 md:mb-8">
              <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6 text-gray-900">{currentQuestion.title}</h2>
              {currentQuestion.description && (
                <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-6">{currentQuestion.description}</p>
              )}
              
              {currentQuestion.conditional && !currentQuestion.conditional(answers) ? null : 
                currentQuestion.type === 'upload' ? (
                  <DropzoneUpload 
                    maxFiles={3}
                    onUploadComplete={(urls) => {
                      setPhotoUrls(urls)
                      // Store the URLs in answers as well
                      handleAnswer('photoUrls', urls)
                      // Update questionnaire state
                      setQuestionnaire(prev => ({
                        ...prev,
                        photoUrls: urls
                      }))
                    }}
                    className="min-h-[200px]"
                  />
                ) : currentQuestion.type === 'textarea' ? (
                  <textarea
                    id={currentQuestion.id}
                    name={currentQuestion.id}
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                    placeholder={currentQuestion.placeholder || ''}
                    className="w-full p-4 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 min-h-[120px]"
                  />
                ) : currentQuestion.type === 'checkbox' ? (
                  <div className="space-y-2 md:space-y-3">
                    {currentQuestion.options?.map((option, index) => {
                      const selectedOptions = answers[currentQuestion.id] || [];
                      return (
                        <label
                          key={index}
                          className="flex items-center p-3 md:p-4 rounded-lg md:rounded-xl border border-white/30 hover:border-purple-300 hover:bg-white/40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
                        >
                          <input
                            type="checkbox"
                            name={currentQuestion.id}
                            value={option}
                            checked={selectedOptions.includes(option)}
                            onChange={(e) => {
                              const newSelectedOptions = e.target.checked
                                ? [...selectedOptions, option]
                                : selectedOptions.filter((item: string) => item !== option);
                              handleAnswer(currentQuestion.id, newSelectedOptions);
                            }}
                            className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm md:text-base text-gray-900">{option}</span>
                        </label>
                      );
                    })}
                  </div>
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
                )
              }
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
                  disabled={currentQuestion.type === 'radio' && !answers[currentQuestion.id] || 
                           currentQuestion.type === 'checkbox' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) ||
                           currentQuestion.type === 'textarea' && (!answers[currentQuestion.id] || answers[currentQuestion.id].trim() === '') ||
                           currentQuestion.type === 'upload' && (!photoUrls || photoUrls.length === 0)}
                  className="py-2 md:py-4 px-5 md:px-8 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                >
                  <span>Continue to Payment</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={currentQuestion.type === 'radio' && !answers[currentQuestion.id] || 
                           currentQuestion.type === 'checkbox' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) ||
                           currentQuestion.type === 'textarea' && (!answers[currentQuestion.id] || answers[currentQuestion.id].trim() === '')}
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
        serviceType={serviceType}
      />
      <FeedbackWidget page="questionnaire" />
    </div>
  )
}