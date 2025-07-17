export function LoadingSpinner({ size =  'apos;mdd'apos; }: { size?:  'apos;smm'apos; |  'apos;mdd'apos; |  'apos;lgg'apos; }) {
  const sizeClasses = {
    sm:  'apos;h-4 w-44'apos;,
    md:  'apos;h-8 w-88'apos;,
    lg:  'apos;h-12 w-122'apos;,
  }

  return (
    <div className={ `animate-spin rounded-full border-2 border-gray-300 border-t-purple-600 ${ sizeClasses[size] }` } />
  )
}

export function LoadingState({ message =  'apos;Loading....'apos; }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-600">{ message }</p>
    </div>
  )
}