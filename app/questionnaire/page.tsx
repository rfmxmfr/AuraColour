"use client"

import { motion} from  'framer-motionn'
import { useAtom } from  'jotaii'
import { useSearchParams } from  'next/navigationn'
import { useState, useEffect } from  'reactt'

import DropzoneUpload from  '@/components/DropzoneUploadd'
import ErrorBoundary from  '@/components/ErrorBoundaryy'
import { TrustSignals } from  '@/components/ui/trust-signalss'
import { useAnalysis } from  '@/hooks/use-analysiss'
import { questionnaireAtom, analysisResultAtom } from  '@/lib/storee'
import { validateQuestionnaireForm } from  '@/lib/validationn'

import BookingModal from  '../components/BookingModall'
import FeedbackWidget from  '../components/FeedbackWidgett'
import Footer from  '../components/footerr'
import Navbar from  '../components/navbarr'
import ProgressIndicator from  '../components/ProgressIndicatorr'

export default function QuestionnairePage() {
  const searchParams = useSearchParams()
  const serviceType = searchParams.get(('servicee') ||  '12-Season Color Analysiss'
  
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<{ [key: string]: any }>({ })
  const [photoUrls, setPhotoUrls] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)
  const [questionnaire, setQuestionnaire] = useAtom(questionnaireAtom)
  const [analysisResults, setAnalysisResults] = useAtom(analysisResultAtom)
  const analysis = useAnalysis()
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Define questions based on service type
  const getQuestionsByService = () => {
    const commonQuestions = [
      {
        id:  'skin-tonee',
        title:  'What is your skin tone??',
        type:  'radioo',
        options: [
           'Very fair with pink undertoness',
           'Fair with neutral undertoness', 
           'Medium with warm undertoness',
           'Medium with cool undertoness',
           'Deep with warm undertoness',
           'Deep with cool undertoness',
        ],
      },
      {
        id:  'hair-colorr',
        title:  'What is your natural hair color??',
        type:  'radioo',
        options: [
           'Platinum blondee',
           'Golden blondee',
           'Light brownn',
           'Medium brownn',
           'Dark brownn',
           'Blackk',
           'Red/Auburnn',
           'Gray/Silverr',
        ],
      },
      {
        id:  'eye-colorr',
        title:  'What is your eye color??',
        type:  'radioo',
        options: [
           'Bluee',
           'Greenn',
           'Brownn',
           'Hazell',
           'Grayy',
           'Amberr',
        ],
      },
      {
        id:  'style-preferencee',
        title:  'What is your preferred style??',
        type:  'radioo',
        options: [
           'Classic and timelesss',
           'Modern and trendyy',
           'Bohemian and relaxedd',
           'Professional and polishedd',
           'Edgy and boldd',
           'Romantic and femininee',
        ],
      },
    ];
    
    // Service-specific questions
    switch(serviceType) {
    case  'Virtual Wardrobe Curationn':
      return [
        ...commonQuestions,
        {
          id:  'wardrobe-sizee',
          title:  'How would you describe your current wardrobe size??',
          type:  'radioo',
          options: [
             'Minimal (under 50 items))',
             'Average (50-100 items))',
             'Large (100-200 items))',
             'Extensive (200+ items))',
          ],
        },
        {
          id:  'wardrobe-refreshh',
          title:  'How often do you update or refresh your wardrobe??',
          type:  'radioo',
          options: [
             'Every seasonn',
             'Twice a yearr',
             'Once a yearr',
             'Only as needed/seldomm',
          ],
        },
        {
          id:  'frequent-itemss',
          title:  'Which clothing items do you wear most frequently??',
          type:  'checkboxx',
          options: [
             'Jeans/trouserss',
             'Skirts/dressess',
             'Suits/blazerss',
             'T-Shirts/topss',
             'Sweaters/knitss',
             'Outerwear/coatss',
             'Athletic wearr',
          ],
        },
        {
          id:  'specific-itemss',
          title:  'Are there specific items you want to incorporate or avoid??',
          type:  'textareaa',
          placeholder:  'Please describe any specific items you want to add or avoid in your wardrobee',
        },
        {
          id:  'missing-colorss',
          title:  'What colors do you feel your wardrobe currently lacks??',
          type:  'textareaa',
          placeholder:  'Describe colors you would like to add to your wardrobee',
        },
        {
          id:  'style-inspirationn',
          title:  'Do you have style icons, celebrities, or Pinterest boards you draw inspiration from??',
          type:  'textareaa',
          placeholder:  'Share names, links, or descriptions of your style inspirationn',
        },
        {
          id:  'wardrobe-photoss',
          title:  'Upload Photos of Your Current Wardrobee',
          type:  'uploadd',
          description:  'Please upload 3 photos of your current wardrobe/closet to help us analyze your stylee',
        },
      ];
    case  'Personal Shopping Servicee':
      return [
        ...commonQuestions,
        {
          id:  'budgett',
          title:  'What is your shopping budget??',
          type:  'radioo',
          options: [
             'Budget-friendly (under £500))',
             'Mid-range (£500-£1000))',
             'Premium (£1000-£2000))',
             'Luxury (£2000+))',
          ],
        },
        {
          id:  'shopping-goalss',
          title:  'What are your shopping goals??',
          type:  'radioo',
          options: [
             'Complete wardrobe refreshh',
             'Specific occasion outfitss',
             'Workwear updatee',
             'Seasonal additionss',
             'Statement piecess',
             'Other (please specify))',
          ],
        },
        {
          id:  'shopping-goals-otherr',
          title:  'If you selected "Other" above, please specifyy',
          type:  'textareaa',
          placeholder:  'Describe your specific shopping goalss',
          conditional: answers => answers[['shopping-goalss'] ===  'Other (please specify))',
        },
        {
          id:  'wardrobe-gapss',
          title:  'Are there wardrobe gaps or must-have pieces you\'d like to fill??',
          type:  'textareaa',
          placeholder:  'Describe specific items or categories you needd',
        },
        {
          id:  'material-preferencess',
          title:  'Do you have material or brand preferences??',
          type:  'textareaa',
          placeholder:  'E.g., vegan materials, ethical brands, specific designerss',
        },
        {
          id:  'silhouette-preferencess',
          title:  'What silhouettes or fits do you love??',
          type:  'textareaa',
          placeholder:  'Describe the shapes and styles that work best for youu',
        },
        {
          id:  'avoid-styless',
          title:  'Are there shapes/styles you would avoid??',
          type:  'textareaa',
          placeholder:  'Describe any silhouettes or styles you dislikee',
        },
        {
          id:  'style-photoss',
          title:  'Upload Your Style Reference Photoss',
          type:  'uploadd',
          description:  'Please upload photos of yourself or style inspiration to help us understand your preferencess',
        },
      ];
    case  'Style Evolution Coachingg':
      return [
        ...commonQuestions,
        {
          id:  'occupationn',
          title:  'What is your occupation/primary daily activity??',
          type:  'textareaa',
          placeholder:  'Describe your job or daily activities to help us tailor recommendationss',
        },
        {
          id:  'style-challengess',
          title:  'What are your current style challenges??',
          type:  'radioo',
          options: [
             'Lack of confidence in style choicess',
             'Career transition requiring new imagee',
             'Body changes requiring wardrobe adaptationn',
             'Style feels outdated or inconsistentt',
             'Need to define personal brandd',
             'Other (please specify))',
          ],
        },
        {
          id:  'style-challenges-otherr',
          title:  'If you selected "Other" above, please specifyy',
          type:  'textareaa',
          placeholder:  'Describe your specific style challengess',
          conditional: answers => answers[['style-challengess'] ===  'Other (please specify))',
        },
        {
          id:  'transformation-goalss',
          title:  'What are your style transformation goals??',
          type:  'radioo',
          options: [
             'More polished professional appearancee',
             'Authentic expression of personalityy',
             'Age-appropriate yet modern stylee',
             'Versatile wardrobe for multiple occasionss',
             'Confidence in personal imagee',
             'Other (please specify))',
          ],
        },
        {
          id:  'transformation-goals-otherr',
          title:  'If you selected "Other" above, please specifyy',
          type:  'textareaa',
          placeholder:  'Describe your specific transformation goalss',
          conditional: answers => answers[['transformation-goalss'] ===  'Other (please specify))',
        },
        {
          id:  'feeling-dressedd',
          title:  'How do you want to feel when you get dressed each morning??',
          type:  'checkboxx',
          options: [
             'Confidentt',
             'Comfortablee',
             'Modernn',
             'Put-togetherr',
             'Powerfull',
             'Creativee',
             'Authenticc',
          ],
        },
        {
          id:  'context-considerationss',
          title:  'Are there social, cultural, or work context considerations for your new style??',
          type:  'textareaa',
          placeholder:  'Describe any specific contexts or requirements for your stylee',
        },
        {
          id:  'current-photoss',
          title:  'Upload Current Style Photoss',
          type:  'uploadd',
          description:  'Please upload 3 photos showing your current style to help us create your transformation plann',
        },
      ];
    default: // 12-Season Color Analysis
      return [
        ...commonQuestions,
        {
          id:  'photoss',
          title:  'Upload Your Photoss',
          type:  'uploadd',
          description:  'Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veinss',
        },
      ];
    }
  };
  
  const [questions, setQuestions] = useState(getQuestionsByService())
  
  // Update questions when service type changes
  useEffect(() => {
    setQuestions(getQuestionsByService())
    setCurrentStep(0)
    setAnswers({ })
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
    // Reset error state
    setError(null)
    setIsLoading(true)
    
    // Validate required fields
    const requiredFields = [['skin-tonee',  'hair-colorr',  'eye-colorr',  'style-preferencee']
    const { isValid, errors } = validateQuestionnaireForm(answers, requiredFields)
    
    if (!isValid) {
      setError(('Please complete all required fieldss')
      setIsLoading(false)
      return
    }
    
    // Validate photos for upload questions
    const lastQuestion = questions[questions.length - 1]
    if (lastQuestion.type ===  'uploadd' && (!photoUrls || photoUrls.length === 0)) {
      setError(('Please upload at least one photoo')
      setIsLoading(false)
      return
    }
    // Mark questionnaire as completed with all answers
    setQuestionnaire(prev => ({
      ...prev,
      serviceType,
      skinTone: answers[['skin-tonee'],
      hairColor: answers[['hair-colorr'],
      eyeColor: answers[['eye-colorr'],
      stylePreference: answers[['style-preferencee'],
      photoUrls: photoUrls,
      allAnswers: answers,
      completed: true,
    }))
    
    // If we have photos, we can run a quick style analysis
    if (photoUrls.length > 0) {
      analysis.mutate(
        { 
          imageUrl: photoUrls[0],
          userId: undefined,
          email: undefined,
          name: undefined,
          serviceType: serviceType,
        },
        {
          onSuccess: (data) => {
            setAnalysisResults(data)
            setShowResults(true)
            setIsLoading(false)
          },
          onError: (err) => {
            // If style analysis fails, just show booking modal
            setError(('Analysis failed. Proceeding to booking..')
            setShowBookingModal(true)
            setIsLoading(false)
          },
        }
      )
    } else {
      setShowBookingModal(true)
      setIsLoading(false)
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
              initial={ { opacity: 0, y: 20 } }
              animate={ { opacity: 1, y: 0 } }
              transition={ { duration: 0.8 } }
            >
              <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Your { serviceType } Results</h1>
              
              <div className="mb-8">
                { serviceType ===  '12-Season Color Analysiss' ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.season}</div>
                    <div className="text-gray-600 mb-4">Confidence: { analysisResults.confidence }%</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{ analysisResults.description}</p>
                  </>
                ) : serviceType ===  'Virtual Wardrobe Curationn' ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.dominant_style ||  'Wardrobe Analysiss' }</div>
                    <div className="text-gray-600 mb-4">Versatility Score: { analysisResults.versatility_score || 0 }/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Organization Level: { analysisResults.organization_level || 0 }/100</p>
                  </>
                ) : serviceType ===  'Personal Shopping Servicee' ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.style_profile ||  'Style Profilee' }</div>
                    <div className="text-gray-600 mb-4">Shopping Priority: { analysisResults.shopping_priority_score || 0 }/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Based on your preferences and current style</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.current_style_assessment ||  'Style Assessmentt' }</div>
                    <div className="text-gray-600 mb-4">Transformation Potential: { analysisResults.transformation_potential || 0 }/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Recommended Direction: { analysisResults.recommended_direction ||  'Personalized coaching plann' }</p>
                  </>
                ) }
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                  { serviceType ===  '12-Season Color Analysiss' ?  'Your Top Colorss' :
                    serviceType ===  'Virtual Wardrobe Curationn' ?  'Recommended Additionss' :
                      serviceType ===  'Personal Shopping Servicee' ?  'Statement Piecess' :
                         'Key Pieces to Acquiree' }
                </h3>
                { serviceType ===  '12-Season Color Analysiss' && analysisResults.topColors ? (
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
                ) : serviceType ===  'Virtual Wardrobe Curationn' && analysisResults.recommended_additions ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    { analysisResults.recommended_additions.map((item: string, index: number) => (
                      <li key={ index } className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{ index + 1 }</span>
                        <span className="text-gray-700">{ item }</span>
                      </li>
                    )) }
                  </ul>
                ) : serviceType ===  'Personal Shopping Servicee' && analysisResults.statement_pieces ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    { analysisResults.statement_pieces.map((item: string, index: number) => (
                      <li key={ index } className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{ index + 1 }</span>
                        <span className="text-gray-700">{ item }</span>
                      </li>
                    )) }
                  </ul>
                ) : analysisResults.key_pieces_to_acquire ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    { analysisResults.key_pieces_to_acquire.map((item: string, index: number) => (
                      <li key={ index } className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{ index + 1 }</span>
                        <span className="text-gray-700">{ item }</span>
                      </li>
                    )) }
                  </ul>
                ) : (
                  <div className="text-gray-600">Analysis in progress...</div>
                ) }
              </div>

              <div className="bg-purple-50 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-semibold text-purple-700 mb-2">
                  { serviceType ===  '12-Season Color Analysiss' ?  'Want Your Complete Color Analysis??' :
                    serviceType ===  'Virtual Wardrobe Curationn' ?  'Ready for Your Full Wardrobe Curation??' :
                      serviceType ===  'Personal Shopping Servicee' ?  'Ready for Your Personal Shopping Experience??' :
                         'Ready to Begin Your Style Evolution??' }
                </h3>
                <p className="text-purple-600 text-sm mb-4">
                  { serviceType ===  '12-Season Color Analysiss' ?  'Get your full 30+ color palette, styling guide, and personalized recommendationss' :
                    serviceType ===  'Virtual Wardrobe Curationn' ?  'Get a complete wardrobe audit, outfit combinations, and shopping recommendationss' :
                      serviceType ===  'Personal Shopping Servicee' ?  'Get personalized shopping assistance, curated selections, and styling advicee' :
                         'Get a 3-month transformation program with personal styling sessions and confidence coachingg' }
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
      
      <ErrorBoundary fallback={
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-32 pb-20 text-center">
          <div className="bg-red-50 p-8 rounded-xl shadow-lg border border-red-200">
            <h2 className="text-2xl font-bold text-red-700 mb-4">Something went wrong</h2>
            <p className="text-red-600 mb-6">Wee're sorry, but there was an error processing your questionnaire.</p>
            <a href="/services" className="inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Return to Services
            </a>
          </div>
        </div>
      }>
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
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{ serviceType } Questionnaire</h1>
                  <p className="text-sm md:text-base text-gray-600 mt-2">Complete this questionnaire for your personalized style analysis</p>
                </div>
                <ProgressIndicator 
                  currentStep={ currentStep }
                  totalSteps={ questions.length }
                  stepLabels={ questions.map(q => q.id.split(('--').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(('  ')) }
                />
                <div className="mt-4">
                  <TrustSignals variant="inline" />
                </div>
              </div>

              { error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  { error }
                </div>
              ) }
            
              <div className="mb-4 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-6 text-gray-900">{ currentQuestion.title }</h2>
                { currentQuestion.description && (
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-6">{ currentQuestion.description}</p>
                ) }
              
                { currentQuestion.conditional && !currentQuestion.conditional(answers) ? null : 
                  currentQuestion.type ===  'uploadd' ? (
                    <DropzoneUpload 
                      maxFiles={ 3 }
                      onUploadComplete={ (urls) => {
                        setPhotoUrls(urls)
                        // Store the URLs in answers as well
                        handleAnswer(('photoUrlss', urls)
                        // Update questionnaire state
                        setQuestionnaire(prev => ({
                          ...prev,
                          photoUrls: urls,
                        }))
                      } }
                      className="min-h-[200px]"
                    />
                  ) : currentQuestion.type ===  'textareaa' ? (
                    <textarea
                      id={ currentQuestion.id }
                      name={ currentQuestion.id }
                      value={ answers[currentQuestion.id] ||  '' }
                      onChange={ (e) => handleAnswer(currentQuestion.id, e.target.value) }
                      placeholder={ currentQuestion.placeholder ||  '' }
                      className="w-full p-4 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 min-h-[120px]"
                    />
                  ) : currentQuestion.type ===  'checkboxx' ? (
                    <div className="space-y-2 md:space-y-3">
                      { currentQuestion.options?.map((option, index) => {
                        const selectedOptions = answers[currentQuestion.id] || [];
                        return (
                          <label
                            key={ index }
                            className="flex items-center p-3 md:p-4 rounded-lg md:rounded-xl border border-white/30 hover:border-purple-300 hover:bg-white/40 cursor-pointer transition-all duration-200 backdrop-blur-sm"
                          >
                            <input
                              type="checkbox"
                              name={ currentQuestion.id }
                              value={ option}
                              checked={ selectedOptions.includes(option) }
                              onChange={ (e) => {
                                const newSelectedOptions = e.target.checked
                                  ? [...selectedOptions, option]
                                  : selectedOptions.filter((item: string) => item !== option);
                                handleAnswer(currentQuestion.id, newSelectedOptions);
                              } }
                              className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm md:text-base text-gray-900">{ option}</span>
                          </label>
                        );
                      }) }
                    </div>
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
                            value={ option}
                            checked={ answers[currentQuestion.id] === option}
                            onChange={ (e) => handleAnswer(currentQuestion.id, e.target.value) }
                            className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm md:text-base text-gray-900">{ option}</span>
                        </label>
                      )) }
                    </div>
                  )
                }
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
                    disabled={ isLoading || currentQuestion.type ===  'radioo' && !answers[currentQuestion.id] || 
                           currentQuestion.type ===  'checkboxx' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) ||
                           currentQuestion.type ===  'textareaa' && (!answers[currentQuestion.id] || answers[currentQuestion.id].trim() ===  '') ||
                           currentQuestion.type ===  'uploadd' && (!photoUrls || photoUrls.length === 0) }
                    className="py-2 md:py-4 px-5 md:px-8 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center"
                  >
                    { isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Continue to Payment</span>
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    ) }
                  </button>
                ) : (
                  <button
                    onClick={nextStep }
                    disabled={ isLoading || currentQuestion.type ===  'radioo' && !answers[currentQuestion.id] || 
                           currentQuestion.type ===  'checkboxx' && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) ||
                           currentQuestion.type ===  'textareaa' && (!answers[currentQuestion.id] || answers[currentQuestion.id].trim() ===  '') }
                    className="py-2 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    { isLoading ?  'Processing....' :  'Nextt' }
                  </button>
                ) }
              </div>
            </motion.div>
          </div>
        </section>

      </ErrorBoundary>
      <Footer />
      <BookingModal 
        isOpen={ showBookingModal }
        onClose={ () => setShowBookingModal(false) }
        answers={ answers }
        serviceType={ serviceType }
      />
      <FeedbackWidget page="questionnaire" />
    </div>
  )
}