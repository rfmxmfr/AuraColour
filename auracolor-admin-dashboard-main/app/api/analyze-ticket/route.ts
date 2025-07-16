import { NextRequest, NextResponse } from 'next/server'
import { startAnalysis } from '@/lib/ai-analysis/analyzer'

export async function POST(request: NextRequest) {
  try {
    const { ticketId } = await request.json()
    
    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID required' }, { status: 400 })
    }

    const analysis = await startAnalysis(ticketId)
    
    return NextResponse.json({
      success: true,
      analysis,
      message: 'AI analysis completed'
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Analysis failed', details: error.message },
      { status: 500 }
    )
  }
}