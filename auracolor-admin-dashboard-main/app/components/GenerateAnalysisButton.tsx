'use client'

import { useState } from 'react'

interface GenerateAnalysisButtonProps {
  bookingId: string
  onAnalysisGenerated: (report: any) => void
}

export default function GenerateAnalysisButton({ bookingId, onAnalysisGenerated }: GenerateAnalysisButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookingId })
      })

      const data = await response.json()
      
      if (data.success) {
        onAnalysisGenerated(data.report)
      } else {
        alert('Failed to generate analysis')
      }
    } catch (error) {
      alert('Error generating analysis')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={loading}
      className="generate-btn"
      style={{
        borderWidth: "0px",
        borderStyle: "solid",
        borderColor: "rgb(229, 231, 235)",
        boxSizing: "border-box",
        margin: "0px",
        fontFeatureSettings: "inherit",
        fontVariationSettings: "inherit",
        fontSize: "100%",
        lineHeight: "inherit",
        textTransform: "none",
        appearance: "button",
        fontFamily: 'Inter, "Century Gothic", sans-serif',
        letterSpacing: "0.02em",
        background: "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)",
        border: "none",
        padding: "0.75rem 1.5rem",
        borderRadius: "8px",
        transition: "0.2s",
        backgroundImage: "linear-gradient(135deg, rgb(102, 126, 234) 0%, rgb(118, 75, 162) 100%)",
        backgroundColor: "initial",
        color: "white",
        fontWeight: 500,
        cursor: loading ? "not-allowed" : "pointer",
        marginTop: "1rem",
        textAlign: "center",
        opacity: loading ? 0.7 : 1
      }}
    >
      {loading ? 'Generating...' : 'Generate Analysis'}
    </button>
  )
}