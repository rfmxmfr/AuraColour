export class ImageProcessor {
  static async processImageFile(file: File): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      
      img.onload = () => {
        canvas.width = 224
        canvas.height = 224
        ctx.drawImage(img, 0, 0, 224, 224)
        
        const imageData = ctx.getImageData(0, 0, 224, 224)
        resolve(imageData)
      }
      
      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  static async processImageUrl(url: string): Promise<ImageData> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!
      const img = new Image()
      
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        canvas.width = 224
        canvas.height = 224
        ctx.drawImage(img, 0, 0, 224, 224)
        
        const imageData = ctx.getImageData(0, 0, 224, 224)
        resolve(imageData)
      }
      
      img.onerror = reject
      img.src = url
    })
  }

  static detectFaceRegion(imageData: ImageData): ImageData {
    // Simple face detection - center crop
    const { width, height } = imageData
    const faceSize = Math.min(width, height) * 0.6
    const startX = (width - faceSize) / 2
    const startY = (height - faceSize) / 2
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = faceSize
    canvas.height = faceSize
    
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')!
    tempCanvas.width = width
    tempCanvas.height = height
    tempCtx.putImageData(imageData, 0, 0)
    
    ctx.drawImage(tempCanvas, startX, startY, faceSize, faceSize, 0, 0, faceSize, faceSize)
    
    return ctx.getImageData(0, 0, faceSize, faceSize)
  }
}