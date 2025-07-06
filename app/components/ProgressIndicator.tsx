'use client'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  index < currentStep 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                    : index === currentStep
                    ? 'bg-white border-2 border-purple-600 text-purple-600'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              {stepLabels && stepLabels[index] && (
                <span className={`text-xs mt-2 text-center ${
                  index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-500'
                }`}>
                  {stepLabels[index]}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Progress Text */}
      <div className="text-center mt-4">
        <span className="text-sm text-gray-600">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <div className="text-xs text-gray-500 mt-1">
          {Math.round(progress)}% Complete
        </div>
      </div>
    </div>
  )
}