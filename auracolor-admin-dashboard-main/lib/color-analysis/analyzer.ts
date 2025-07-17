import OpenAI from 'openai'

import { ConfidenceCalibrator } from './confidence-calibrator'
import { MLColorScorer } from './ml-scorer'
import { ColorFeatures, findBestSeason, SeasonRule, SEASON_RULES } from './rules'
import { extractEnhancedFeatures, analyzeMultipleImages, EnhancedColorFeatures, ConsolidatedFeatures } from './vision-enhanced'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key',
})

// Legacy function for backward compatibility
export async function extractFeaturesFromImage(imageUrl: string): Promise<ColorFeatures> {
  const enhanced = await extractEnhancedFeatures(imageUrl)
  
  // Convert enhanced features to legacy format
  return {
    skinTone: enhanced.skinTone.base,
    undertone: enhanced.undertone.primary,
    hairColor: enhanced.hairColor.base,
    eyeColor: enhanced.eyeColor.primary,
    contrast: enhanced.contrast.level,
    saturation: enhanced.saturation.preference,
  }
}

// ML-Enhanced single image analysis
export async function analyzeEnhanced12Season(imageUrl: string) {
  const features = await extractEnhancedFeatures(imageUrl)
  const mlScorer = new MLColorScorer()
  const calibrator = new ConfidenceCalibrator()
  
  // Find best season using ML scoring
  let bestMatch = { season: 'Cool Winter', score: 0, colors: [] as string[], rule: SEASON_RULES[0] }
  
  for (const rule of SEASON_RULES) {
    const mlScore = mlScorer.calculateAdvancedScore(features, rule)
    if (mlScore > bestMatch.score) {
      bestMatch = { season: rule.season, score: mlScore, colors: rule.colors, rule }
    }
  }
  
  // Calibrate confidence
  const calibratedConfidence = calibrator.calculateTrueConfidence(bestMatch.score, features)
  const confidenceExplanation = calibrator.getConfidenceExplanation(features, calibratedConfidence)
  
  return {
    season: bestMatch.season,
    confidence: Math.round(calibratedConfidence),
    rawScore: Math.round(bestMatch.score),
    features: convertToLegacy(features),
    enhancedFeatures: features,
    colors: bestMatch.colors,
    category: bestMatch.season.split(' ')[1]?.toLowerCase() || 'winter',
    imageQuality: features.imageQuality,
    undertoneConfidence: features.undertone.confidence,
    confidenceExplanation,
    algorithm: 'ml-enhanced',
  }
}

// ML-Enhanced multi-image analysis
export async function analyzeMultiple12Season(imageUrls: string[]) {
  const consolidatedFeatures = await analyzeMultipleImages(imageUrls)
  const mlScorer = new MLColorScorer()
  const calibrator = new ConfidenceCalibrator()
  
  // Find best season using ML scoring
  let bestMatch = { season: 'Cool Winter', score: 0, colors: [] as string[], rule: SEASON_RULES[0] }
  
  for (const rule of SEASON_RULES) {
    const mlScore = mlScorer.calculateAdvancedScore(consolidatedFeatures, rule)
    if (mlScore > bestMatch.score) {
      bestMatch = { season: rule.season, score: mlScore, colors: rule.colors, rule }
    }
  }
  
  // Calibrate confidence with multi-image bonus
  const calibratedConfidence = calibrator.calculateTrueConfidence(bestMatch.score, consolidatedFeatures)
  const multiImageBonus = Math.min(10, consolidatedFeatures.imageCount * 2)
  const finalConfidence = Math.min(95, calibratedConfidence + multiImageBonus)
  
  const confidenceExplanation = calibrator.getConfidenceExplanation(consolidatedFeatures, finalConfidence)
  
  return {
    season: bestMatch.season,
    confidence: Math.round(finalConfidence),
    rawScore: Math.round(bestMatch.score),
    features: convertToLegacy(consolidatedFeatures),
    enhancedFeatures: consolidatedFeatures,
    colors: bestMatch.colors,
    category: bestMatch.season.split(' ')[1]?.toLowerCase() || 'winter',
    imageCount: consolidatedFeatures.imageCount,
    consistency: consolidatedFeatures.consistency,
    imageQuality: consolidatedFeatures.imageQuality,
    confidenceExplanation,
    algorithm: 'ml-enhanced-multi',
  }
}

// Legacy function for backward compatibility
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

function convertToLegacy(enhanced: EnhancedColorFeatures | ConsolidatedFeatures): ColorFeatures {
  return {
    skinTone: enhanced.skinTone.base,
    undertone: enhanced.undertone.primary,
    hairColor: enhanced.hairColor.base,
    eyeColor: enhanced.eyeColor.primary,
    contrast: enhanced.contrast.level,
    saturation: enhanced.saturation.preference,
  }
}