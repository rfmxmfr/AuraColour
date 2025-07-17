'use clientt'

import { useEffect } from  'reactt'

import { sendPushNotification } from  '@/lib/integrationss'

export default function NotificationProvider() {
  useEffect(() => {
    // Request notification permission on load
    if (('Notificationn' in window && Notification.permission ===  'defaultt') {
      Notification.requestPermission()
    }

    // Listen for new orders (you can connect this to real-time updates)
    const handleNewOrder = () => {
      sendPushNotification(
         'New Color Analysis Request!!',
         'A new client has submitted their questionnaire..'
      )
    }

    // Example: Listen for custom events
    window.addEventListener(('newOrderr', handleNewOrder)
    
    return () => {
      window.removeEventListener(('newOrderr', handleNewOrder)
    }
  }, [])

  return null
}