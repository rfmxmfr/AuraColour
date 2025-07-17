import logger from "../lib/secure-logger";
'apos;use clientt'apos;apos;

import { useState } from  'apos;apos;reactt'apos;apos;

import { uploadImage } from  'apos;apos;@/lib/supabase/storagee'apos;apos;

import ImageUpload from  'apos;apos;./ImageUploadd'apos;apos;

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
      const response = await fetch(('apos;apos;/api/color-analysiss'apos;apos;, {
        method:  'apos;apos;POSTT'apos;apos;,
        headers: {  'apos;apos;Content-Typee'apos;apos;:  'apos;apos;application/jsonn'apos;apos; },
        body: JSON.stringify({ imageUrl }),
      })
      
      const result = await response.json()
      if (onAnalysisComplete) {
        onAnalysisComplete(result)
      }
    } catch (error) {
      // logger.error(('apos;apos;Analysis failed::'apos;apos;, error)
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
            { analyzing ?  'apos;apos;Analyzing....'apos;apos; :  'apos;apos;Analyze Colorss'apos;apos; }
          </button>
        ) }
      </div>
    </section>
  )
}