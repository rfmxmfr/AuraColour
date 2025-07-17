import { emailTemplates } from '@/lib/email-templates'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Complete test questionnaire data
const testQuestionnaire = {
  skinTone: 'Medium with warm undertones',
  hairColor: 'Dark brown',
  eyeColor: 'Brown',
  style: 'Professional and polished',
  email: 'test@example.com',
  name: 'Test User',
}

// Color analysis algorithm
function analyzeColors(answers: any) {
  const { skinTone, hairColor, eyeColor } = answers
  
  let season = 'Autumn'
  let confidence = 85
  let undertone = 'warm'
  let recommendedColors = ['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887']
  
  // Determine season based on combinations
  if (skinTone.includes('fair') && hairColor.includes('blonde')) {
    season = 'Spring'
    recommendedColors = ['#FFB6C1', '#98FB98', '#F0E68C', '#DDA0DD', '#87CEEB']
    confidence = 90
  } else if (skinTone.includes('cool') || eyeColor === 'Blue') {
    season = 'Winter'
    undertone = 'cool'
    recommendedColors = ['#000080', '#8B0000', '#4B0082', '#2F4F4F', '#191970']
    confidence = 88
  } else if (skinTone.includes('fair') && hairColor.includes('light')) {
    season = 'Summer'
    undertone = 'cool'
    recommendedColors = ['#E6E6FA', '#F0F8FF', '#B0E0E6', '#D8BFD8', '#AFEEEE']
    confidence = 82
  }
  
  return {
    season,
    confidence,
    undertone,
    recommended_colors: recommendedColors,
    description: `You are a ${ season }! This means you look best in ${ undertone } tones that complement your natural coloring.`,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, name = 'Valued Customer' } = await request.json()
    
    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email is required', 
      }, { status: 400 })
    }

    // Use test data for analysis
    const results = analyzeColors(testQuestionnaire)
    
    // Store in database
    const supabase = createClient()
    const { data: submission, error: dbError } = await supabase
      .from('questionnaire_submissions')
      .insert({
        session_id: crypto.randomUUID(),
        answers: testQuestionnaire,
        results,
        email,
        name,
      })
      .select()
      .single()

    if (dbError) {
      logger.error('Database error:', dbError)
    }

    // Send email with results
    const emailTemplate = emailTemplates.colorResults(name, results)
    
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'AuraColor <noreply@auracolor.com>',
      to: [email],
      subject: emailTemplate.subject,
      html: emailTemplate.html,
    })

    if (emailError) {
      logger.error('Email error:', emailError)
      return NextResponse.json({
        success: false,
        error: 'Failed to send email',
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'Full color analysis test sent to email successfully',
      results,
      emailId: emailData?.id,
      submissionId: submission?.id,
    })

  } catch (error) {
    logger.error('Full color test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to process full color test',
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Full Color Analysis Test API',
    description: 'POST to this endpoint with email to receive complete color analysis questionnaire results',
    testData: testQuestionnaire,
    sampleResults: analyzeColors(testQuestionnaire),
  })
}