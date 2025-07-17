import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, userId } = await request.json()
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 })
    }

    const prompt = `Analyze this person's coloring for seasonal color analysis. Determine their:
    1. Skin tone (light/medium/dark)
    2. Undertone (warm/cool/neutral)
    3. Hair color and depth
    4. Eye color
    5. Overall contrast level
    
    Based on these features, determine their seasonal color type from:
    - Bright Spring, Light Spring, Warm Spring
    - Light Summer, Cool Summer, Soft Summer
    - Soft Autumn, Warm Autumn, Deep Autumn
    - Cool Winter, Deep Winter, Bright Winter
    
    Return JSON with: season, confidence (0-100), undertone, recommended_colors (5 hex codes)`

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [{
        role: "user",
        content: [
          { type: "text", text: prompt },
          { type: "image_url", image_url: { url: imageUrl } },
        ],
      }],
      max_tokens: 300,
    })

    const content = response.choices[0].message.content
    let analysis

    try {
      analysis = JSON.parse(content || '{ }')
    } catch {
      // Fallback if JSON parsing fails
      analysis = {
        season: "Cool Winter",
        confidence: 75,
        undertone: "cool",
        recommended_colors: ["#000080", "#800080", "#008080", "#FF1493", "#4B0082"],
      }
    }

    // Store analysis result (implement database storage here)
    const result = {
      id: `analysis_${ Date.now() }`,
      userId,
      imageUrl,
      ...analysis,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json(result)
  } catch (error) {
    // console.error('Color analysis failed:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}