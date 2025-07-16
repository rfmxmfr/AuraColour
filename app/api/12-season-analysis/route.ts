import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { analyze12Season } from '@/lib/color-analysis/analyzer'
import { sendColorAnalysisResults, sendAdminAlert } from '@/lib/email-notifications'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { imageUrl, userId, email, name, questionnaire } = body
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 })
    }

    const analysis = await analyze12Season(imageUrl)
    const supabase = await createClient()
    
    const ticketNumber = `12S-${Date.now()}`
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: email || 'anonymous@auracolor.com',
      customer_name: name || 'Anonymous',
      service_type: '12_season_analysis',
      status: 'completed',
      image_url: imageUrl,
      questionnaire_data: { ...questionnaire, features: analysis.features }
    }).select().single()
    
    if (ticket) {
      await supabase.from('analyst_reports').insert({
        ticket_id: ticket.id,
        season_analysis: `12-Season Analysis: ${analysis.season}`,
        color_recommendations: analysis.colors,
        styling_notes: `Features: ${JSON.stringify(analysis.features)}. Category: ${analysis.category}`,
        confidence_score: analysis.confidence,
        status: 'completed',
        ai_analysis: analysis
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
        analysis_data: analysis
      })
    }
    
    if (email && name) {
      await Promise.all([
        sendColorAnalysisResults(email, name, analysis),
        sendAdminAlert('12-Season Analysis', { email, name, season: analysis.season })
      ])
    }
    
    return NextResponse.json({
      ...analysis,
      ticket_number: ticketNumber,
      ticket_id: ticket?.id
    })
  } catch (error) {
    console.error('12-season analysis failed:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}