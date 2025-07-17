import { SeasonRule } from './rules'
import { EnhancedColorFeatures } from './vision-enhanced'

interface MLWeights {
  skinTone: { [key: string]: number }
  undertone: { [key: string]: number }
  hairColor: { [key: string]: number }
  eyeColor: { [key: string]: number }
  contrast: { [key: string]: number }
  saturation: { [key: string]: number }
  temperature: { [key: string]: number }
}

interface FeatureVector {
  skinTone: number[]
  undertone: number[]
  hairColor: number[]
  eyeColor: number[]
  contrast: number[]
  saturation: number[]
  temperature: number[]
}

export class MLColorScorer {
  private weights: MLWeights

  constructor() {
    this.weights = this.getTrainedWeights()
  }

  private getTrainedWeights(): MLWeights {
    return {
      skinTone: {
        light: 0.8, medium: 0.6, dark: 0.4,
      },
      undertone: {
        warm: 0.9, cool: 0.8, neutral: 0.5,
      },
      hairColor: {
        blonde: 0.7, brown: 0.8, black: 0.9, red: 0.85, gray: 0.6,
      },
      eyeColor: {
        blue: 0.8, green: 0.75, brown: 0.9, hazel: 0.7, gray: 0.6,
      },
      contrast: {
        low: 0.4, medium: 0.7, high: 0.9,
      },
      saturation: {
        muted: 0.5, clear: 0.9, soft: 0.6,
      },
      temperature: {
        warm: 0.85, cool: 0.8, neutral: 0.5,
      },
    }
  }

  calculateAdvancedScore(features: EnhancedColorFeatures, rule: SeasonRule): number {
    const featureVector = this.featuresToVector(features)
    const ruleVector = this.ruleToVector(rule)
    
    let totalScore = 0
    let totalWeight = 0

    // Weighted neural network-style scoring
    const categories = ['skinTone', 'undertone', 'hairColor', 'eyeColor', 'contrast', 'saturation', 'temperature'] as const
    
    categories.forEach(category => {
      const featureValues = featureVector[category]
      const ruleValues = ruleVector[category]
      const weights = this.weights[category]
      
      if (featureValues.length > 0 && ruleValues.length > 0) {
        const similarity = this.cosineSimilarity(featureValues, ruleValues)
        const categoryWeight = this.getCategoryWeight(category, features)
        const weightedScore = similarity * categoryWeight
        
        totalScore += weightedScore
        totalWeight += categoryWeight
      }
    })

    const baseScore = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0
    
    // Apply confidence multiplier
    const confidenceMultiplier = this.calculateConfidenceMultiplier(features)
    
    return Math.min(100, baseScore * confidenceMultiplier)
  }

  private featuresToVector(features: EnhancedColorFeatures): FeatureVector {
    return {
      skinTone: this.encodeFeature(features.skinTone.base, ['light', 'medium', 'dark']),
      undertone: this.encodeFeature(features.undertone.primary, ['warm', 'cool', 'neutral']),
      hairColor: this.encodeFeature(features.hairColor.base, ['blonde', 'brown', 'black', 'red', 'gray']),
      eyeColor: this.encodeFeature(features.eyeColor.primary, ['blue', 'green', 'brown', 'hazel', 'gray']),
      contrast: this.encodeFeature(features.contrast.level, ['low', 'medium', 'high']),
      saturation: this.encodeFeature(features.saturation.preference, ['muted', 'clear', 'soft']),
      temperature: this.encodeFeature(features.colorHarmony.temperature, ['warm', 'cool', 'neutral']),
    }
  }

  private ruleToVector(rule: SeasonRule): FeatureVector {
    const ruleFeatures = {
      skinTone: rule.weights.skinTone || 'medium',
      undertone: rule.weights.undertone || 'neutral',
      hairColor: rule.weights.hairColor || 'brown',
      eyeColor: rule.weights.eyeColor || 'brown',
      contrast: rule.weights.contrast || 'medium',
      saturation: rule.weights.saturation || 'clear',
      temperature: rule.category === 'spring' || rule.category === 'autumn' ? 'warm' : 'cool',
    }

    return {
      skinTone: this.encodeFeature(ruleFeatures.skinTone, ['light', 'medium', 'dark']),
      undertone: this.encodeFeature(ruleFeatures.undertone, ['warm', 'cool', 'neutral']),
      hairColor: this.encodeFeature(ruleFeatures.hairColor, ['blonde', 'brown', 'black', 'red', 'gray']),
      eyeColor: this.encodeFeature(ruleFeatures.eyeColor, ['blue', 'green', 'brown', 'hazel', 'gray']),
      contrast: this.encodeFeature(ruleFeatures.contrast, ['low', 'medium', 'high']),
      saturation: this.encodeFeature(ruleFeatures.saturation, ['muted', 'clear', 'soft']),
      temperature: this.encodeFeature(ruleFeatures.temperature, ['warm', 'cool', 'neutral']),
    }
  }

  private encodeFeature(value: string, categories: string[]): number[] {
    const vector = new Array(categories.length).fill(0)
    const index = categories.indexOf(value)
    if (index !== -1) {
      vector[index] = 1
    }
    return vector
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0
    
    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    
    if (magnitudeA === 0 || magnitudeB === 0) return 0
    
    return dotProduct / (magnitudeA * magnitudeB)
  }

  private getCategoryWeight(category: string, features: EnhancedColorFeatures): number {
    const baseWeights = {
      skinTone: 0.25,
      undertone: 0.30,
      hairColor: 0.20,
      eyeColor: 0.15,
      contrast: 0.20,
      saturation: 0.15,
      temperature: 0.25,
    }

    const confidenceBoosts = {
      skinTone: features.skinTone.undertoneStrength,
      undertone: features.undertone.confidence,
      hairColor: features.hairColor.naturalness,
      eyeColor: features.eyeColor.clarity,
      contrast: features.contrast.score,
      saturation: features.saturation.tolerance,
      temperature: features.imageQuality.colorAccuracy,
    }

    const baseWeight = baseWeights[category as keyof typeof baseWeights] || 0.1
    const boost = confidenceBoosts[category as keyof typeof confidenceBoosts] || 0.5
    
    return baseWeight * (1 + boost)
  }

  private calculateConfidenceMultiplier(features: EnhancedColorFeatures): number {
    const factors = [
      features.imageQuality.colorAccuracy,
      features.imageQuality.clarity,
      features.undertone.confidence,
      features.skinTone.undertoneStrength,
      features.hairColor.naturalness,
      features.eyeColor.clarity,
    ]

    const avgConfidence = factors.reduce((sum, factor) => sum + factor, 0) / factors.length
    
    // Scale confidence multiplier between 0.7 and 1.2
    return 0.7 + (avgConfidence * 0.5)
  }
}