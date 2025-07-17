import { sendClientConfirmation } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'
import { sendSlackNotification, sendDiscordNotification, sendSMS } from '@/lib/integrations'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await handleFormData(request)
    const { email, name, message } = data
    
    const supabase = createClient()
    await supabase.from('contact_submissions').insert({
      email,
      name,
      message,
      created_at: new Date().toISOString(),
    })
    
    await sendClientConfirmation(email, name)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}

export async function GET() {
  const results = {
    database: false,
    email: false,
    slack: false,
    discord: false,
    sms: false,
    storage: false,
    ai: false,
    timestamp: new Date().toISOString(),
  }

  // Test Database
  try {
    const supabase = createClient()
    const { data, error } = await supabase.from('profiles').select('id').limit(1)
    results.database = !error
  } catch (error) {
    logger.error('Database test failed:', error)
  }

  // Test Email
  try {
    const emailResult = await sendClientConfirmation('delivered@resend.dev', 'Test User')
    results.email = emailResult
  } catch (error) {
    logger.error('Email test failed:', error)
  }

  // Test Slack
  try {
    if (process.env.SLACK_WEBHOOK_URL) {
      results.slack = await sendSlackNotification('🧪 Test from AuraColor', process.env.SLACK_WEBHOOK_URL)
    }
  } catch (error) {
    logger.error('Slack test failed:', error)
  }

  // Test Discord
  try {
    if (process.env.DISCORD_WEBHOOK_URL) {
      results.discord = await sendDiscordNotification('🧪 Test from AuraColor', process.env.DISCORD_WEBHOOK_URL)
    }
  } catch (error) {
    logger.error('Discord test failed:', error)
  }

  // Test SMS
  try {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
      results.sms = await sendSMS('+1234567890', '🧪 Test SMS from AuraColor')
    }
  } catch (error) {
    logger.error('SMS test failed:', error)
  }

  // Test Storage
  try {
    const supabase = createClient()
    const { data, error } = await supabase.storage.listBuckets()
    results.storage = !error
  } catch (error) {
    logger.error('Storage test failed:', error)
  }

  // Test AI
  try {
    if (process.env.OPENAI_API_KEY) {
      results.ai = true // Just check if key exists
    }
  } catch (error) {
    logger.error('AI test failed:', error)
  }

  const totalTests = Object.keys(results).length - 1
  const passedTests = Object.values(results).filter(Boolean).length - 1
  const successRate = Math.round((passedTests / totalTests) * 100)

  return NextResponse.json({
    success: successRate >= 70,
    successRate: `${ successRate }%`,
    passedTests: `${ passedTests }/${ totalTests }`,
    results,
    summary: {
      critical: {
        database: results.database,
        email: results.email,
      },
      optional: {
        slack: results.slack,
        discord: results.discord,
        sms: results.sms,
        storage: results.storage,
        ai: results.ai,
      },
    },
  })
}