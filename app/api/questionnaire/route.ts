import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendClientConfirmation } from '@/lib/email-notifications'
import { handleFormData } from '@/lib/file-upload'

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type')
    let data: any
    
    if (contentType?.includes('multipart/form-data')) {
      data = await handleFormData(request)
    } else {
      data = await request.json()
    }
    const supabase = await createClient()
    
    const { data: questionnaire, error } = await supabase
      .from('questionnaire_submissions')
      .insert({
        user_id: data.user_id,
        session_id: data.session_id || crypto.randomUUID(),
        service_type: data.serviceType || '12-Season Color Analysis',
        answers: data.allAnswers || data.answers,
        photo_urls: data.photoUrls || [],
        results: data.results,
        data: {
          skinTone: data.skinTone,
          hairColor: data.hairColor,
          eyeColor: data.eyeColor,
          stylePreference: data.stylePreference,
          // Service-specific data
          ...(data.serviceType === 'Virtual Wardrobe Curation' && {
            wardrobeSize: data.allAnswers?.['wardrobe-size'],
            wardrobeRefresh: data.allAnswers?.['wardrobe-refresh'],
            frequentItems: data.allAnswers?.['frequent-items'],
            specificItems: data.allAnswers?.['specific-items'],
            missingColors: data.allAnswers?.['missing-colors'],
            styleInspiration: data.allAnswers?.['style-inspiration']
          }),
          ...(data.serviceType === 'Personal Shopping Service' && {
            budget: data.allAnswers?.['budget'],
            shoppingGoals: data.allAnswers?.['shopping-goals'],
            shoppingGoalsOther: data.allAnswers?.['shopping-goals-other'],
            wardrobeGaps: data.allAnswers?.['wardrobe-gaps'],
            materialPreferences: data.allAnswers?.['material-preferences'],
            silhouettePreferences: data.allAnswers?.['silhouette-preferences'],
            avoidStyles: data.allAnswers?.['avoid-styles']
          }),
          ...(data.serviceType === 'Style Evolution Coaching' && {
            occupation: data.allAnswers?.['occupation'],
            styleChallenges: data.allAnswers?.['style-challenges'],
            styleChallengesOther: data.allAnswers?.['style-challenges-other'],
            transformationGoals: data.allAnswers?.['transformation-goals'],
            transformationGoalsOther: data.allAnswers?.['transformation-goals-other'],
            feelingDressed: data.allAnswers?.['feeling-dressed'],
            contextConsiderations: data.allAnswers?.['context-considerations']
          })
        }
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