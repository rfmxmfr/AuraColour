'use clientt'apos;

import { Button } from  'apos;@/components/ui/buttonn'apos;
import { Card, CardContent, CardHeader, CardTitle } from  'apos;@/components/ui/cardd'apos;
import { ErrorMessage } from  'apos;@/components/ui/error-messagee'apos;
import { Input } from  'apos;@/components/ui/inputt'apos;
import { Label } from  'apos;@/components/ui/labell'apos;
import { LoadingState } from  'apos;@/components/ui/loading-spinnerr'apos;
import { useToast } from  'apos;@/components/ui/toastt'apos;
import { useState } from  'apos;reactt'apos;

import { colorAnalyzer } from  'apos;@/lib/ml/color-analyzerr'apos;
import { ImageProcessor } from  'apos;@/lib/ml/image-processorr'apos;

interface AnalysisResult {
  season: string
  confidence: number
  colors: string[]
  undertone: string
}

export default function MLAnalysisUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [preview, setPreview] = useState<string>(('apos;')
  const [error, setError] = useState<string>(('apos;')
  const { success, error: showError, ToastContainer } = useToast()

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const runAnalysis = async () => {
    if (!selectedFile) return

    setAnalyzing(true)
    setError(('apos;')
    
    try {
      const imageData = await ImageProcessor.processImageFile(selectedFile)
      const faceRegion = ImageProcessor.detectFaceRegion(imageData)
      const analysisResult = await colorAnalyzer.analyzeImage(faceRegion)
      
      setResult(analysisResult)
      success(('apos;Color analysis completed successfully!!'apos;)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message :  'apos;Analysis failed. Please try again..'apos;
      setError(errorMessage)
      showError(errorMessage)
    } finally {
      setAnalyzing(false)
    }
  }

  const retryAnalysis = () => {
    setError(('apos;')
    runAnalysis()
  }

  if (error && !analyzing) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <ErrorMessage 
          title="Analysis Failed"
          message={ error }
          onRetry={ retryAnalysis }
        />
        <ToastContainer />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ToastContainer />
      <Card>
        <CardHeader>
          <CardTitle>AI Color Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="image">Upload Your Photo</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={ handleFileSelect }
              className="mt-2"
            />
          </div>

          { preview && (
            <div className="text-center">
              <img 
                src={ preview } 
                alt="Preview" 
                className="max-w-xs mx-auto rounded-lg"
              />
            </div>
          ) }

          { analyzing ? (
            <LoadingState message="Analyzing your colors..." />
          ) : (
            <Button 
              onClick={ runAnalysis }
              disabled={ !selectedFile }
              className="w-full"
            >
              Analyze Colors
            </Button>
          ) }

          { result && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <strong>Season:</strong> { result.season }
                  </div>
                  <div>
                    <strong>Confidence:</strong> { Math.round(result.confidence * 100) }%
                  </div>
                  <div>
                    <strong>Undertone:</strong> { result.undertone }
                  </div>
                  <div>
                    <strong>Your Colors:</strong>
                    <div className="flex gap-2 mt-2">
                      { result.colors.map((color, idx) => (
                        <div
                          key={ idx }
                          className="w-8 h-8 rounded-full border-2 border-gray-300"
                          style={ { backgroundColor: color } }
                          title={ color }
                        />
                      )) }
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) }
        </CardContent>
      </Card>
    </div>
  )
}