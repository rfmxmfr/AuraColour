'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { sendPushNotification } from '@/lib/integrations'

export default function NotificationSetup() {
  const [permission, setPermission] = useState<NotificationPermission>('default')

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if ('Notification' in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result === 'granted') {
        sendPushNotification(
          'AuraColor Notifications Enabled! 🎨',
          'You\'ll now receive updates about your color analysis and styling services.'
        )
      }
    }
  }

  if (!('Notification' in window)) {
    return null
  }

  if (permission === 'granted') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✅</span>
          <span className="text-green-800">Push notifications enabled</span>
        </div>
      </div>
    )
  }

  if (permission === 'denied') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-red-600 mr-2">❌</span>
          <span className="text-red-800">Push notifications blocked</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-blue-600 mr-2">🔔</span>
          <span className="text-blue-800">Enable notifications for updates</span>
        </div>
        <Button onClick={requestPermission} size="sm">
          Enable
        </Button>
      </div>
    </div>
  )
}