import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendStyleResults, sendAdminAlert } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    let body: any
    
    if (contentType?.includes('multipart/form-data')) {
      body = await handleFormData(request)
    } else {
      body = await request.json()
    }
    
    const { imageUrl, userId, email, name, serviceType = '12-Season Color Analysis' } = body
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 })
    }

    // Select prompt based on service type
    let prompt = "";
    let serviceTypeCode = "color_analysis";
    
    switch(serviceType) {
      case 'Virtual Wardrobe Curation':
        prompt = "Analyze this wardrobe image and provide a style assessment. Return only a JSON object with: dominant_style, color_palette, versatility_score (0-100), organization_level (0-100), gap_analysis (array of missing essentials), and recommended_additions (array of 5 items)."
        serviceTypeCode = "virtual_wardrobe";
        break;
      case 'Personal Shopping Service':
        prompt = "Analyze this person's style preferences from the image. Return only a JSON object with: style_profile, color_preferences, recommended_brands, statement_pieces (array of 3 items), versatile_basics (array of 3 items), and shopping_priority_score (0-100)."
        serviceTypeCode = "personal_shopping";
        break;
      case 'Style Evolution Coaching':
        prompt = "Analyze this person's current style from the image. Return only a JSON object with: current_style_assessment, transformation_potential (0-100), recommended_direction, key_pieces_to_acquire (array of 5 items), items_to_phase_out (array of 3 categories), and confidence_boosters (array of 3 style tips)."
        serviceTypeCode = "style_coaching";
        break;
      default: // 12-Season Color Analysis
        prompt = "Analyze this person's skin tone, hair color, and eye color to determine their seasonal color palette (Spring, Summer, Autumn, or Winter). Return only a JSON object with: season, confidence (0-100), undertone, and top 5 recommended colors as hex codes.";
        serviceTypeCode = "color_analysis";
    }
    
    interface AnalysisResult {
      season?: string;
      confidence?: number;
      undertone?: string;
      recommended_colors?: string[];
      [key: string]: any;
    }
    
    let analysis: AnalysisResult = {}
    let provider = 'expert'
    
    // Use expert analysis system
    if (process.env.OPENAI_API_KEY) {
      try {
        const openaiResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{
            role: "user",
            content: [{
              type: "text",
              text: prompt
            }, {
              type: "image_url",
              image_url: { url: imageUrl }
            }]
          }],
          max_tokens: 300
        })
        analysis = JSON.parse(openaiResponse.choices[0].message.content || '{}')
      } catch (error) {
        console.error('Analysis failed:', error)
        throw new Error('Analysis failed')
      }
    }
    const supabase = await createClient()
    
    // Generate ticket with service-specific prefix
    const ticketPrefix = serviceTypeCode === 'color_analysis' ? 'AC' : 
                        serviceTypeCode === 'virtual_wardrobe' ? 'VW' : 
                        serviceTypeCode === 'personal_shopping' ? 'PS' : 'SC';
    const ticketNumber = `${ticketPrefix}-${Date.now()}`
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: email || 'anonymous@auracolor.com',
      customer_name: name || 'Anonymous',
      service_type: serviceTypeCode,
      status: 'completed',
      image_url: imageUrl,
      questionnaire_data: { analysis: analysis }
    }).select().single()
    
    // Create analyst report based on service type
    if (ticket) {
      if (serviceTypeCode === 'color_analysis') {
        await supabase.from('analyst_reports').insert({
          ticket_id: ticket.id,
          season_analysis: `${analysis.season} with ${analysis.confidence}% confidence`,
          color_recommendations: analysis.recommended_colors,
          styling_notes: `Undertone: ${analysis.undertone}. Recommended for ${analysis.season} season.`,
          confidence_score: analysis.confidence,
          status: 'completed',
          analysis_data: analysis
        })
      } else if (serviceTypeCode === 'virtual_wardrobe') {
        await supabase.from('wardrobe_audits').insert({
          ticket_id: ticket.id,
          audit_type: 'virtual_curation',
          wardrobe_items: [],
          outfit_combinations: [],
          gap_analysis: analysis.gap_analysis || [],
          shopping_recommendations: analysis.recommended_additions || [],
          status: 'pending',
          analysis_data: analysis
        })
      } else if (serviceTypeCode === 'personal_shopping') {
        await supabase.from('shopping_sessions').insert({
          ticket_id: ticket.id,
          session_type: 'personal_shopping',
          budget_allocated: 0,
          curated_items: analysis.statement_pieces || [],
          fitting_notes: '',
          purchase_recommendations: analysis.versatile_basics || [],
          status: 'scheduled',
          analysis_data: analysis
        })
      } else if (serviceTypeCode === 'style_coaching') {
        await supabase.from('coaching_programs').insert({
          ticket_id: ticket.id,
          program_type: 'style_evolution',
          duration_months: 3,
          sessions_included: 6,
          makeover_included: true,
          confidence_coaching: true,
          progress_tracking: {
            transformation_potential: analysis.transformation_potential,
            recommended_direction: analysis.recommended_direction,
            key_pieces: analysis.key_pieces_to_acquire
          },
          status: 'enrolled',
          analysis_data: analysis
        })
      }
    }
    
    // Save to legacy table if userId provided
    if (userId) {
      await supabase.from('color_analysis_results').insert({
        user_id: userId,
        image_url: imageUrl,
        season: analysis.season,
        confidence: analysis.confidence,
        undertone: analysis.undertone,
        recommended_colors: analysis.recommended_colors,
        analysis_data: analysis
      })
    }
    
    // Send email with results if email provided
    if (email && name) {
      await Promise.all([
        sendStyleResults(email, name, analysis, serviceType),
        sendAdminAlert(`${serviceType} Results`, { email, name, service: serviceType })
      ])
    }
    
    return NextResponse.json({
      ...analysis,
      ticket_number: ticketNumber,
      ticket_id: ticket?.id
    })
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}