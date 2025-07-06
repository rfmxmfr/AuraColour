'use client'

import { useState } from 'react'

interface FeedbackWidgetProps {
  page: string
  position?: 'bottom-right' | 'bottom-left'
}

export default function FeedbackWidget({ page, position = 'bottom-right' }: FeedbackWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async () => {
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page,
          rating,
          feedback,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      })
      setSubmitted(true)
      setTimeout(() => {
        setIsOpen(false)
        setSubmitted(false)
        setFeedback('')
        setRating(0)
      }, 2000)
    } catch (error) {
      console.error('Feedback submission failed:', error)
    }
  }

  return (
    <>
      {/* Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed ${position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'} 
          bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-full shadow-lg 
          hover:shadow-xl transition-all duration-200 z-50`}
        aria-label="Give feedback"
      >
        💬
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            {!submitted ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    How was your experience?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Your feedback helps us improve AuraColor
                  </p>
                </div>

                {/* Star Rating */}
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-colors ${
                        star <= rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>

                {/* Feedback Text */}
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Tell us more about your experience..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-sm"
                />

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={rating === 0}
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
            )}
          </div>
        </div>
      )}
    </>
  )
}