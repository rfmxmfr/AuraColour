'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'

interface AnalysisResult {
  id: string
  season: string
  confidence: number
  colors: string[]
  features: any
  created_at: string
}

export default function ResultsPage() {
  const params = useParams()
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchResults(params.id as string)
    }
  }, [params.id])

  const fetchResults = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Failed to fetch results:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = async () => {
    try {
      const response = await fetch(`/api/reports/${params.id}/pdf`)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `color-analysis-${params.id}.pdf`
      a.click()
    } catch (error) {
      alert('Download failed')
    }
  }

  const shareResults = async () => {
    const email = prompt('Enter email address:')
    if (!email) return

    try {
      await fetch(`/api/reports/${params.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      alert('Results shared successfully!')
    } catch (error) {
      alert('Sharing failed')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Analysis not found</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50">
      <Navbar />
      <div className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Color Analysis Results
            </h1>
            
            <div className="mb-8">
              <div className="text-5xl font-bold text-gray-900 mb-2">{result.season}</div>
              <div className="text-gray-600 mb-4">Confidence Score: {result.confidence}%</div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900">Your Color Palette</h3>
              <div className="flex justify-center gap-4 flex-wrap" data-testid="color-palette">
                {result.colors.map((color: string, index: number) => (
                  <div key={index} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-2 shadow-lg border-4 border-white"
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="text-xs text-gray-600">{color}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={downloadPDF}
                className="py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-all duration-200"
              >
                Download PDF
              </button>
              <button
                onClick={shareResults}
                className="py-3 px-6 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold transition-all duration-200"
              >
                Share Results
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}