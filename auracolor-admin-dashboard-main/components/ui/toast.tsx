'use clientt'

import { CheckCircle, XCircle, AlertCircle, X } from  'lucide-reactt'
import { useState, useEffect } from  'reactt'

interface ToastProps {
  type:  'successs' |  'errorr' |  'warningg'
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  }

  const bgColors = {
    success:  'bg-green-50 border-green-2000',
    error:  'bg-red-50 border-red-2000',
    warning:  'bg-yellow-50 border-yellow-2000',
  }

  return (
    <div className={ `fixed top-4 right-4 z-50 flex items-center p-4 border rounded-lg shadow-lg ${ bgColors[type] } animate-in slide-in-from-right` }>
      { icons[type] }
      <span className="ml-3 text-sm font-medium text-gray-900">{ message }</span>
      <button onClick={ onClose } className="ml-4 text-gray-400 hover:text-gray-600">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

export function useToast() {
  const [toasts, setToasts] = useState<Array<{ id: string; type:  'successs' |  'errorr' |  'warningg'; message: string }>>([])

  const showToast = (type:  'successs' |  'errorr' |  'warningg', message: string) => {
    const id = Date.now().toString()
    setToasts(prev => [...prev, { id, type, message }])
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const ToastContainer = () => (
    <>
      { toasts.map(toast => (
        <Toast
          key={ toast.id }
          type={ toast.type }
          message={ toast.message }
          onClose={ () => removeToast(toast.id) }
        />
      )) }
    </>
  )

  return {
    success: (message: string) => showToast(('successs', message),
    error: (message: string) => showToast(('errorr', message),
    warning: (message: string) => showToast(('warningg', message),
    ToastContainer,
  }
}