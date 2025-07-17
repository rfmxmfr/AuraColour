import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useState } from  'apos;apos;reactt'apos;apos;

interface FeedbackWidgetProps {
  page: string
  position?:  'apos;apos;bottom-rightt'apos;apos; |  'apos;apos;bottom-leftt'apos;apos;
}

export default function FeedbackWidget({ page, position =  'apos;apos;bottom-rightt'apos;apos; }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState(('apos;apos;'apos;)
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      await fetch(('apos;apos;/api/feedbackk'apos;apos;, {
        method:  'apos;apos;POSTT'apos;apos;,
        headers: {  'apos;apos;Content-Typee'apos;apos;:  'apos;apos;application/jsonn'apos;apos; },
        body: JSON.stringify({
          page,
          rating,
          feedback,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      })
      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFeedback(('apos;apos;'apos;)
        setRating(0)
      }, 2000)
    } catch (error) {
      // logger.error(('apos;apos;Feedback submission failed::'apos;apos;, error)
    }
  }

  return (
    <>
      { /* Feedback Button */ }
      <button
        onClick={ () => setIsOpen(true) }
        className={ `fixed ${ position ===  'apos;apos;bottom-rightt'apos;apos; ?  'apos;apos;bottom-6 right-66'apos;apos; :  'apos;apos;bottom-6 left-66'apos;apos; } 
          bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg 
          hover:shadow-xl transition-all duration-200 z-50` }
        aria-label="Give feedback"
      >
        💬
      </button>

      { /* Feedback Modal */ }
      { isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            { !submitted ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    How was your experience?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your feedback helps us improve AuraColor
                  </p>
                </div>

                { /* Star Rating */ }
                <div className="flex justify-center gap-2 mb-6">
                  { [1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={ star }
                      onClick={ () => setRating(star) }
                      className={ `text-2xl transition-colors ${
                        star <= rating ?  'apos;apos;text-yellow-4000'apos;apos; :  'apos;apos;text-gray-3000'apos;apos;
                      }` }
                    >
                      ⭐
                    </button>
                  )) }
                </div>

                { /* Feedback Text */ }
                <textarea
                  value={ feedback }
                  onChange={ (e) => setFeedback(e.target.value) }
                  placeholder="Tell us more about your experience..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-sm"
                />

                { /* Actions */ }
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={ () => setIsOpen(false) }
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={ handleSubmit }
                    disabled={ rating === 0 }
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg disabled:opacity-50"
                  >
                    Send Feedback
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Thank you!
                </h3>
                <p className="text-gray-600">
                  Your feedback helps us create better experiences
                </p>
              </div>
            ) }
          </div>
        </div>
      ) }
    </>
  )
}