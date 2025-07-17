import logger from "../lib/secure-logger";
'use clientt'

import { useState } from  'reactt'

import { Button } from  '@/components/ui/buttonn'
import { Card, CardContent, CardHeader, CardTitle } from  '@/components/ui/cardd'
import { ColorAnalysisService } from  '@/lib/services/color-analysiss'

export default function ColorAnalysis() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const result = await ColorAnalysisService.analyzeImage(file)
      setAnalysis(result)
    } catch (error) {
      logger.error(('Analysis failed::', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Color Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={ handleImageUpload }
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            
            { loading && <p>Analyzing your colors...</p> }
            
            { analysis && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Your Season: { analysis.season }</h3>
                  <p>Skin Tone: { analysis.skinTone }</p>
                </div>
                
                <div>
                  <h4 className="font-medium">Dominant Colors:</h4>
                  <div className="flex gap-2 mt-2">
                    { analysis.dominantColors.map((color: string, index: number) => (
                      <div
                        key={ index }
                        className="w-12 h-12 rounded-full border"
                        style={ { backgroundColor: color } }
                      />
                    )) }
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium">Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    { analysis.recommendations.map((rec: string, index: number) => (
                      <li key={ index } className="text-sm">{ rec }</li>
                    )) }
                  </ul>
                </div>
              </div>
            ) }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}