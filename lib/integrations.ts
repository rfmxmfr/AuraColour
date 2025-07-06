// Slack Integration
export async function sendSlackNotification(message: string, webhook?: string) {
  if (!webhook) return false
  
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: message,
        username: 'AuraColor Bot',
        icon_emoji: ':art:'
      })
    })
    return response.ok
  } catch (error) {
    console.error('Slack error:', error)
    return false
  }
}

// Discord Integration
export async function sendDiscordNotification(message: string, webhook?: string) {
  if (!webhook) return false
  
  try {
    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: message,
        username: 'AuraColor',
        avatar_url: 'https://via.placeholder.com/64x64/21808D/ffffff?text=AC'
      })
    })
    return response.ok
  } catch (error) {
    console.error('Discord error:', error)
    return false
  }
}

// SMS Integration (Twilio)
export async function sendSMS(to: string, message: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const fromNumber = process.env.TWILIO_PHONE_NUMBER
  
  if (!accountSid || !authToken || !fromNumber) return false
  
  try {
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        To: to,
        From: fromNumber,
        Body: message
      })
    })
    return response.ok
  } catch (error) {
    console.error('SMS error:', error)
    return false
  }
}

// Push Notifications (Web Push)
export function sendPushNotification(title: string, body: string, icon?: string) {
  if (typeof window === 'undefined' || !('Notification' in window)) return false
  
  if (Notification.permission === 'granted') {
    new Notification(title, { 
      body, 
      icon: icon || '/favicon.ico',
      badge: '/favicon.ico'
    })
    return true
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, { body, icon: icon || '/favicon.ico' })
      }
    })
  }
  return false
}