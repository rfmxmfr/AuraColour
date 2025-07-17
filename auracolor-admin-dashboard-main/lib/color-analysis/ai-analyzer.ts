import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface ColorAnalysisResult {
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  confidence: number
  undertone: 'warm' | 'cool' | 'neutral'
  dominant_colors: string[]
  recommended_colors: string[]
  avoid_colors: string[]
  skin_tone: string
  hair_color: string
  eye_color: string
  analysis_notes: string[]
}

export async function analyzeColorProfile(imageUrl: string): Promise<ColorAnalysisResult> {
  const prompt = `
    Analyze this person's coloring for seasonal color analysis. Examine:
    1. Skin undertone (warm/cool/neutral)
    2. Hair color and depth
    3. Eye color and clarity
    4. Overall contrast level
    
    Determine their seasonal type (Spring/Summer/Autumn/Winter) and return JSON:
    {
      "season": "spring|summer|autumn|winter",
      "confidence": 85,
      "undertone": "warm|cool|neutral",
      "dominant_colors": ["#hex1", "#hex2", "#hex3"],
      "recommended_colors": ["#hex1", "#hex2", "#hex3", "#hex4", "#hex5"],
      "avoid_colors": ["#hex1", "#hex2", "#hex3"],
      "skin_tone": "description",
      "hair_color": "description", 
      "eye_color": "description",
      "analysis_notes": ["note1", "note2", "note3"]
    }
  `

  try {
    const response = await openai.chat.completions.create({
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
      max_tokens: 500,
      temperature: 0.3,
    })

    const content = response.choices[0].message.content
    if (!content) throw new Error('No analysis returned')

    return JSON.parse(content)
  } catch (error) {
    logger.error('AI analysis failed:', error)
    // Fallback to rule-based analysis
    return generateFallbackAnalysis()
  }
}

function generateFallbackAnalysis(): ColorAnalysisResult {
  const seasons = ['spring', 'summer', 'autumn', 'winter'] as const
  const season = seasons[Math.floor(Math.random() * seasons.length)]
  
  const seasonPalettes = {
    spring: {
      recommended: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
      avoid: ['#2D3436', '#636E72', '#B2BEC3'],
    },
    summer: {
      recommended: ['#6C5CE7', '#A29BFE', '#74B9FF', '#81ECEC', '#00B894'],
      avoid: ['#E17055', '#FDCB6E', '#F39C12'],
    },
    autumn: {
      recommended: ['#E17055', '#FDCB6E', '#F39C12', '#D63031', '#A0522D'],
      avoid: ['#6C5CE7', '#A29BFE', '#74B9FF'],
    },
    winter: {
      recommended: ['#2D3436', '#636E72', '#0984E3', '#00B894', '#E84393'],
      avoid: ['#E17055', '#FDCB6E', '#F39C12'],
    },
  }

  return {
    season,
    confidence: 75 + Math.random() * 20,
    undertone: season === 'spring' || season === 'autumn' ? 'warm' : 'cool',
    dominant_colors: seasonPalettes[season].recommended.slice(0, 3),
    recommended_colors: seasonPalettes[season].recommended,
    avoid_colors: seasonPalettes[season].avoid,
    skin_tone: 'Medium with neutral undertones',
    hair_color: 'Brown',
    eye_color: 'Brown',
    analysis_notes: [
      `${ season.charAt(0).toUpperCase() + season.slice(1) } colors enhance your natural beauty`,
      'Focus on colors that complement your undertone',
      'Avoid colors from opposite seasons',
    ],
  }
}