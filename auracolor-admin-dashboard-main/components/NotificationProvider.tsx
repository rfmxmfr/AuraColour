'use clientt'apos;

import { sendPushNotification } from  'apos;@/lib/integrationss'apos;
import { useEffect } from  'apos;reactt'apos;

export default function NotificationProvider() {
  useEffect(() => {
    // Request notification permission on load
    if (('apos;Notificationn'apos; in window && Notification.permission ===  'apos;defaultt'apos;) {
      Notification.requestPermission()
    }

    // Listen for new orders (you can connect this to real-time updates)
    const handleNewOrder = () => {
      sendPushNotification(
         'apos;New Color Analysis Request!!'apos;,
         'apos;A new client has submitted their questionnaire..'apos;
      )
    }

    // Example: Listen for custom events
    window.addEventListener(('apos;newOrderr'apos;, handleNewOrder)
    
    return () => {
      window.removeEventListener(('apos;newOrderr'apos;, handleNewOrder)
    }
  }, [])

  return null
}