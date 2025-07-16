'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const submissionId = searchParams.get('id')
  
  const [loading, setLoading] = useState(true)
  const [report, setReport] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (submissionId) {
      fetchResults(submissionId)
    } else {
      setError('No submission ID provided')
      setLoading(false)
    }
  }, [submissionId])

  const fetchResults = async (id: string) => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Get the analyst report for this submission
      const { data: reportData, error: reportError } = await supabase
        .from('analyst_reports')
        .select('*')
        .eq('ticket_id', id)
        .single()
      
      if (reportError) {
        throw reportError
      }
      
      if (!reportData) {
        setError('Results not found')
        return
      }
      
      setReport(reportData)
    } catch (error) {
      console.error('Error fetching results:', error)
      setError('Failed to load your color analysis results')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Loading your color analysis results...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="max-w-md mx-auto px-6">
            <Card>
              <CardHeader>
                <CardTitle>Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.href = '/dashboard'}>
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Extract AI analysis data
  const aiAnalysis = report?.ai_analysis || {}
  const season = aiAnalysis.season || 'Unknown'
  const confidence = aiAnalysis.confidence || 0
  const undertone = aiAnalysis.undertone || 'Unknown'
  const recommendedColors = aiAnalysis.recommended_colors || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Color Analysis Results
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Based on your photos and questionnaire, our analysis has determined your optimal color palette
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Your Season</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-5xl font-bold mb-4">{season}</div>
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-gray-200 h-2 rounded-full w-full max-w-xs">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" 
                        style={{ width: `${confidence}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium">{confidence}%</span>
                  </div>
                  <p className="text-gray-600">
                    Your undertone is <span className="font-medium">{undertone}</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analyst Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 whitespace-pre-line">
                  {report?.styling_notes || 'No additional notes provided.'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Your Color Palette</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {recommendedColors.map((color: string, index: number) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 shadow-md border-4 border-white"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-sm font-mono">{color}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button onClick={() => window.location.href = '/dashboard'}>
              Return to Dashboard
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}