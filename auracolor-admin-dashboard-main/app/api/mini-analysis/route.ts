import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendAdminAlert } from '@/lib/notifications'

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json()
    
    // Simple rule-based analysis based on questionnaire answers
    const analysis = analyzeAnswers(answers)
    
    const supabase = createClient()
    
    // Save questionnaire submission
    const { error } = await supabase
      .from('questionnaire_submissions')
      .insert({
        answers,
        results: analysis
      })

    if (error) {
      console.error('Database error:', error)
    }

    // Send admin notification if email provided
    if (answers.newsletter) {
      await sendAdminAlert('Mini Analysis', {
        email: answers.newsletter,
        season: analysis.season
      })
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Mini analysis error:', error)
    return NextResponse.json({ 
      error: 'Analysis failed',
      season: 'Spring',
      confidence: 75,
      description: 'Based on your responses, you appear to have Spring characteristics.',
      topColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    }, { status: 200 }) // Return fallback analysis
  }
}

function analyzeAnswers(answers: any) {
  let springScore = 0
  let summerScore = 0
  let autumnScore = 0
  let winterScore = 0

  // Analyze skin tone
  const skinTone = answers['skin-tone']
  if (skinTone?.includes('fair with pink')) summerScore += 2
  if (skinTone?.includes('fair with neutral')) springScore += 1, summerScore += 1
  if (skinTone?.includes('warm undertones')) springScore += 2, autumnScore += 2
  if (skinTone?.includes('cool undertones')) summerScore += 2, winterScore += 2
  if (skinTone?.includes('deep')) autumnScore += 1, winterScore += 2

  // Analyze hair color
  const hairColor = answers['hair-color']
  if (hairColor?.includes('blonde')) springScore += 2, summerScore += 1
  if (hairColor?.includes('light brown')) springScore += 1, summerScore += 1
  if (hairColor?.includes('medium brown')) autumnScore += 1, winterScore += 1
  if (hairColor?.includes('dark brown') || hairColor?.includes('black')) autumnScore += 1, winterScore += 2
  if (hairColor?.includes('red') || hairColor?.includes('auburn')) autumnScore += 3
  if (hairColor?.includes('gray') || hairColor?.includes('silver')) summerScore += 1, winterScore += 1

  // Analyze eye color
  const eyeColor = answers['eye-color']
  if (eyeColor?.includes('blue')) springScore += 1, summerScore += 2, winterScore += 1
  if (eyeColor?.includes('green')) springScore += 2, summerScore += 1
  if (eyeColor?.includes('brown')) autumnScore += 2, winterScore += 1
  if (eyeColor?.includes('hazel')) springScore += 1, autumnScore += 2
  if (eyeColor?.includes('gray')) summerScore += 2
  if (eyeColor?.includes('amber')) autumnScore += 3

  // Determine season
  const scores = { springScore, summerScore, autumnScore, winterScore }
  const maxScore = Math.max(springScore, summerScore, autumnScore, winterScore)
  
  let season = 'Spring'
  let confidence = 75
  
  if (maxScore === springScore) {
    season = 'Spring'
    confidence = Math.min(95, 60 + springScore * 5)
  } else if (maxScore === summerScore) {
    season = 'Summer'
    confidence = Math.min(95, 60 + summerScore * 5)
  } else if (maxScore === autumnScore) {
    season = 'Autumn'
    confidence = Math.min(95, 60 + autumnScore * 5)
  } else if (maxScore === winterScore) {
    season = 'Winter'
    confidence = Math.min(95, 60 + winterScore * 5)
  }

  const seasonData = {
    Spring: {
      description: 'You have warm, bright characteristics that shine in clear, vibrant colors. Your natural coloring has a fresh, youthful quality.',
      topColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    },
    Summer: {
      description: 'You have cool, soft characteristics that look best in muted, gentle colors. Your natural coloring has an elegant, refined quality.',
      topColors: ['#B8A9C9', '#87CEEB', '#F0E68C', '#DDA0DD', '#98FB98']
    },
    Autumn: {
      description: 'You have warm, rich characteristics that glow in deep, earthy colors. Your natural coloring has a sophisticated, grounded quality.',
      topColors: ['#CD853F', '#A0522D', '#8B4513', '#DAA520', '#B22222']
    },
    Winter: {
      description: 'You have cool, dramatic characteristics that shine in bold, clear colors. Your natural coloring has a striking, confident quality.',
      topColors: ['#000080', '#DC143C', '#4B0082', '#008B8B', '#2F4F4F']
    }
  }

  return {
    season,
    confidence,
    description: seasonData[season as keyof typeof seasonData].description,
    topColors: seasonData[season as keyof typeof seasonData].topColors,
    scores
  }
}