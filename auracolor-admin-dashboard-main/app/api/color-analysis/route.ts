import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendColorAnalysisResults, sendAdminAlert } from '@/lib/email-notifications'
import { uploadImage } from '@/lib/file-upload'
import OpenAI from 'openai'
// import { generate, gemini15Flash } from '@/lib/genkit'

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
    
    const { imageUrl, userId, email, name } = body
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 })
    }

    const prompt = "Analyze this person's skin tone, hair color, and eye color to determine their seasonal color palette (Spring, Summer, Autumn, or Winter). Return only a JSON object with: season, confidence (0-100), undertone, and top 5 recommended colors as hex codes."
    
    // Try Genkit first, fallback to OpenAI
    let analysis: any = {}
    let aiProvider = 'none'
    
    // Genkit disabled for build compatibility
    // if (process.env.GOOGLE_AI_API_KEY) {
    //   try {
    //     const genkitResponse = await generate(gemini15Flash, `${prompt}\n\nAnalyze the image at: ${imageUrl}`)
    //     analysis = JSON.parse(genkitResponse.text || '{}')
    //     aiProvider = 'genkit'
    //   } catch (error) {
    //     console.error('Genkit failed, trying OpenAI:', error)
    //   }
    // }
    
    // Use enhanced AI analysis
    try {
      analysis = await analyzeColorProfile(imageUrl)
      aiProvider = 'enhanced-ai'
    } catch (error) {
      console.error('Enhanced AI failed:', error)
      // Fallback to basic OpenAI
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
          aiProvider = 'openai'
        } catch (error) {
          console.error('OpenAI also failed:', error)
          throw new Error('All AI providers failed')
        }
      }
    }
    const supabase = createClient()
    
    // Generate ticket
    const ticketNumber = `AC-${Date.now()}`
    const { data: ticket } = await supabase.from('tickets').insert({
      ticket_number: ticketNumber,
      customer_email: email || 'anonymous@auracolor.com',
      customer_name: name || 'Anonymous',
      service_type: 'color_analysis',
      status: 'completed',
      image_url: imageUrl,
      questionnaire_data: { ai_analysis: analysis }
    }).select().single()
    
    // Create analyst report
    if (ticket) {
      await supabase.from('analyst_reports').insert({
        ticket_id: ticket.id,
        season_analysis: `AI Analysis: ${analysis.season} with ${analysis.confidence}% confidence`,
        color_recommendations: analysis.recommended_colors,
        styling_notes: `Undertone: ${analysis.undertone}. Recommended for ${analysis.season} season.`,
        confidence_score: analysis.confidence,
        status: 'completed',
        ai_analysis: analysis
      })
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
        sendColorAnalysisResults(email, name, analysis),
        sendAdminAlert('Color Analysis', { email, name, season: analysis.season })
      ])
    }
    
    return NextResponse.json({
      ...analysis,
      ticket_number: ticketNumber,
      ticket_id: ticket?.id,
      ai_provider: aiProvider
    })
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}