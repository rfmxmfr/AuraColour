// Color Analysis Service
export class ColorAnalysisService {
  static async analyzeImage(imageFile: File) {
    const formData = new FormData()
    formData.append('image', imageFile)
    
    const response = await fetch('/api/color-analysis', {
      method: 'POST',
      body: formData,
    })
    
    return response.json()
  }
  
  static getSeasonRecommendations(season: string) {
    const recommendations = {
      spring: {
        colors: ['coral', 'peach', 'warm yellow', 'light green'],
        avoid: ['black', 'cool blues', 'deep purples'],
      },
      summer: {
        colors: ['soft pink', 'lavender', 'cool blue', 'mint green'],
        avoid: ['orange', 'warm yellows', 'bright reds'],
      },
      autumn: {
        colors: ['rust', 'deep orange', 'olive green', 'warm brown'],
        avoid: ['bright pink', 'cool blues', 'icy colors'],
      },
      winter: {
        colors: ['true red', 'royal blue', 'emerald green', 'pure white'],
        avoid: ['muted colors', 'warm yellows', 'peach'],
      },
    }
    
    return recommendations[season as keyof typeof recommendations]
  }
}