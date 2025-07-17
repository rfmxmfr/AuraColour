import { createClient } from '@/lib/supabase/server'

import { analyzeWithGoogleAI } from './google-analyzer'
import { analyzeWithOpenAI } from './openai-analyzer'

export async function startAnalysis(ticketId: string) {
  const supabase = createClient()
  
  const { data: ticket } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketId)
    .single()

  if (!ticket) throw new Error('Ticket not found')

  const [openaiResult, googleResult] = await Promise.all([
    analyzeWithOpenAI(ticket.image_url, ticket.questionnaire_data),
    analyzeWithGoogleAI(ticket.image_url),
  ])

  const combinedAnalysis = {
    openai_season: openaiResult.season,
    google_colors: googleResult.dominant_colors,
    confidence_scores: {
      openai: openaiResult.confidence,
      google: googleResult.confidence,
    },
    final_recommendation: openaiResult.season,
  }

  await supabase
    .from('tickets')
    .update({ 
      ai_analysis: combinedAnalysis,
      status: 'analyzed',
    })
    .eq('id', ticketId)

  return combinedAnalysis
}