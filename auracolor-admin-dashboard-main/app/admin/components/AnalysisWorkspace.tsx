'use client'

import { useState } from 'react'

interface Ticket {
  id: string
  ticket_number: string
  customer_name: string
  customer_email: string
  service_type: string
  status: string
  image_url?: string
  questionnaire_data?: any
  ai_analysis?: any
}

interface AnalysisWorkspaceProps {
  ticket: Ticket | null
}

export default function AnalysisWorkspace({ ticket }: AnalysisWorkspaceProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  const startAnalysis = async () => {
    if (!ticket) return
    
    setAnalyzing(true)
    try {
      const response = await fetch('/api/analyze-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ticketId: ticket.id })
      })
      
      const result = await response.json()
      if (result.success) {
        setAnalysis(result.analysis)
      }
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  if (!ticket) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Analysis Workspace</h2>
        <p className="text-gray-500">Select a ticket to begin analysis</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold mb-4 text-black">Analysis Workspace</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div>
          <h3 className="font-semibold mb-2 text-black">Customer Information</h3>
          <div className="space-y-2 text-sm">
            <p className="text-black"><strong>Name:</strong> {ticket.customer_name}</p>
            <p className="text-black"><strong>Email:</strong> {ticket.customer_email}</p>
            <p className="text-black"><strong>Service:</strong> {ticket.service_type}</p>
            <p className="text-black"><strong>Status:</strong> {ticket.status}</p>
          </div>
          
          {ticket.questionnaire_data && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-black">Questionnaire Data</h4>
              <pre className="text-xs bg-gray-100 p-2 rounded text-black">
                {JSON.stringify(ticket.questionnaire_data, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* Image & Analysis */}
        <div>
          {ticket.image_url && (
            <div className="mb-4">
              <h4 className="font-semibold mb-2 text-black">Customer Image</h4>
              <img 
                src={ticket.image_url} 
                alt="Customer" 
                className="w-full max-w-xs rounded border"
              />
            </div>
          )}
          
          <button
            onClick={startAnalysis}
            disabled={analyzing}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Start AI Analysis'}
          </button>
        </div>
      </div>

      {/* Analysis Results */}
      {(analysis || ticket.ai_analysis) && (
        <div className="mt-6 border-t pt-6">
          <h3 className="font-semibold mb-4 text-black">AI Analysis Results</h3>
          <pre className="text-sm bg-gray-100 p-4 rounded text-black">
            {JSON.stringify(analysis || ticket.ai_analysis, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}