import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { answers } = await request.json()
    
    // Simple rule-based analysis for now
    const skinTone = answers['skin-tone'] || ''
    const hairColor = answers['hair-color'] || ''
    const eyeColor = answers['eye-color'] || ''
    
    let season = 'Deep Winter'
    let topColors = ['#000080', '#8B0000', '#4B0082']
    let description = 'You have striking contrast with cool undertones. Deep, rich colors enhance your natural beauty.'
    
    // Basic logic for different combinations
    if (skinTone.includes('fair') && hairColor.includes('blonde')) {
      season = 'Light Spring'
      topColors = ['#FFB6C1', '#98FB98', '#87CEEB']
      description = 'Your delicate coloring is enhanced by soft, light colors. Pastels and gentle hues bring out your natural glow.'
    } else if (skinTone.includes('warm') || hairColor.includes('red')) {
      season = 'True Autumn'
      topColors = ['#D2691E', '#8B4513', '#CD853F']
      description = 'Your warm undertones shine with rich, earthy colors. Golden and bronze tones complement your natural warmth.'
    } else if (skinTone.includes('cool') && hairColor.includes('dark')) {
      season = 'Deep Winter'
      topColors = ['#000080', '#8B0000', '#4B0082']
      description = 'You have striking contrast with cool undertones. Deep, rich colors enhance your natural beauty.'
    }
    
    const analysis = {
      season,
      confidence: Math.floor(Math.random() * 15) + 80, // 80-95%
      topColors,
      description
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to process analysis' },
      { status: 500 }
    )
  }
}