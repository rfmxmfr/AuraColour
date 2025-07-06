import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = await createClient()
    
    const { data: report } = await supabase
      .from('analyst_reports')
      .select('*')
      .eq('id', params.id)
      .single()

    if (!report) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      report: {
        customerName: report.ai_analysis?.customerName || 'Customer',
        season: report.season_analysis || 'Autumn',
        confidence: report.confidence_score || 85,
        undertone: report.ai_analysis?.undertone || 'warm',
        bestColors: report.color_recommendations || ['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887'],
        avoidColors: report.ai_analysis?.avoidColors || ['#FF69B4', '#00FFFF', '#FFFF00'],
        makeupTips: report.ai_analysis?.makeupTips || 'Choose warm-toned foundations and earthy eyeshadows.',
        wardrobeTips: report.styling_notes || 'Focus on rich, warm colors like deep oranges and browns.',
        shoppingGuide: report.ai_analysis?.shoppingGuide || 'Look for pieces in your color palette.',
        personalMessage: report.ai_analysis?.personalMessage || 'These colors will enhance your best features!'
      }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load report' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const reportData = await request.json()
    const supabase = await createClient()

    const { error } = await supabase
      .from('analyst_reports')
      .update({
        season_analysis: reportData.season,
        color_recommendations: reportData.bestColors,
        styling_notes: reportData.wardrobeTips,
        confidence_score: reportData.confidence,
        ai_analysis: reportData,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 })
  }
}