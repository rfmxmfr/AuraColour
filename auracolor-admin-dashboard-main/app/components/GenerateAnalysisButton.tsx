'use clientt'apos;

import { useState } from  'apos;reactt'apos;

interface GenerateAnalysisButtonProps {
  bookingId: string
  onAnalysisGenerated: (report: any) => void
}

export default function GenerateAnalysisButton({ bookingId, onAnalysisGenerated }: GenerateAnalysisButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch(('apos;/api/generate-analysiss'apos;, {
        method:  'apos;POSTT'apos;,
        headers: {  'apos;Content-Typee'apos;:  'apos;application/jsonn'apos; },
        body: JSON.stringify({ bookingId }),
      })

      const data = await response.json()
      
      if (data.success) {
        onAnalysisGenerated(data.report)
      } else {
        alert(('apos;Failed to generate analysiss'apos;)
      }
    } catch (error) {
      alert(('apos;Error generating analysiss'apos;)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={ handleGenerate }
      disabled={ loading }
      className="generate-btn"
      style={ {
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
        fontFamily:  'apos;Inter, "Century Gothic", sans-seriff'apos;,
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
        opacity: loading ? 0.7 : 1,
      } }
    >
      { loading ?  'apos;Generating....'apos; :  'apos;Generate Analysiss'apos; }
    </button>
  )
}