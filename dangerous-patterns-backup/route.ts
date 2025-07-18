import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { createClient } from '@/lib/supabase/server'

// Define validation schema for POST request
const reportSchema = z.object({
  ticket_id: z.string().uuid(),
  analyst_id: z.string().uuid().optional(),
  season_analysis: z.string().max(500),
  color_recommendations: z.array(z.string()).or(z.string()),
  styling_notes: z.string().max(2000),
  confidence_score: z.number().min(0).max(100),
  ai_analysis: z.record(z.unknown()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const rawData = await request.json()
    
    // Validate input data
    const validationResult = reportSchema.safeParse(rawData)
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validationResult.error.format() }, { status: 400 })
    }
    
    const data = validationResult.data
    const supabase = await createClient()

    const { data: report, error } = await supabase
      .from('analyst_reports')
      .insert({
        ticket_id: data.ticket_id,
        analyst_id: data.analyst_id,
        season_analysis: data.season_analysis,
        color_recommendations: data.color_recommendations,
        styling_notes: data.styling_notes,
        confidence_score: data.confidence_score,
        status: 'draft',
        ai_analysis: data.ai_analysis,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      report_id: report.id,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
  }
}

// Define validation schema for PUT request
const updateReportSchema = z.object({
  season_analysis: z.string().max(500),
  color_recommendations: z.array(z.string()).or(z.string()),
  styling_notes: z.string().max(2000),
  confidence_score: z.number().min(0).max(100),
  status: z.enum(['draft', 'published']),
  report_id: z.string().uuid(),
})

export async function PUT(request: NextRequest) {
  try {
    const rawData = await request.json()
    
    // Validate input data
    const validationResult = updateReportSchema.safeParse(rawData)
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validationResult.error.format() }, { status: 400 })
    }
    
    const validatedData = validationResult.data
    const supabase = await createClient()

    const { data: report, error } = await supabase
      .from('analyst_reports')
      .update({
        season_analysis: validatedData.season_analysis,
        color_recommendations: validatedData.color_recommendations,
        styling_notes: validatedData.styling_notes,
        confidence_score: validatedData.confidence_score,
        status: validatedData.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', validatedData.report_id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      report,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
  }
}

// Import sanitize-html package for sanitizing HTML content
import sanitizeHtml from 'sanitize-html';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get('ticket_id')

    // Validate ticketId if provided
    if (ticketId && !/^[0-9a-f]{ 8 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 12 }$/i.test(ticketId)) {
      return NextResponse.json({ error: 'Invalid ticket ID format' }, { status: 400 })
    }

    const supabase = await createClient()

    let query = supabase.from('analyst_reports').select('*')

    if (ticketId) {
      query = query.eq('ticket_id', ticketId)
    }

    const { data: reports, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    // Sanitize the reports data before sending it as JSON
    const sanitizedReports = reports.map(report => ({
      ...report,
      // Sanitize specific fields that might contain user-generated content
      season_analysis: sanitizeHtml(report.season_analysis || ''),
      styling_notes: sanitizeHtml(report.styling_notes || ''),
      // Ensure other fields are properly handled
      color_recommendations: Array.isArray(report.color_recommendations) 
        ? report.color_recommendations 
        : typeof report.color_recommendations === 'string'
          ? [report.color_recommendations]
          : [],
    }))

    return NextResponse.json(sanitizedReports)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}