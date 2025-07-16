import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { ticketIds, updates } = await request.json()
    
    if (!ticketIds || !Array.isArray(ticketIds) || ticketIds.length === 0) {
      return NextResponse.json({ error: 'Ticket IDs required' }, { status: 400 })
    }

    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('tickets')
      .update(updates)
      .in('id', ticketIds)
      .select()

    if (error) throw error

    return NextResponse.json({
      success: true,
      updated: data?.length || 0,
      message: `${data?.length || 0} tickets updated successfully`
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Bulk update failed', details: error.message },
      { status: 500 }
    )
  }
}