import logger from "../lib/secure-logger";
export async function sendSlackNotification(message: string, webhookUrl: string): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    })
    return response.ok
  } catch (error) {
    logger.error('Slack notification failed:', error)
    return false
  }
}

export async function sendDiscordNotification(message: string, webhookUrl: string): Promise<boolean> {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: message }),
    })
    return response.ok
  } catch (error) {
    logger.error('Discord notification failed:', error)
    return false
  }
}

export async function sendSMS(to: string, message: string): Promise<boolean> {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const fromNumber = process.env.TWILIO_PHONE_NUMBER
    
    if (!accountSid || !authToken || !fromNumber) return false
    
    const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${ accountSid }/Messages.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${ Buffer.from(`${ accountSid }:${ authToken }`).toString('base64') }`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        From: fromNumber,
        To: to,
        Body: message,
      }),
    })
    
    return response.ok
  } catch (error) {
    logger.error('SMS failed:', error)
    return false
  }
}
// Helper function to validate and get URL parameters
function validateAndGet(params, key) {
  const value = params.get(key);
  if (!value) return null;
  
  // Sanitize the value
  return sanitizeHtml(value);
}
