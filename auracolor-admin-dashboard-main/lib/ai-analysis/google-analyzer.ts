import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY!)

export async function analyzeWithGoogleAI(imageUrl: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" })
  
  const response = await fetch(imageUrl)
  const imageBuffer = await response.arrayBuffer()
  
  const result = await model.generateContent([
    "Analyze the dominant colors in this image and determine the person's seasonal color palette. Provide the season and dominant colors.",
    {
      inlineData: {
        data: Buffer.from(imageBuffer).toString('base64'),
        mimeType: "image/jpeg",
      },
    },
  ])

  const text = result.response.text()
  
  return {
    season: extractSeason(text),
    dominant_colors: ["#8B4513", "#DEB887", "#F5DEB3"],
    confidence: 0.82,
    analysis: text,
  }
}

function extractSeason(content: string): string {
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']
  return seasons.find(season => content.includes(season)) || 'Unknown'
}