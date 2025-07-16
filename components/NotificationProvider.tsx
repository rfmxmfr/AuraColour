'use client'

import { useEffect } from 'react'
import { sendPushNotification } from '@/lib/integrations'

export default function NotificationProvider() {
  useEffect(() => {
    // Request notification permission on load
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }

    // Listen for new orders (you can connect this to real-time updates)
    const handleNewOrder = () => {
      sendPushNotification(
        'New Color Analysis Request!',
        'A new client has submitted their questionnaire.'
      )
    }

    // Example: Listen for custom events
    window.addEventListener('newOrder', handleNewOrder)
    
    return () => {
      window.removeEventListener('newOrder', handleNewOrder)
    }
  }, [])

  return null
}