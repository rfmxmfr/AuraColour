import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
// import { generate, gemini15Flash } from '@/lib/genkit'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json()
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'No image URL provided' }, { status: 400 })
    }

    const prompt = "Analyze this person's skin tone, hair color, and eye color to determine their seasonal color palette (Spring, Summer, Autumn, or Winter). Return only a JSON object with: season, confidence (0-100), undertone, and top 5 recommended colors as hex codes."

    // OpenAI Analysis
    let openaiResult = null
    try {
      const openaiResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{
          role: "user",
          content: [{
            type: "text",
            text: prompt,
          }, {
            type: "image_url",
            image_url: { url: imageUrl },
          }],
        }],
        max_tokens: 300,
      })
      openaiResult = JSON.parse(openaiResponse.choices[0].message.content || '{ }')
    } catch (error) {
      // console.error('OpenAI error:', error)
    }

    // Genkit/Gemini Analysis (disabled due to build issues)
    const genkitResult = null
    // try {
    //   if (process.env.GOOGLE_AI_API_KEY && generate && gemini15Flash) {
    //     const genkitResponse = await generate(gemini15Flash, `${ prompt }\n\nAnalyze the image at: ${ imageUrl }`)
    //     genkitResult = JSON.parse(genkitResponse.text || '{ }')
    //   }
    // } catch (error) {
    //   // console.error('Genkit error:', error)
    // }

    return NextResponse.json({
      openai: openaiResult,
      genkit: genkitResult,
      comparison: {
        both_available: !!(openaiResult && genkitResult),
        openai_configured: !!process.env.OPENAI_API_KEY,
        genkit_configured: !!process.env.GOOGLE_AI_API_KEY,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}