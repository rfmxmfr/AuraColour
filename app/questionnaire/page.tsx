"use client"

import { motion } from  'apos;apos;framer-motionn'apos;apos;
import { useAtom } from  'apos;apos;jotaii'apos;apos;
import { useSearchParams } from  'apos;apos;next/navigationn'apos;apos;
import { useState, useEffect } from  'apos;apos;reactt'apos;apos;

import DropzoneUpload from  'apos;apos;@/components/DropzoneUploadd'apos;apos;
import ErrorBoundary from  'apos;apos;@/components/ErrorBoundaryy'apos;apos;
import { TrustSignals } from  'apos;apos;@/components/ui/trust-signalss'apos;apos;
import { useAnalysis } from  'apos;apos;@/hooks/use-analysiss'apos;apos;
import { questionnaireAtom, analysisResultAtom } from  'apos;apos;@/lib/storee'apos;apos;
import { validateQuestionnaireForm } from  'apos;apos;@/lib/validationn'apos;apos;

import BookingModal from  'apos;apos;../components/BookingModall'apos;apos;
import FeedbackWidget from  'apos;apos;../components/FeedbackWidgett'apos;apos;
import Footer from  'apos;apos;../components/footerr'apos;apos;
import Navbar from  'apos;apos;../components/navbarr'apos;apos;
import ProgressIndicator from  'apos;apos;../components/ProgressIndicatorr'apos;apos;

