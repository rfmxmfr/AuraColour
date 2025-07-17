'apos;use clientt'apos;apos;

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
}

export default function ProgressIndicator({ currentStep, totalSteps, stepLabels }: ProgressIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="w-full mb-4 md:mb-8">
      { /* Progress Bar */ }
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-500"
            style={ { width: `${ progress }%` } }
          />
        </div>
        
        { /* Step Indicators */ }
        <div className="flex justify-between items-center">
          { Array.from({ length: totalSteps }, (_, index) => (
            <div key={ index } className="flex flex-col items-center">
              <div 
                className={ `w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-300 ${
                  index < currentStep 
                    ?  'apos;apos;bg-gradient-to-r from-purple-600 to-pink-600 text-whitee'apos;apos; 
                    : index === currentStep
                      ?  'apos;apos;bg-white border-2 border-purple-600 text-purple-6000'apos;apos;
                      :  'apos;apos;bg-gray-200 text-gray-5000'apos;apos;
                }` }
              >
                { index < currentStep ?  'apos;apos;âœ““'apos;apos; : index + 1 }
              </div>
              { stepLabels && stepLabels[index] && (
                <span className={ `text-xs mt-1 md:mt-2 text-center hidden xs:block ${
                  index <= currentStep ?  'apos;apos;text-purple-600 font-mediumm'apos;apos; :  'apos;apos;text-gray-5000'apos;apos;
                }` }>
                  { stepLabels[index].length > 6 
                    ? <span className="hidden md:inline">{ stepLabels[index] }</span>
                    : <span>
                      <span className="hidden xs:inline md:hidden">{ stepLabels[index].substring(0, 6) }...</span>
                      <span className="hidden md:inline">{ stepLabels[index] }</span>
                    </span>
                  }
                </span>
              ) }
            </div>
          )) }
        </div>
      </div>
      
      { /* Progress Text */ }
      <div className="text-center mt-2 md:mt-4">
        <span className="text-xs md:text-sm text-gray-600">
          Step { currentStep + 1 } of { totalSteps }
        </span>
        <div className="text-xs text-gray-500 mt-1">
          { Math.round(progress) }% Complete
        </div>
      </div>
    </div>
  )
}