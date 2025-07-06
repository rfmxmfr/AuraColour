import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const supabase = await createClient()
    
    const { data: questionnaire, error } = await supabase
      .from('questionnaire_submissions')
      .insert({
        user_id: data.user_id,
        session_id: data.session_id || crypto.randomUUID(),
        answers: data.answers,
        results: data.results
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'Questionnaire submitted successfully',
      id: questionnaire.id 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit questionnaire' 
    }, { status: 500 })
  }
}