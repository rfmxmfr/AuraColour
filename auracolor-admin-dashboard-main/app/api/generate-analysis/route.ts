import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json()

    const supabase = createClient()
    
    const { data: booking } = await supabase
      .from('questionnaire_submissions')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    const analysis = generateColorAnalysis(booking.answers)

    const { data: report } = await supabase
      .from('analyst_reports')
      .insert({
        ticket_id: bookingId,
        season_analysis: analysis.season,
        color_recommendations: analysis.colors,
        styling_notes: analysis.notes,
        confidence_score: analysis.confidence,
        ai_analysis: analysis,
        status: 'draft'
      })
      .select()
      .single()

    return NextResponse.json({
      success: true,
      report: {
        id: report?.id,
        season: analysis.season,
        confidence: analysis.confidence,
        colors: analysis.colors,
        notes: analysis.notes
      }
    })

  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate analysis' }, { status: 500 })
  }
}

function generateColorAnalysis(answers: any) {
  const { 'skin-tone': skin, 'hair-color': hair, 'eye-color': eyes } = answers

  let season = 'Autumn'
  let confidence = 85
  let colors = ['#8B4513', '#CD853F', '#D2691E', '#A0522D', '#DEB887']
  let undertone = 'warm'
  let avoidColors = ['#FF69B4', '#00FFFF', '#FFFF00']
  let makeupTips = 'Choose warm-toned foundations with golden undertones. Opt for earthy eyeshadows in browns, golds, and oranges. Lipstick shades in warm reds, corals, and browns will complement your coloring.'
  let wardrobeTips = 'Focus on rich, warm colors like deep oranges, golden yellows, warm browns, and olive greens. Avoid cool blues and bright pinks. Earth tones and jewel tones work beautifully on you.'
  let shoppingGuide = 'Look for pieces at Zara, Mango, and COS in your color palette. Focus on quality basics in camel, rust, forest green, and cream. Accessories in gold tones will enhance your warm coloring.'
  
  if (skin?.includes('fair') && hair?.includes('blonde')) {
    season = 'Spring'
    colors = ['#FFB6C1', '#98FB98', '#F0E68C', '#DDA0DD', '#87CEEB']
    confidence = 90
    avoidColors = ['#000000', '#8B0000', '#4B0082']
    makeupTips = 'Choose light, fresh foundations with peachy undertones. Bright, clear eyeshadows in corals, peaches, and light greens. Lipstick in coral, peach, and bright pink shades.'
    wardrobeTips = 'Embrace bright, clear colors like coral, peach, light green, and bright blue. Avoid dark, muted colors. Your palette is fresh and energetic.'
    shoppingGuide = 'Shop at H&M, ASOS, and Anthropologie for bright, cheerful pieces. Look for floral prints and light, airy fabrics in your color palette.'
  } else if (skin?.includes('cool') || eyes === 'Blue') {
    season = 'Winter'
    undertone = 'cool'
    colors = ['#000080', '#8B0000', '#4B0082', '#2F4F4F', '#191970']
    confidence = 88
    avoidColors = ['#FFB6C1', '#F0E68C', '#DDA0DD']
    makeupTips = 'Choose foundations with pink or blue undertones. Bold, dramatic eyeshadows in deep blues, purples, and blacks. Lipstick in true reds, deep berries, and bright pinks.'
    wardrobeTips = 'Embrace bold, dramatic colors like true red, royal blue, emerald green, and pure white. Black is your friend. Avoid warm, muted colors.'
    shoppingGuide = 'Shop at Zara, COS, and & Other Stories for sophisticated pieces in your dramatic color palette. Look for structured pieces in bold colors.'
  } else if (skin?.includes('fair')) {
    season = 'Summer'
    undertone = 'cool'
    colors = ['#E6E6FA', '#F0F8FF', '#B0E0E6', '#D8BFD8', '#AFEEEE']
    confidence = 82
    avoidColors = ['#FF4500', '#FFD700', '#8B4513']
    makeupTips = 'Choose foundations with pink undertones. Soft, muted eyeshadows in lavenders, soft blues, and roses. Lipstick in soft pinks, roses, and berry tones.'
    wardrobeTips = 'Embrace soft, muted colors like lavender, soft blue, dusty rose, and sage green. Avoid bright, warm colors. Your palette is gentle and sophisticated.'
    shoppingGuide = 'Shop at Cos, Arket, and Everlane for soft, muted pieces. Look for quality basics in your gentle color palette.'
  }

  return {
    season,
    confidence,
    colors,
    undertone,
    avoidColors,
    makeupTips,
    wardrobeTips,
    shoppingGuide,
    personalMessage: `Your ${season} coloring is absolutely beautiful! These carefully selected colors will enhance your natural radiance and make you feel confident and stylish.`,
    notes: `Based on ${skin} skin tone, ${hair} hair, and ${eyes} eyes, you are a ${season}. This season complements your natural coloring with ${undertone} undertones.`
  }
}