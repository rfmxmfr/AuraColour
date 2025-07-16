import { EnhancedColorFeatures, ConsolidatedFeatures } from './vision-enhanced'

interface ConfidenceFactors {
  imageQuality: number
  featureClarity: number
  seasonAmbiguity: number
  consistencyScore: number
  undertoneStrength: number
}

export class ConfidenceCalibrator {
  
  calculateTrueConfidence(
    rawScore: number, 
    features: EnhancedColorFeatures | ConsolidatedFeatures
  ): number {
    const factors = this.assessConfidenceFactors(features, rawScore)
    return this.calibrateConfidence(rawScore, factors)
  }

  private assessConfidenceFactors(
    features: EnhancedColorFeatures | ConsolidatedFeatures, 
    rawScore: number
  ): ConfidenceFactors {
    return {
      imageQuality: this.assessImageQuality(features),
      featureClarity: this.assessFeatureClarity(features),
      seasonAmbiguity: this.assessSeasonAmbiguity(rawScore),
      consistencyScore: this.getConsistencyScore(features),
      undertoneStrength: features.undertone.confidence
    }
  }

  private assessImageQuality(features: EnhancedColorFeatures | ConsolidatedFeatures): number {
    const { lighting, clarity, colorAccuracy } = features.imageQuality
    
    // Lighting quality score
    const lightingScore = lighting === 'natural' ? 1.0 : 
                         lighting === 'mixed' ? 0.7 : 0.5

    // Combined quality score
    return (lightingScore * 0.3 + clarity * 0.4 + colorAccuracy * 0.3)
  }

  private assessFeatureClarity(features: EnhancedColorFeatures | ConsolidatedFeatures): number {
    const clarityScores = [
      features.skinTone.undertoneStrength,
      features.undertone.confidence,
      features.hairColor.naturalness,
      features.eyeColor.clarity,
      features.contrast.score,
      features.saturation.tolerance
    ]

    return clarityScores.reduce((sum, score) => sum + score, 0) / clarityScores.length
  }

  private assessSeasonAmbiguity(rawScore: number): number {
    // Higher scores indicate less ambiguity
    if (rawScore >= 85) return 1.0      // Very confident
    if (rawScore >= 70) return 0.8      // Confident
    if (rawScore >= 55) return 0.6      // Moderate
    if (rawScore >= 40) return 0.4      // Low confidence
    return 0.2                          // Very ambiguous
  }

  private getConsistencyScore(features: EnhancedColorFeatures | ConsolidatedFeatures): number {
    // For consolidated features, use the consistency score
    if ('consistency' in features) {
      return features.consistency
    }
    
    // For single image, assess internal consistency
    return this.assessInternalConsistency(features)
  }

  private assessInternalConsistency(features: EnhancedColorFeatures): number {
    // Check if features align with common seasonal patterns
    const { undertone, colorHarmony, contrast, saturation } = features
    
    let consistencyScore = 0.5 // Base score
    
    // Undertone-temperature consistency
    if (
      (undertone.primary === 'warm' && colorHarmony.temperature === 'warm') ||
      (undertone.primary === 'cool' && colorHarmony.temperature === 'cool')
    ) {
      consistencyScore += 0.2
    }
    
    // Contrast-saturation consistency
    if (
      (contrast.level === 'high' && saturation.preference === 'clear') ||
      (contrast.level === 'low' && saturation.preference === 'soft')
    ) {
      consistencyScore += 0.2
    }
    
    // Chroma-saturation consistency
    if (
      (colorHarmony.chroma === 'high' && saturation.preference === 'clear') ||
      (colorHarmony.chroma === 'low' && saturation.preference === 'muted')
    ) {
      consistencyScore += 0.1
    }
    
    return Math.min(1.0, consistencyScore)
  }

  private calibrateConfidence(rawScore: number, factors: ConfidenceFactors): number {
    const {
      imageQuality,
      featureClarity,
      seasonAmbiguity,
      consistencyScore,
      undertoneStrength
    } = factors

    // Weighted combination of factors
    const qualityWeight = 0.25
    const clarityWeight = 0.20
    const ambiguityWeight = 0.20
    const consistencyWeight = 0.20
    const undertoneWeight = 0.15

    const combinedFactor = 
      imageQuality * qualityWeight +
      featureClarity * clarityWeight +
      seasonAmbiguity * ambiguityWeight +
      consistencyScore * consistencyWeight +
      undertoneStrength * undertoneWeight

    // Apply calibration curve
    const calibratedScore = this.applyCalibratedCurve(rawScore, combinedFactor)
    
    // Ensure reasonable bounds
    return Math.max(15, Math.min(95, calibratedScore))
  }

  private applyCalibratedCurve(rawScore: number, qualityFactor: number): number {
    // Sigmoid-like calibration curve
    const adjustedScore = rawScore * qualityFactor
    
    // Apply confidence penalties for edge cases
    if (rawScore < 30) {
      return adjustedScore * 0.6 // Heavy penalty for very low scores
    }
    
    if (rawScore > 90) {
      return Math.min(95, adjustedScore * 1.1) // Slight boost for high scores
    }
    
    // Standard calibration for middle range
    return adjustedScore
  }

  // Public method for getting confidence explanation
  getConfidenceExplanation(
    features: EnhancedColorFeatures | ConsolidatedFeatures,
    calibratedConfidence: number
  ): string {
    const factors = this.assessConfidenceFactors(features, calibratedConfidence)
    
    const explanations: string[] = []
    
    if (factors.imageQuality > 0.8) {
      explanations.push("excellent image quality")
    } else if (factors.imageQuality < 0.5) {
      explanations.push("image quality could be improved")
    }
    
    if (factors.featureClarity > 0.8) {
      explanations.push("clear facial features")
    } else if (factors.featureClarity < 0.5) {
      explanations.push("some features are unclear")
    }
    
    if (factors.consistencyScore > 0.8) {
      explanations.push("consistent color characteristics")
    }
    
    if (factors.undertoneStrength > 0.8) {
      explanations.push("strong undertone detection")
    }
    
    if (explanations.length === 0) {
      return "Analysis completed with standard confidence"
    }
    
    return `High confidence due to: ${explanations.join(", ")}`
  }
}