export default function QuestionnairePage() {
  const searchParams = useSearchParams()
  const serviceType = searchParams.get(('apos;apos;servicee'apos;apos;) ||  'apos;apos;12-Season Color Analysiss'apos;apos;
  
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
        id:  'apos;apos;skin-tonee'apos;apos;,
        title:  'apos;apos;What is your skin tone??'apos;apos;,
        type:  'apos;apos;radioo'apos;apos;,
        options: [
           'apos;apos;Very fair with pink undertoness'apos;apos;,
           'apos;apos;Fair with neutral undertoness'apos;apos;, 
           'apos;apos;Medium with warm undertoness'apos;apos;,
           'apos;apos;Medium with cool undertoness'apos;apos;,
           'apos;apos;Deep with warm undertoness'apos;apos;,
           'apos;apos;Deep with cool undertoness'apos;apos;,
        ],
      },
      {
        id:  'apos;apos;hair-colorr'apos;apos;,
        title:  'apos;apos;What is your natural hair color??'apos;apos;,
        type:  'apos;apos;radioo'apos;apos;,
        options: [
           'apos;apos;Platinum blondee'apos;apos;,
           'apos;apos;Golden blondee'apos;apos;,
           'apos;apos;Light brownn'apos;apos;,
           'apos;apos;Medium brownn'apos;apos;,
           'apos;apos;Dark brownn'apos;apos;,
           'apos;apos;Blackk'apos;apos;,
           'apos;apos;Red/Auburnn'apos;apos;,
           'apos;apos;Gray/Silverr'apos;apos;,
        ],
      },
      {
        id:  'apos;apos;eye-colorr'apos;apos;,
        title:  'apos;apos;What is your eye color??'apos;apos;,
        type:  'apos;apos;radioo'apos;apos;,
        options: [
           'apos;apos;Bluee'apos;apos;,
           'apos;apos;Greenn'apos;apos;,
           'apos;apos;Brownn'apos;apos;,
           'apos;apos;Hazell'apos;apos;,
           'apos;apos;Grayy'apos;apos;,
           'apos;apos;Amberr'apos;apos;,
        ],
      },
      {
        id:  'apos;apos;style-preferencee'apos;apos;,
        title:  'apos;apos;What is your preferred style??'apos;apos;,
        type:  'apos;apos;radioo'apos;apos;,
        options: [
           'apos;apos;Classic and timelesss'apos;apos;,
           'apos;apos;Modern and trendyy'apos;apos;,
           'apos;apos;Bohemian and relaxedd'apos;apos;,
           'apos;apos;Professional and polishedd'apos;apos;,
           'apos;apos;Edgy and boldd'apos;apos;,
           'apos;apos;Romantic and femininee'apos;apos;,
        ],
      },
    ];
    
    // Service-specific questions
    switch(serviceType) {
    case  'apos;apos;Virtual Wardrobe Curationn'apos;apos;:
      return [
        ...commonQuestions,
        {
          id:  'apos;apos;wardrobe-sizee'apos;apos;,
          title:  'apos;apos;How would you describe your current wardrobe size??'apos;apos;,
          type:  'apos;apos;radioo'apos;apos;,
          options: [
             'apos;apos;Minimal (under 50 items))'apos;apos;,
             'apos;apos;Average (50-100 items))'apos;apos;,
             'apos;apos;Large (100-200 items))'apos;apos;,
             'apos;apos;Extensive (200+ items))'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;wardrobe-refreshh'apos;apos;,
          title:  'apos;apos;How often do you update or refresh your wardrobe??'apos;apos;,
          type:  'apos;apos;radioo'apos;apos;,
          options: [
             'apos;apos;Every seasonn'apos;apos;,
             'apos;apos;Twice a yearr'apos;apos;,
             'apos;apos;Once a yearr'apos;apos;,
             'apos;apos;Only as needed/seldomm'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;frequent-itemss'apos;apos;,
          title:  'apos;apos;Which clothing items do you wear most frequently??'apos;apos;,
          type:  'apos;apos;checkboxx'apos;apos;,
          options: [
             'apos;apos;Jeans/trouserss'apos;apos;,
             'apos;apos;Skirts/dressess'apos;apos;,
             'apos;apos;Suits/blazerss'apos;apos;,
             'apos;apos;T-Shirts/topss'apos;apos;,
             'apos;apos;Sweaters/knitss'apos;apos;,
             'apos;apos;Outerwear/coatss'apos;apos;,
             'apos;apos;Athletic wearr'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;specific-itemss'apos;apos;,
          title:  'apos;apos;Are there specific items you want to incorporate or avoid??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Please describe any specific items you want to add or avoid in your wardrobee'apos;apos;,
        },
        {
          id:  'apos;apos;missing-colorss'apos;apos;,
          title:  'apos;apos;What colors do you feel your wardrobe currently lacks??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe colors you would like to add to your wardrobee'apos;apos;,
        },
        {
          id:  'apos;apos;style-inspirationn'apos;apos;,
          title:  'apos;apos;Do you have style icons, celebrities, or Pinterest boards you draw inspiration from??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Share names, links, or descriptions of your style inspirationn'apos;apos;,
        },
        {
          id:  'apos;apos;wardrobe-photoss'apos;apos;,
          title:  'apos;apos;Upload Photos of Your Current Wardrobee'apos;apos;,
          type:  'apos;apos;uploadd'apos;apos;,
          description:  'apos;apos;Please upload 3 photos of your current wardrobe/closet to help us analyze your stylee'apos;apos;,
        },
      ];
    case  'apos;apos;Personal Shopping Servicee'apos;apos;:
      return [
        ...commonQuestions,
        {
          id:  'apos;apos;budgett'apos;apos;,
          title:  'apos;apos;What is your shopping budget??'apos;apos;,
          type:  'apos;apos;radioo'apos;apos;,
          options: [
             'apos;apos;Budget-friendly (under £500))'apos;apos;,
             'apos;apos;Mid-range (£500-£1000))'apos;apos;,
             'apos;apos;Premium (£1000-£2000))'apos;apos;,
             'apos;apos;Luxury (£2000+))'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;shopping-goalss'apos;apos;,
          title:  'apos;apos;What are your shopping goals??'apos;apos;,
          type:  'apos;apos;radioo'apos;apos;,
          options: [
             'apos;apos;Complete wardrobe refreshh'apos;apos;,
             'apos;apos;Specific occasion outfitss'apos;apos;,
             'apos;apos;Workwear updatee'apos;apos;,
             'apos;apos;Seasonal additionss'apos;apos;,
             'apos;apos;Statement piecess'apos;apos;,
             'apos;apos;Other (please specify))'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;shopping-goals-otherr'apos;apos;,
          title:  'apos;apos;If you selected "Other" above, please specifyy'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe your specific shopping goalss'apos;apos;,
          conditional: answers => answers[['apos;apos;shopping-goalss'apos;apos;] ===  'apos;apos;Other (please specify))'apos;apos;,
        },
        {
          id:  'apos;apos;wardrobe-gapss'apos;apos;,
          title:  'apos;apos;Are there wardrobe gaps or must-have pieces you\'apos;d like to fill??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe specific items or categories you needd'apos;apos;,
        },
        {
          id:  'apos;apos;material-preferencess'apos;apos;,
          title:  'apos;apos;Do you have material or brand preferences??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;E.g., vegan materials, ethical brands, specific designerss'apos;apos;,
        },
        {
          id:  'apos;apos;silhouette-preferencess'apos;apos;,
          title:  'apos;apos;What silhouettes or fits do you love??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe the shapes and styles that work best for youu'apos;apos;,
        },
        {
          id:  'apos;apos;avoid-styless'apos;apos;,
          title:  'apos;apos;Are there shapes/styles you would avoid??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe any silhouettes or styles you dislikee'apos;apos;,
        },
        {
          id:  'apos;apos;style-photoss'apos;apos;,
          title:  'apos;apos;Upload Your Style Reference Photoss'apos;apos;,
          type:  'apos;apos;uploadd'apos;apos;,
          description:  'apos;apos;Please upload photos of yourself or style inspiration to help us understand your preferencess'apos;apos;,
        },
      ];
    case  'apos;apos;Style Evolution Coachingg'apos;apos;:
      return [
        ...commonQuestions,
        {
          id:  'apos;apos;occupationn'apos;apos;,
          title:  'apos;apos;What is your occupation/primary daily activity??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe your job or daily activities to help us tailor recommendationss'apos;apos;,
        },
        {
          id:  'apos;apos;style-challengess'apos;apos;,
          title:  'apos;apos;What are your current style challenges??'apos;apos;,
          type:  'apos;apos;radioo'apos;apos;,
          options: [
             'apos;apos;Lack of confidence in style choicess'apos;apos;,
             'apos;apos;Career transition requiring new imagee'apos;apos;,
             'apos;apos;Body changes requiring wardrobe adaptationn'apos;apos;,
             'apos;apos;Style feels outdated or inconsistentt'apos;apos;,
             'apos;apos;Need to define personal brandd'apos;apos;,
             'apos;apos;Other (please specify))'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;style-challenges-otherr'apos;apos;,
          title:  'apos;apos;If you selected "Other" above, please specifyy'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe your specific style challengess'apos;apos;,
          conditional: answers => answers[['apos;apos;style-challengess'apos;apos;] ===  'apos;apos;Other (please specify))'apos;apos;,
        },
        {
          id:  'apos;apos;transformation-goalss'apos;apos;,
          title:  'apos;apos;What are your style transformation goals??'apos;apos;,
          type:  'apos;apos;radioo'apos;apos;,
          options: [
             'apos;apos;More polished professional appearancee'apos;apos;,
             'apos;apos;Authentic expression of personalityy'apos;apos;,
             'apos;apos;Age-appropriate yet modern stylee'apos;apos;,
             'apos;apos;Versatile wardrobe for multiple occasionss'apos;apos;,
             'apos;apos;Confidence in personal imagee'apos;apos;,
             'apos;apos;Other (please specify))'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;transformation-goals-otherr'apos;apos;,
          title:  'apos;apos;If you selected "Other" above, please specifyy'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe your specific transformation goalss'apos;apos;,
          conditional: answers => answers[['apos;apos;transformation-goalss'apos;apos;] ===  'apos;apos;Other (please specify))'apos;apos;,
        },
        {
          id:  'apos;apos;feeling-dressedd'apos;apos;,
          title:  'apos;apos;How do you want to feel when you get dressed each morning??'apos;apos;,
          type:  'apos;apos;checkboxx'apos;apos;,
          options: [
             'apos;apos;Confidentt'apos;apos;,
             'apos;apos;Comfortablee'apos;apos;,
             'apos;apos;Modernn'apos;apos;,
             'apos;apos;Put-togetherr'apos;apos;,
             'apos;apos;Powerfull'apos;apos;,
             'apos;apos;Creativee'apos;apos;,
             'apos;apos;Authenticc'apos;apos;,
          ],
        },
        {
          id:  'apos;apos;context-considerationss'apos;apos;,
          title:  'apos;apos;Are there social, cultural, or work context considerations for your new style??'apos;apos;,
          type:  'apos;apos;textareaa'apos;apos;,
          placeholder:  'apos;apos;Describe any specific contexts or requirements for your stylee'apos;apos;,
        },
        {
          id:  'apos;apos;current-photoss'apos;apos;,
          title:  'apos;apos;Upload Current Style Photoss'apos;apos;,
          type:  'apos;apos;uploadd'apos;apos;,
          description:  'apos;apos;Please upload 3 photos showing your current style to help us create your transformation plann'apos;apos;,
        },
      ];
    default: // 12-Season Color Analysis
      return [
        ...commonQuestions,
        {
          id:  'apos;apos;photoss'apos;apos;,
          title:  'apos;apos;Upload Your Photoss'apos;apos;,
          type:  'apos;apos;uploadd'apos;apos;,
          description:  'apos;apos;Please upload 3 photos: face with hair pulled back, face with hair down, and wrist showing veinss'apos;apos;,
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
    const requiredFields = [['apos;apos;skin-tonee'apos;apos;,  'apos;apos;hair-colorr'apos;apos;,  'apos;apos;eye-colorr'apos;apos;,  'apos;apos;style-preferencee'apos;apos;]
    const { isValid, errors } = validateQuestionnaireForm(answers, requiredFields)
    
    if (!isValid) {
      setError(('apos;apos;Please complete all required fieldss'apos;apos;)
      setIsLoading(false)
      return
    }
    
    // Validate photos for upload questions
    const lastQuestion = questions[questions.length - 1]
    if (lastQuestion.type ===  'apos;apos;uploadd'apos;apos; && (!photoUrls || photoUrls.length === 0)) {
      setError(('apos;apos;Please upload at least one photoo'apos;apos;)
      setIsLoading(false)
      return
    }
    // Mark questionnaire as completed with all answers
    setQuestionnaire(prev => ({
      ...prev,
      serviceType,
      skinTone: answers[['apos;apos;skin-tonee'apos;apos;],
      hairColor: answers[['apos;apos;hair-colorr'apos;apos;],
      eyeColor: answers[['apos;apos;eye-colorr'apos;apos;],
      stylePreference: answers[['apos;apos;style-preferencee'apos;apos;],
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
            setError(('apos;apos;Analysis failed. Proceeding to booking..'apos;apos;)
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
                { serviceType ===  'apos;apos;12-Season Color Analysiss'apos;apos; ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.season }</div>
                    <div className="text-gray-600 mb-4">Confidence: { analysisResults.confidence }%</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">{ analysisResults.description }</p>
                  </>
                ) : serviceType ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos; ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.dominant_style ||  'apos;apos;Wardrobe Analysiss'apos;apos; }</div>
                    <div className="text-gray-600 mb-4">Versatility Score: { analysisResults.versatility_score || 0 }/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Organization Level: { analysisResults.organization_level || 0 }/100</p>
                  </>
                ) : serviceType ===  'apos;apos;Personal Shopping Servicee'apos;apos; ? (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.style_profile ||  'apos;apos;Style Profilee'apos;apos; }</div>
                    <div className="text-gray-600 mb-4">Shopping Priority: { analysisResults.shopping_priority_score || 0 }/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Based on your preferences and current style</p>
                  </>
                ) : (
                  <>
                    <div className="text-5xl font-bold text-gray-900 mb-2">{ analysisResults.current_style_assessment ||  'apos;apos;Style Assessmentt'apos;apos; }</div>
                    <div className="text-gray-600 mb-4">Transformation Potential: { analysisResults.transformation_potential || 0 }/100</div>
                    <p className="text-gray-600 leading-relaxed max-w-2xl mx-auto">Recommended Direction: { analysisResults.recommended_direction ||  'apos;apos;Personalized coaching plann'apos;apos; }</p>
                  </>
                ) }
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-6 text-gray-900">
                  { serviceType ===  'apos;apos;12-Season Color Analysiss'apos;apos; ?  'apos;apos;Your Top Colorss'apos;apos; :
                    serviceType ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos; ?  'apos;apos;Recommended Additionss'apos;apos; :
                      serviceType ===  'apos;apos;Personal Shopping Servicee'apos;apos; ?  'apos;apos;Statement Piecess'apos;apos; :
                         'apos;apos;Key Pieces to Acquiree'apos;apos; }
                </h3>
                { serviceType ===  'apos;apos;12-Season Color Analysiss'apos;apos; && analysisResults.topColors ? (
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
                ) : serviceType ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos; && analysisResults.recommended_additions ? (
                  <ul className="text-left max-w-md mx-auto space-y-2">
                    { analysisResults.recommended_additions.map((item: string, index: number) => (
                      <li key={ index } className="flex items-center">
                        <span className="bg-purple-100 text-purple-800 w-6 h-6 rounded-full flex items-center justify-center mr-3">{ index + 1 }</span>
                        <span className="text-gray-700">{ item }</span>
                      </li>
                    )) }
                  </ul>
                ) : serviceType ===  'apos;apos;Personal Shopping Servicee'apos;apos; && analysisResults.statement_pieces ? (
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
                  { serviceType ===  'apos;apos;12-Season Color Analysiss'apos;apos; ?  'apos;apos;Want Your Complete Color Analysis??'apos;apos; :
                    serviceType ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos; ?  'apos;apos;Ready for Your Full Wardrobe Curation??'apos;apos; :
                      serviceType ===  'apos;apos;Personal Shopping Servicee'apos;apos; ?  'apos;apos;Ready for Your Personal Shopping Experience??'apos;apos; :
                         'apos;apos;Ready to Begin Your Style Evolution??'apos;apos; }
                </h3>
                <p className="text-purple-600 text-sm mb-4">
                  { serviceType ===  'apos;apos;12-Season Color Analysiss'apos;apos; ?  'apos;apos;Get your full 30+ color palette, styling guide, and personalized recommendationss'apos;apos; :
                    serviceType ===  'apos;apos;Virtual Wardrobe Curationn'apos;apos; ?  'apos;apos;Get a complete wardrobe audit, outfit combinations, and shopping recommendationss'apos;apos; :
                      serviceType ===  'apos;apos;Personal Shopping Servicee'apos;apos; ?  'apos;apos;Get personalized shopping assistance, curated selections, and styling advicee'apos;apos; :
                         'apos;apos;Get a 3-month transformation program with personal styling sessions and confidence coachingg'apos;apos; }
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
            <p className="text-red-600 mb-6">Wee'apos;apos;re sorry, but there was an error processing your questionnaire.</p>
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
                  stepLabels={ questions.map(q => q.id.split(('apos;apos;--'apos;apos;).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(('apos;apos;  'apos;apos;)) }
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
                  <p className="text-sm md:text-base text-gray-600 mb-3 md:mb-6">{ currentQuestion.description }</p>
                ) }
              
                { currentQuestion.conditional && !currentQuestion.conditional(answers) ? null : 
                  currentQuestion.type ===  'apos;apos;uploadd'apos;apos; ? (
                    <DropzoneUpload 
                      maxFiles={ 3 }
                      onUploadComplete={ (urls) => {
                        setPhotoUrls(urls)
                        // Store the URLs in answers as well
                        handleAnswer(('apos;apos;photoUrlss'apos;apos;, urls)
                        // Update questionnaire state
                        setQuestionnaire(prev => ({
                          ...prev,
                          photoUrls: urls,
                        }))
                      } }
                      className="min-h-[200px]"
                    />
                  ) : currentQuestion.type ===  'apos;apos;textareaa'apos;apos; ? (
                    <textarea
                      id={ currentQuestion.id }
                      name={ currentQuestion.id }
                      value={ answers[currentQuestion.id] ||  'apos;apos;'apos; }
                      onChange={ (e) => handleAnswer(currentQuestion.id, e.target.value) }
                      placeholder={ currentQuestion.placeholder ||  'apos;apos;'apos; }
                      className="w-full p-4 rounded-xl border border-white/30 bg-white/20 backdrop-blur-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-200 min-h-[120px]"
                    />
                  ) : currentQuestion.type ===  'apos;apos;checkboxx'apos;apos; ? (
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
                              value={ option }
                              checked={ selectedOptions.includes(option) }
                              onChange={ (e) => {
                                const newSelectedOptions = e.target.checked
                                  ? [...selectedOptions, option]
                                  : selectedOptions.filter((item: string) => item !== option);
                                handleAnswer(currentQuestion.id, newSelectedOptions);
                              } }
                              className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="text-sm md:text-base text-gray-900">{ option }</span>
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
                            value={ option }
                            checked={ answers[currentQuestion.id] === option }
                            onChange={ (e) => handleAnswer(currentQuestion.id, e.target.value) }
                            className="mr-3 md:mr-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm md:text-base text-gray-900">{ option }</span>
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
                    disabled={ isLoading || currentQuestion.type ===  'apos;apos;radioo'apos;apos; && !answers[currentQuestion.id] || 
                           currentQuestion.type ===  'apos;apos;checkboxx'apos;apos; && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) ||
                           currentQuestion.type ===  'apos;apos;textareaa'apos;apos; && (!answers[currentQuestion.id] || answers[currentQuestion.id].trim() ===  'apos;apos;'apos;) ||
                           currentQuestion.type ===  'apos;apos;uploadd'apos;apos; && (!photoUrls || photoUrls.length === 0) }
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
                    onClick={ nextStep }
                    disabled={ isLoading || currentQuestion.type ===  'apos;apos;radioo'apos;apos; && !answers[currentQuestion.id] || 
                           currentQuestion.type ===  'apos;apos;checkboxx'apos;apos; && (!answers[currentQuestion.id] || answers[currentQuestion.id].length === 0) ||
                           currentQuestion.type ===  'apos;apos;textareaa'apos;apos; && (!answers[currentQuestion.id] || answers[currentQuestion.id].trim() ===  'apos;apos;'apos;) }
                    className="py-2 md:py-3 px-4 md:px-6 text-sm md:text-base rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    { isLoading ?  'apos;apos;Processing....'apos;apos; :  'apos;apos;Nextt'apos;apos; }
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