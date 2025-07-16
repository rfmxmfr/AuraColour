import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = createClient()
    
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
        ai_analysis: data.ai_analysis
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      report_id: report.id
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create report' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = createClient()
    
    const { data: report, error } = await supabase
      .from('analyst_reports')
      .update({
        season_analysis: data.season_analysis,
        color_recommendations: data.color_recommendations,
        styling_notes: data.styling_notes,
        confidence_score: data.confidence_score,
        status: data.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', data.report_id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      report
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update report' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ticketId = searchParams.get('ticket_id')
    
    const supabase = createClient()
    
    let query = supabase.from('analyst_reports').select('*')
    
    if (ticketId) {
      query = query.eq('ticket_id', ticketId)
    }
    
    const { data: reports, error } = await query.order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(reports)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 })
  }
}