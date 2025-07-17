import * as tf from '@tensorflow/tfjs'

interface ColorAnalysisResult {
  season: string
  confidence: number
  colors: string[]
  undertone: string
}

class ColorAnalyzer {
  private model: tf.LayersModel | null = null
  
  private readonly seasonColors = {
    'Deep Winter': ['#000080', '#8B0000', '#4B0082', '#006400'],
    'Bright Spring': ['#FF6347', '#32CD32', '#FF1493', '#00CED1'],
    'Soft Summer': ['#B0C4DE', '#DDA0DD', '#F0E68C', '#98FB98'],
    'True Autumn': ['#8B4513', '#CD853F', '#DAA520', '#B22222'],
  }

  async loadModel(): Promise<void> {
    try {
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({ inputShape: [9], units: 16, activation: 'relu' }),
          tf.layers.dense({ units: 8, activation: 'relu' }),
          tf.layers.dense({ units: 4, activation: 'softmax' }),
        ],
      })
      
      this.model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy'],
      })
    } catch (error) {
      logger.error('Model loading failed:', error)
    }
  }

  extractColorFeatures(imageData: ImageData): number[] {
    const { data, width, height } = imageData
    const features: number[] = []
    
    const samplePoints = [
      { x: width * 0.5, y: height * 0.4 },
      { x: width * 0.3, y: height * 0.6 },
      { x: width * 0.7, y: height * 0.6 },
    ]
    
    samplePoints.forEach(point => {
      const idx = (Math.floor(point.y) * width + Math.floor(point.x)) * 4
      const r = data[idx] / 255
      const g = data[idx + 1] / 255
      const b = data[idx + 2] / 255
      features.push(r, g, b)
    })
    
    return features
  }

  async analyzeImage(imageData: ImageData): Promise<ColorAnalysisResult> {
    if (!this.model) {
      await this.loadModel()
    }

    const features = this.extractColorFeatures(imageData)
    const inputTensor = tf.tensor2d([features])
    
    try {
      const prediction = this.model!.predict(inputTensor) as tf.Tensor
      const probabilities = await prediction.data()
      
      const seasons = Object.keys(this.seasonColors)
      const maxIndex = probabilities.indexOf(Math.max(...probabilities))
      const confidence = probabilities[maxIndex]
      
      const season = seasons[maxIndex]
      const undertone = this.detectUndertone(features)
      
      return {
        season,
        confidence,
        colors: this.seasonColors[season as keyof typeof this.seasonColors],
        undertone,
      }
    } finally {
      inputTensor.dispose()
    }
  }

  private detectUndertone(features: number[]): string {
    const avgR = (features[0] + features[3] + features[6]) / 3
    const avgG = (features[1] + features[4] + features[7]) / 3
    const avgB = (features[2] + features[5] + features[8]) / 3
    
    if (avgR > avgG && avgR > avgB) return 'warm'
    if (avgB > avgR && avgB > avgG) return 'cool'
    return 'neutral'
  }
}

export const colorAnalyzer = new ColorAnalyzer()