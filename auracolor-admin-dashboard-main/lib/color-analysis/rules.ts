// 12-Season Color Analysis Rules Configuration
export interface ColorFeatures {
  skinTone: 'light' | 'medium' | 'dark'
  undertone: 'warm' | 'cool' | 'neutral'
  hairColor: 'blonde' | 'brown' | 'black' | 'red' | 'gray'
  eyeColor: 'blue' | 'green' | 'brown' | 'hazel' | 'gray'
  contrast: 'low' | 'medium' | 'high'
  saturation: 'muted' | 'clear' | 'soft'
}

export interface SeasonRule {
  season: string
  category: 'spring' | 'summer' | 'autumn' | 'winter'
  subtype: 'light' | 'warm' | 'clear' | 'cool' | 'soft' | 'deep'
  weights: Partial<ColorFeatures>
  conditions: Array<{
    feature: keyof ColorFeatures
    values: string[]
    weight: number
  }>
  colors: string[]
  description: string
}

export const SEASON_RULES: SeasonRule[] = [
  // SPRING SEASONS
  {
    season: 'Light Spring',
    category: 'spring',
    subtype: 'light',
    weights: { skinTone: 'light', undertone: 'warm', contrast: 'low' },
    conditions: [
      { feature: 'skinTone', values: ['light'], weight: 0.3 },
      { feature: 'undertone', values: ['warm'], weight: 0.25 },
      { feature: 'hairColor', values: ['blonde'], weight: 0.2 },
      { feature: 'contrast', values: ['low'], weight: 0.25 },
    ],
    colors: ['#FFE4B5', '#F0E68C', '#98FB98', '#87CEEB', '#DDA0DD'],
    description: 'Light, warm, and delicate',
  },
  {
    season: 'Warm Spring',
    category: 'spring',
    subtype: 'warm',
    weights: { undertone: 'warm', saturation: 'clear' },
    conditions: [
      { feature: 'undertone', values: ['warm'], weight: 0.4 },
      { feature: 'hairColor', values: ['red', 'brown'], weight: 0.3 },
      { feature: 'saturation', values: ['clear'], weight: 0.3 },
    ],
    colors: ['#FF6347', '#FFD700', '#32CD32', '#FF8C00', '#DC143C'],
    description: 'Warm, vibrant, and energetic',
  },
  {
    season: 'Clear Spring',
    category: 'spring',
    subtype: 'clear',
    weights: { contrast: 'high', saturation: 'clear' },
    conditions: [
      { feature: 'contrast', values: ['high'], weight: 0.35 },
      { feature: 'saturation', values: ['clear'], weight: 0.35 },
      { feature: 'eyeColor', values: ['blue', 'green'], weight: 0.3 },
    ],
    colors: ['#FF1493', '#00FF00', '#1E90FF', '#FFD700', '#FF4500'],
    description: 'Clear, bright, and high contrast',
  },

  // SUMMER SEASONS
  {
    season: 'Light Summer',
    category: 'summer',
    subtype: 'light',
    weights: { skinTone: 'light', undertone: 'cool', contrast: 'low' },
    conditions: [
      { feature: 'skinTone', values: ['light'], weight: 0.3 },
      { feature: 'undertone', values: ['cool'], weight: 0.3 },
      { feature: 'contrast', values: ['low'], weight: 0.4 },
    ],
    colors: ['#E6E6FA', '#B0E0E6', '#F0F8FF', '#FFEFD5', '#FFB6C1'],
    description: 'Light, cool, and gentle',
  },
  {
    season: 'Cool Summer',
    category: 'summer',
    subtype: 'cool',
    weights: { undertone: 'cool', saturation: 'muted' },
    conditions: [
      { feature: 'undertone', values: ['cool'], weight: 0.4 },
      { feature: 'saturation', values: ['muted'], weight: 0.3 },
      { feature: 'hairColor', values: ['brown', 'blonde'], weight: 0.3 },
    ],
    colors: ['#4682B4', '#9370DB', '#708090', '#B0C4DE', '#DDA0DD'],
    description: 'Cool, muted, and sophisticated',
  },
  {
    season: 'Soft Summer',
    category: 'summer',
    subtype: 'soft',
    weights: { saturation: 'soft', contrast: 'low' },
    conditions: [
      { feature: 'saturation', values: ['soft'], weight: 0.4 },
      { feature: 'contrast', values: ['low'], weight: 0.3 },
      { feature: 'undertone', values: ['cool', 'neutral'], weight: 0.3 },
    ],
    colors: ['#D3D3D3', '#C0C0C0', '#B0C4DE', '#DCDCDC', '#F5F5DC'],
    description: 'Soft, muted, and harmonious',
  },

  // AUTUMN SEASONS
  {
    season: 'Warm Autumn',
    category: 'autumn',
    subtype: 'warm',
    weights: { undertone: 'warm', saturation: 'muted' },
    conditions: [
      { feature: 'undertone', values: ['warm'], weight: 0.4 },
      { feature: 'hairColor', values: ['red', 'brown'], weight: 0.3 },
      { feature: 'saturation', values: ['muted'], weight: 0.3 },
    ],
    colors: ['#CD853F', '#D2691E', '#B22222', '#DAA520', '#8B4513'],
    description: 'Warm, rich, and earthy',
  },
  {
    season: 'Soft Autumn',
    category: 'autumn',
    subtype: 'soft',
    weights: { saturation: 'soft', undertone: 'warm' },
    conditions: [
      { feature: 'saturation', values: ['soft'], weight: 0.35 },
      { feature: 'undertone', values: ['warm', 'neutral'], weight: 0.35 },
      { feature: 'contrast', values: ['low'], weight: 0.3 },
    ],
    colors: ['#BC8F8F', '#F4A460', '#DEB887', '#D2B48C', '#CD853F'],
    description: 'Soft, warm, and muted',
  },
  {
    season: 'Deep Autumn',
    category: 'autumn',
    subtype: 'deep',
    weights: { contrast: 'high', undertone: 'warm' },
    conditions: [
      { feature: 'contrast', values: ['high'], weight: 0.4 },
      { feature: 'hairColor', values: ['black', 'brown'], weight: 0.3 },
      { feature: 'undertone', values: ['warm'], weight: 0.3 },
    ],
    colors: ['#8B0000', '#2F4F4F', '#556B2F', '#800080', '#B8860B'],
    description: 'Deep, rich, and dramatic',
  },

  // WINTER SEASONS
  {
    season: 'Cool Winter',
    category: 'winter',
    subtype: 'cool',
    weights: { undertone: 'cool', contrast: 'high' },
    conditions: [
      { feature: 'undertone', values: ['cool'], weight: 0.4 },
      { feature: 'contrast', values: ['high'], weight: 0.3 },
      { feature: 'saturation', values: ['clear'], weight: 0.3 },
    ],
    colors: ['#000080', '#4169E1', '#DC143C', '#FF1493', '#00CED1'],
    description: 'Cool, clear, and striking',
  },
  {
    season: 'Clear Winter',
    category: 'winter',
    subtype: 'clear',
    weights: { contrast: 'high', saturation: 'clear' },
    conditions: [
      { feature: 'contrast', values: ['high'], weight: 0.4 },
      { feature: 'saturation', values: ['clear'], weight: 0.35 },
      { feature: 'eyeColor', values: ['blue', 'green'], weight: 0.25 },
    ],
    colors: ['#FF0000', '#0000FF', '#FFFF00', '#FF69B4', '#00FF00'],
    description: 'Clear, bright, and bold',
  },
  {
    season: 'Deep Winter',
    category: 'winter',
    subtype: 'deep',
    weights: { contrast: 'high', skinTone: 'dark' },
    conditions: [
      { feature: 'contrast', values: ['high'], weight: 0.35 },
      { feature: 'skinTone', values: ['dark', 'medium'], weight: 0.35 },
      { feature: 'hairColor', values: ['black'], weight: 0.3 },
    ],
    colors: ['#000000', '#8B0000', '#4B0082', '#2F4F4F', '#800080'],
    description: 'Deep, dramatic, and intense',
  },
]

export function calculateSeasonScore(features: ColorFeatures, rule: SeasonRule): number {
  let score = 0
  let totalWeight = 0

  for (const condition of rule.conditions) {
    if (features[condition.feature] && condition.values.includes(features[condition.feature])) {
      score += condition.weight
    }
    totalWeight += condition.weight
  }

  return totalWeight > 0 ? (score / totalWeight) * 100 : 0
}

export function findBestSeason(features: ColorFeatures): { season: string; score: number; colors: string[] } {
  let bestMatch = { season: 'Cool Winter', score: 0, colors: [] as string[] }

  for (const rule of SEASON_RULES) {
    const score = calculateSeasonScore(features, rule)
    if (score > bestMatch.score) {
      bestMatch = { season: rule.season, score, colors: rule.colors }
    }
  }

  return bestMatch
}