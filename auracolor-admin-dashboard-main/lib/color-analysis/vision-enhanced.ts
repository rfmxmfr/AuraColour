import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface EnhancedColorFeatures {
  skinTone: {
    base: 'light' | 'medium' | 'dark'
    hex: string
    clarity: 'clear' | 'muted'
    undertoneStrength: number
  }
  undertone: {
    primary: 'warm' | 'cool' | 'neutral'
    secondary: 'pink' | 'yellow' | 'olive' | 'red' | 'blue'
    confidence: number
  }
  hairColor: {
    base: 'blonde' | 'brown' | 'black' | 'red' | 'gray'
    hex: string
    depth: 'light' | 'medium' | 'dark'
    naturalness: number
  }
  eyeColor: {
    primary: 'blue' | 'green' | 'brown' | 'hazel' | 'gray'
    hex: string
    intensity: 'light' | 'medium' | 'dark'
    clarity: number
  }
  contrast: {
    level: 'low' | 'medium' | 'high'
    score: number
    hairSkinContrast: number
    eyeSkinContrast: number
  }
  saturation: {
    preference: 'muted' | 'clear' | 'soft'
    tolerance: number
    skinSaturation: number
  }
  colorHarmony: {
    temperature: 'warm' | 'cool' | 'neutral'
    chroma: 'high' | 'medium' | 'low'
    dominantUndertone: string
  }
  imageQuality: {
    lighting: 'natural' | 'artificial' | 'mixed'
    clarity: number
    colorAccuracy: number
  }
}

export async function extractEnhancedFeatures(imageUrl: string): Promise<EnhancedColorFeatures> {
  const prompt = `Analyze this person's coloring with precision for professional color analysis. Return ONLY valid JSON:

{
  "skinTone": {
    "base": "light|medium|dark",
    "hex": "#RRGGBB",
    "clarity": "clear|muted",
    "undertoneStrength": 0.1-1.0
  },
  "undertone": {
    "primary": "warm|cool|neutral", 
    "secondary": "pink|yellow|olive|red|blue",
    "confidence": 0.1-1.0
  },
  "hairColor": {
    "base": "blonde|brown|black|red|gray",
    "hex": "#RRGGBB",
    "depth": "light|medium|dark",
    "naturalness": 0.1-1.0
  },
  "eyeColor": {
    "primary": "blue|green|brown|hazel|gray",
    "hex": "#RRGGBB", 
    "intensity": "light|medium|dark",
    "clarity": 0.1-1.0
  },
  "contrast": {
    "level": "low|medium|high",
    "score": 0.1-1.0,
    "hairSkinContrast": 0.1-1.0,
    "eyeSkinContrast": 0.1-1.0
  },
  "saturation": {
    "preference": "muted|clear|soft",
    "tolerance": 0.1-1.0,
    "skinSaturation": 0.1-1.0
  },
  "colorHarmony": {
    "temperature": "warm|cool|neutral",
    "chroma": "high|medium|low",
    "dominantUndertone": "golden|pink|olive|red|blue"
  },
  "imageQuality": {
    "lighting": "natural|artificial|mixed",
    "clarity": 0.1-1.0,
    "colorAccuracy": 0.1-1.0
  }
}

Focus on: undertone detection, contrast levels, color temperature, and image quality assessment.`

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
    temperature: 0.1,
  })

  const content = response.choices[0].message.content || '{ }'
  
  try {
    return JSON.parse(content) as EnhancedColorFeatures
  } catch (error) {
    logger.error('Failed to parse enhanced features:', error)
    throw new Error('Invalid feature extraction response')
  }
}

export interface ConsolidatedFeatures extends EnhancedColorFeatures {
  confidence: number
  imageCount: number
  consistency: number
}

export async function analyzeMultipleImages(imageUrls: string[]): Promise<ConsolidatedFeatures> {
  if (imageUrls.length === 0) {
    throw new Error('At least one image required')
  }

  if (imageUrls.length === 1) {
    const features = await extractEnhancedFeatures(imageUrls[0])
    return {
      ...features,
      confidence: features.imageQuality.colorAccuracy * 0.8,
      imageCount: 1,
      consistency: 1.0,
    }
  }

  const analyses = await Promise.all(
    imageUrls.map(async (url, index) => {
      try {
        return await extractEnhancedFeatures(url)
      } catch (error) {
        console.warn(`Failed to analyze image ${ index }:`, error)
        return null
      }
    })
  )

  const validAnalyses = analyses.filter(Boolean) as EnhancedColorFeatures[]
  
  if (validAnalyses.length === 0) {
    throw new Error('No valid image analyses')
  }

  return consolidateFeatures(validAnalyses)
}

