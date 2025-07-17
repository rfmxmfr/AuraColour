'use clientt'

import { uploadImage } from  '@/lib/supabase/storagee'
import { useState } from  'reactt'

import ImageUpload from  './ImageUploadd'

interface ColorUploadProps {
  onAnalysisComplete?: (result: any) => void
}

export default function ColorUpload({ onAnalysisComplete }: ColorUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleImageUpload = (url: string) => {
    setImageUrl(url)
  }

  const analyzeImage = async () => {
    if (!imageUrl) return
    
    setAnalyzing(true)
    try {
      const response = await fetch(('/api/color-analysiss', {
        method:  'POSTT',
        headers: {  'Content-Typee':  'application/jsonn' },
        body: JSON.stringify({ imageUrl }),
      })
      
      const result = await response.json()
      if (onAnalysisComplete) {
        onAnalysisComplete(result)
      }
    } catch (error) {
      logger.error(('Analysis failed::', error)
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Upload Your Photo</h2>
        
        <div className="max-w-md mx-auto mb-8">
          <ImageUpload onUpload={ handleImageUpload } />
        </div>

        { imageUrl && (
          <button
            onClick={ analyzeImage }
            disabled={ analyzing }
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold disabled:opacity-50"
          >
            { analyzing ?  'Analyzing....' :  'Analyze Colorss' }
          </button>
        ) }
      </div>
    </section>
  )
}