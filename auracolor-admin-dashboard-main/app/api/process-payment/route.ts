import { analyzeEnhanced12Season } from '@/lib/color-analysis/analyzer'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { sessionId, paymentIntentId } = await request.json()
    
    const supabase = createClient()
    
    // Find the questionnaire submission by payment session
    const { data: submission } = await supabase
      .from('questionnaire_submissions')
      .select('*')
      .eq('stripe_session_id', sessionId)
      .single()

    if (!submission) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }

    // Update payment status
    await supabase
      .from('questionnaire_submissions')
      .update({ payment_status: 'confirmed' })
      .eq('id', submission.id)

    // Trigger analysis if photos exist
    if (submission.data?.photoUrls?.length > 0) {
      const photoUrls = submission.data.photoUrls
      
      // Run analysis on first photo (or multiple if available)
      const analysisResult = await analyzeEnhanced12Season(photoUrls[0])
      
      // Create analyst report
      const { data: report } = await supabase
        .from('analyst_reports')
        .insert({
          questionnaire_id: submission.id,
          season_analysis: `${ analysisResult.season } (${ analysisResult.confidence }% confidence)`,
          color_recommendations: analysisResult.colors,
          styling_notes: `Algorithm: ${ analysisResult.algorithm }`,
          confidence_score: analysisResult.confidence,
          status: 'completed',
          ai_analysis: analysisResult,
        })
        .select()
        .single()

      // Send results email
      if (submission.email && report) {
        await fetch(`${ process.env.NEXT_PUBLIC_SITE_URL }/api/reports/${ report.id }/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            email: submission.email,
            name: submission.name, 
          }),
        })
      }

      return NextResponse.json({ 
        success: true, 
        reportId: report?.id,
        redirectUrl: `/results/${ report?.id }`,
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error('Payment processing error:', error)
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }
}