function consolidateFeatures(analyses: EnhancedColorFeatures[]): ConsolidatedFeatures {
  const weights = analyses.map(a => a.imageQuality.colorAccuracy * a.imageQuality.clarity)
  const totalWeight = weights.reduce((sum, w) => sum + w, 0)
  
  // Weighted average for numerical values
  const avgScore = (values: number[]) => 
    values.reduce((sum, val, i) => sum + val * weights[i], 0) / totalWeight

  // Mode for categorical values
  const getMode = (values: string[]) => {
    const counts = values.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1
      return acc
    }, { } as Record<string, number>)
    return Object.entries(counts).sort(([,a], [,b]) => b - a)[0][0]
  }

  // Calculate consistency
  const consistency = calculateConsistency(analyses)

  return {
    skinTone: {
      base: getMode(analyses.map(a => a.skinTone.base)) as any,
      hex: analyses[0].skinTone.hex, // Use first valid hex
      clarity: getMode(analyses.map(a => a.skinTone.clarity)) as any,
      undertoneStrength: avgScore(analyses.map(a => a.skinTone.undertoneStrength)),
    },
    undertone: {
      primary: getMode(analyses.map(a => a.undertone.primary)) as any,
      secondary: getMode(analyses.map(a => a.undertone.secondary)) as any,
      confidence: avgScore(analyses.map(a => a.undertone.confidence)),
    },
    hairColor: {
      base: getMode(analyses.map(a => a.hairColor.base)) as any,
      hex: analyses[0].hairColor.hex,
      depth: getMode(analyses.map(a => a.hairColor.depth)) as any,
      naturalness: avgScore(analyses.map(a => a.hairColor.naturalness)),
    },
    eyeColor: {
      primary: getMode(analyses.map(a => a.eyeColor.primary)) as any,
      hex: analyses[0].eyeColor.hex,
      intensity: getMode(analyses.map(a => a.eyeColor.intensity)) as any,
      clarity: avgScore(analyses.map(a => a.eyeColor.clarity)),
    },
    contrast: {
      level: getMode(analyses.map(a => a.contrast.level)) as any,
      score: avgScore(analyses.map(a => a.contrast.score)),
      hairSkinContrast: avgScore(analyses.map(a => a.contrast.hairSkinContrast)),
      eyeSkinContrast: avgScore(analyses.map(a => a.contrast.eyeSkinContrast)),
    },
    saturation: {
      preference: getMode(analyses.map(a => a.saturation.preference)) as any,
      tolerance: avgScore(analyses.map(a => a.saturation.tolerance)),
      skinSaturation: avgScore(analyses.map(a => a.saturation.skinSaturation)),
    },
    colorHarmony: {
      temperature: getMode(analyses.map(a => a.colorHarmony.temperature)) as any,
      chroma: getMode(analyses.map(a => a.colorHarmony.chroma)) as any,
      dominantUndertone: getMode(analyses.map(a => a.colorHarmony.dominantUndertone)),
    },
    imageQuality: {
      lighting: getMode(analyses.map(a => a.imageQuality.lighting)) as any,
      clarity: avgScore(analyses.map(a => a.imageQuality.clarity)),
      colorAccuracy: avgScore(analyses.map(a => a.imageQuality.colorAccuracy)),
    },
    confidence: Math.min(0.95, avgScore(analyses.map(a => a.imageQuality.colorAccuracy)) * consistency),
    imageCount: analyses.length,
    consistency,
  }
}

function calculateConsistency(analyses: EnhancedColorFeatures[]): number {
  if (analyses.length === 1) return 1.0

  let consistencyScore = 0
  let totalChecks = 0

  // Check consistency of key categorical features
  const checkConsistency = (values: string[]) => {
    const unique = new Set(values).size
    return 1 - (unique - 1) / (values.length - 1)
  }

  consistencyScore += checkConsistency(analyses.map(a => a.skinTone.base))
  consistencyScore += checkConsistency(analyses.map(a => a.undertone.primary))
  consistencyScore += checkConsistency(analyses.map(a => a.hairColor.base))
  consistencyScore += checkConsistency(analyses.map(a => a.eyeColor.primary))
  consistencyScore += checkConsistency(analyses.map(a => a.contrast.level))
  totalChecks = 5

  return consistencyScore / totalChecks
}