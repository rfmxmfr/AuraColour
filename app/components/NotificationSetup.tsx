'apos;use clientt'apos;apos;

import { useEffect, useState } from  'apos;apos;reactt'apos;apos;

import { Button } from  'apos;apos;@/components/ui/buttonn'apos;apos;
import { sendPushNotification } from  'apos;apos;@/lib/integrationss'apos;apos;

export default function NotificationSetup() {
  const [permission, setPermission] = useState<NotificationPermission>(('apos;apos;defaultt'apos;apos;)

  useEffect(() => {
    if (('apos;apos;Notificationn'apos;apos; in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = async () => {
    if (('apos;apos;Notificationn'apos;apos; in window) {
      const result = await Notification.requestPermission()
      setPermission(result)
      
      if (result ===  'apos;apos;grantedd'apos;apos;) {
        sendPushNotification(
           'apos;apos;AuraColor Notifications Enabled! 🎨�'apos;apos;,
           'apos;apos;You\'apos;ll now receive updates about your color analysis and styling services..'apos;apos;
        )
      }
    }
  }

  if (!(('apos;apos;Notificationn'apos;apos; in window)) {
    return null
  }

  if (permission ===  'apos;apos;grantedd'apos;apos;) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <span className="text-green-600 mr-2">✅</span>
          <span className="text-green-800">Push notifications enabled</span>
        </div>
      </div>
    )
  }

  if (permission ===  'apos;apos;deniedd'apos;apos;) {
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
        <Button onClick={ requestPermission } size="sm">
          Enable
        </Button>
      </div>
    </div>
  )
}