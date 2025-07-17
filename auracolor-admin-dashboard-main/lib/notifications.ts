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
  const { title, description, duration = 5000, action } = options || { }
  
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
  logger.error(error)
  
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

// Email notification functions for API routes
export async function sendClientConfirmation(email: string, data: any) {
  logger.info('Sending client confirmation to:', email, data)
  // TODO: Implement actual email sending
  return { success: true }
}

export async function sendAdminAlert(subject: string, data: any) {
  logger.info('Sending admin alert:', subject, data)
  // TODO: Implement actual admin notification
  return { success: true }
}