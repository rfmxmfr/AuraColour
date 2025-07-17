import { NextRequest, NextResponse } from 'next/server'
import sanitizeHtml from 'sanitize-html'
import { z } from 'zod'

import { createClient } from '@/lib/supabase/server'

// Define a sanitize function that uses sanitizeHtml
function sanitize(input: string | undefined | null): string {
  if (!input) return ''
  return sanitizeHtml(input, {
    allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
    allowedAttributes: { },
  })
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    // Validate ID parameter
    if (!/^[0-9a-f]{ 8 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 12 }$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid report ID format' }, { status: 400 })
    }
    
    const supabase = await createClient()

    const { data: report } = await supabase
      .from('analyst_reports')
      .select('*')
      .eq('id', id)
      .single()

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    // Extract and sanitize data from the report
    const bestColors = Array.isArray(report.color_recommendations) 
      ? report.color_recommendations 
      : typeof report.color_recommendations === 'string'
        ? [report.color_recommendations]
        : ['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887']
        
    const avoidColors = Array.isArray(report.ai_analysis?.avoidColors)
      ? report.ai_analysis.avoidColors
      : ['#FF69B4', '#00FFFF', '#FFFF00']

    return NextResponse.json({
      success: true,
      report: {
        customerName: sanitize(report.ai_analysis?.customerName) || 'Customer',
        season: sanitize(report.season_analysis) || 'Autumn',
        confidence: typeof report.confidence_score === 'number' ? report.confidence_score : 85,
        undertone: sanitize(report.ai_analysis?.undertone) || 'warm',
        bestColors,
        avoidColors,
        makeupTips: sanitize(report.ai_analysis?.makeupTips) || 'Choose warm-toned foundations and earthy eyeshadows.',
        wardrobeTips: sanitize(report.styling_notes) || 'Focus on rich, warm colors like deep oranges and browns.',
        shoppingGuide: sanitize(report.ai_analysis?.shoppingGuide) || 'Look for pieces in your color palette.',
        personalMessage: sanitize(report.ai_analysis?.personalMessage) || 'These colors will enhance your best features!',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load report' }, { status: 500 })
  }
}

// Define validation schema for PUT request
const updateSchema = z.object({
  season: z.string().max(500),
  bestColors: z.array(z.string()).or(z.string()),
  wardrobeTips: z.string().max(2000),
  confidence: z.number().min(0).max(100).or(z.string().regex(/^\d+$/).transform(Number)),
  // Additional fields can be added as needed
})

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    
    // Validate ID parameter
    if (!/^[0-9a-f]{ 8 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 12 }$/i.test(id)) {
      return NextResponse.json({ error: 'Invalid report ID format' }, { status: 400 })
    }
    
    const rawReportData = await request.json()
    
    // Validate input data
    const validationResult = updateSchema.safeParse(rawReportData)
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validationResult.error.format() }, { status: 400 })
    }
    
    const validatedData = validationResult.data
    
    // Sanitize the validated data
    const reportData = {
      season: sanitize(validatedData.season),
      bestColors: Array.isArray(validatedData.bestColors) 
        ? validatedData.bestColors.map(color => sanitize(color))
        : sanitize(validatedData.bestColors),
      wardrobeTips: sanitize(validatedData.wardrobeTips),
      confidence: validatedData.confidence,
      // Create a safe version of the analysis data
      ai_analysis: {
        season: sanitize(validatedData.season),
        bestColors: Array.isArray(validatedData.bestColors) 
          ? validatedData.bestColors.map(color => sanitize(color))
          : sanitize(validatedData.bestColors),
        wardrobeTips: sanitize(validatedData.wardrobeTips),
      },
    }
    
    const supabase = await createClient()

    const { error } = await supabase
      .from('analyst_reports')
      .update({
        season_analysis: reportData.season,
        color_recommendations: reportData.bestColors,
        styling_notes: reportData.wardrobeTips,
        confidence_score: reportData.confidence,
        ai_analysis: reportData.ai_analysis,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)

    if (error) throw error

    return NextResponse.json({ success: true }, { headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }
}