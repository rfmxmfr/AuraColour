import { toast } from "sonner"

type NotificationType = "success" | "error" | "warning" | "info"

interface NotificationOptions {
  title?: string
  description?: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function showNotification(
  type: NotificationType,
  message: string,
  options?: NotificationOptions
) {
  const { title, description, duration = 5000, action } = options || {}
  
  switch (type) {
    case "success":
      toast.success(title || message, {
        description: description || (title ? message : undefined),
        duration,
        action: action ? {
          label: action.label,
          onClick: action.onClick,
        } : undefined,
      })
      break
    case "error":
      toast.error(title || message, {
        description: description || (title ? message : undefined),
        duration,
        action: action ? {
          label: action.label,
          onClick: action.onClick,
        } : undefined,
      })
      break
    case "warning":
      toast.warning(title || message, {
        description: description || (title ? message : undefined),
        duration,
        action: action ? {
          label: action.label,
          onClick: action.onClick,
        } : undefined,
      })
      break
    case "info":
    default:
      toast.info(title || message, {
        description: description || (title ? message : undefined),
        duration,
        action: action ? {
          label: action.label,
          onClick: action.onClick,
        } : undefined,
      })
      break
  }
}

export function handleApiError(error: unknown, fallbackMessage = "An error occurred") {
  console.error(error)
  
  let errorMessage = fallbackMessage
  
  if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === "string") {
    errorMessage = error
  } else if (typeof error === "object" && error !== null && "message" in error) {
    errorMessage = String((error as { message: unknown }).message)
  }
  
  showNotification("error", errorMessage)
  return errorMessage
}

export async function sendClientConfirmation(email: string, name: string) {
  // Placeholder for client confirmation email
  console.log('Sending client confirmation to:', email, name)
  return { success: true }
}

export async function sendAdminAlert(subject: string, data: any) {
  // Placeholder for admin alert email
  console.log('Sending admin alert:', subject, data)
  return { success: true }
}