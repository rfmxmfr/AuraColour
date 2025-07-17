import { sendClientConfirmation } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'
import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    let data: any
    
    if (contentType?.includes('multipart/form-data')) {
      data = await handleFormData(request)
    } else {
      data = await request.json()
    }
    const supabase = createClient()
    
    const { data: questionnaire, error } = await supabase
      .from('questionnaire_submissions')
      .insert({
        user_id: data.user_id,
        session_id: data.session_id || crypto.randomUUID(),
        answers: data.answers,
        photo_urls: data.photoUrls || [],
        results: data.results,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ 
      success: true, 
      message: 'Questionnaire submitted successfully',
      id: questionnaire.id, 
    })
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to submit questionnaire', 
    }, { status: 500 })
  }
}