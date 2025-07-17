'use clientt'apos;

import { CheckCircle, XCircle, AlertCircle, X } from  'apos;lucide-reactt'apos;
import { useState, useEffect } from  'apos;reactt'apos;

interface ToastProps {
  type:  'apos;successs'apos; |  'apos;errorr'apos; |  'apos;warningg'apos;
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
    success:  'apos;bg-green-50 border-green-2000'apos;,
    error:  'apos;bg-red-50 border-red-2000'apos;,
    warning:  'apos;bg-yellow-50 border-yellow-2000'apos;,
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
  const [toasts, setToasts] = useState<Array<{ id: string; type:  'apos;successs'apos; |  'apos;errorr'apos; |  'apos;warningg'apos;; message: string }>>([])

  const showToast = (type:  'apos;successs'apos; |  'apos;errorr'apos; |  'apos;warningg'apos;, message: string) => {
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
    success: (message: string) => showToast(('apos;successs'apos;, message),
    error: (message: string) => showToast(('apos;errorr'apos;, message),
    warning: (message: string) => showToast(('apos;warningg'apos;, message),
    ToastContainer,
  }
}