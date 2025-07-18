import OpenAI from 'openai'

import { ColorFeatures, findBestSeason } from './rules'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function extractFeaturesFromImage(imageUrl: string): Promise<ColorFeatures> {
  const prompt = `Analyze this person's features and return ONLY a JSON object with these exact keys:
{
  "skinTone": "light|medium|dark",
  "undertone": "warm|cool|neutral", 
  "hairColor": "blonde|brown|black|red|gray",
  "eyeColor": "blue|green|brown|hazel|gray",
  "contrast": "low|medium|high",
  "saturation": "muted|clear|soft"
}`

  const response = await openai.chat.completions.create({
    model: "gpt-4",
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
    max_tokens: 150,
  })

  const content = response.choices[0].message.content || '{ }'
  return JSON.parse(content) as ColorFeatures
}

export async function analyze12Season(imageUrl: string) {
  const features = await extractFeaturesFromImage(imageUrl)
  const result = findBestSeason(features)

  return {
    season: result.season,
    confidence: Math.round(result.score),
    features,
    colors: result.colors,
    category: result.season.split(' ')[1]?.toLowerCase() || 'winter',
  }
}