import logger from "../lib/secure-logger";
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { analyze12Season } from '@/lib/color-analysis/analyzer'
import { sendColorAnalysisResults, sendAdminAlert } from '@/lib/email-notifications'
import { sanitizeInput, sanitizeObject } from '@/lib/security'
import { createClient } from '@/lib/supabase/server'

// Define validation schema for request body
const requestSchema = z.object({
  imageUrl: z.string().url(),
  userId: z.string().uuid().optional(),
  email: z.string().email().optional(),
  name: z.string().max(100).optional(),
  questionnaire: z.record(z.unknown()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json()

    // Validate input data
    const validationResult = requestSchema.safeParse(rawBody)
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validationResult.error.format() }, { status: 400 })
    }

    const { imageUrl, userId, email, name, questionnaire } = validationResult.data

    // Sanitize user inputs
    const sanitizedName = name ? sanitizeInput(name) : 'Anonymous'
    const sanitizedEmail = email || 'anonymous@auracolor.com'
    const sanitizedQuestionnaire = questionnaire ? sanitizeObject(questionnaire) : {}

    const analysis = await analyze12Season(imageUrl)
    const supabase = await createClient()

    const ticketNumber = `12S-${Date.now()}`
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: sanitizedEmail,
      customer_name: sanitizedName,
      service_type: '12_season_analysis',
      status: 'completed',
      image_url: imageUrl,
      questionnaire_data: { ...sanitizedQuestionnaire, features: analysis.features },
    }).select().single()

    if (ticket) {
      await supabase.from('analyst_reports').insert({
        ticket_id: ticket.id,
        season_analysis: `12-Season Analysis: ${analysis.season}`,
        color_recommendations: analysis.colors,
        styling_notes: `Features: ${JSON.stringify(analysis.features)}. Category: ${analysis.category}`,
        confidence_score: analysis.confidence,
        status: 'completed',
        ai_analysis: analysis,
      })
    }

    if (userId) {
      await supabase.from('color_analysis_results').insert({
        user_id: userId,
        image_url: imageUrl,
        season: analysis.season,
        confidence: analysis.confidence,
        undertone: analysis.features.undertone,
        recommended_colors: analysis.colors,
        analysis_data: analysis,
      })
    }

    if (email && name) {
      await Promise.all([
        sendColorAnalysisResults(sanitizedEmail, sanitizedName, analysis),
        sendAdminAlert('12-Season Analysis', { email: sanitizedEmail, name: sanitizedName, season: analysis.season }),
      ])
    }

    // Sanitize the output data
    const sanitizedAnalysis = sanitizeObject(analysis)

    return NextResponse.json({
      ...sanitizedAnalysis,
      ticket_number: ticketNumber,
      ticket_id: ticket?.id,
    })
  } catch (error) {
    // logger.error('12-season analysis failed:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}