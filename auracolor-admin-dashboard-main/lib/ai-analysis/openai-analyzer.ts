import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function analyzeWithOpenAI(imageUrl: string, questionnaire: any) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    messages: [{
      role: "user",
      content: [
        {
          type: "text",
          text: `Analyze this person's seasonal color palette. Based on skin tone: ${questionnaire?.skin_tone}, eye color: ${questionnaire?.eye_color}, hair color: ${questionnaire?.hair_color}. Determine their season (Spring/Summer/Autumn/Winter) and provide confidence score.`
        },
        {
          type: "image_url",
          image_url: { url: imageUrl }
        }
      ]
    }],
    max_tokens: 300
  })

  const content = response.choices[0].message.content || ''
  
  return {
    season: extractSeason(content),
    confidence: 0.85,
    reasoning: content,
    colors: extractColors(content)
  }
}

function extractSeason(content: string): string {
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']
  return seasons.find(season => content.includes(season)) || 'Unknown'
}

function extractColors(content: string): string[] {
  return ['#8B4513', '#DEB887', '#F5DEB3'] // Default colors
}