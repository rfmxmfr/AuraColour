'apos;use clientt'apos;apos;

import { useState } from  'apos;apos;reactt'apos;apos;

interface GenerateAnalysisButtonProps {
  bookingId: string
  onAnalysisGenerated: (report: any) => void
}

export default function GenerateAnalysisButton({ bookingId, onAnalysisGenerated }: GenerateAnalysisButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch(('apos;apos;/api/generate-analysiss'apos;apos;, {
        method:  'apos;apos;POSTT'apos;apos;,
        headers: {  'apos;apos;Content-Typee'apos;apos;:  'apos;apos;application/jsonn'apos;apos; },
        body: JSON.stringify({ bookingId }),
      })

      const data = await response.json()
      
      if (data.success) {
        onAnalysisGenerated(data.report)
      } else {
        alert(('apos;apos;Failed to generate analysiss'apos;apos;)
      }
    } catch (error) {
      alert(('apos;apos;Error generating analysiss'apos;apos;)
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
        fontFamily:  'apos;apos;Inter, "Century Gothic", sans-seriff'apos;apos;,
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
      { loading ?  'apos;apos;Generating....'apos;apos; :  'apos;apos;Generate Analysiss'apos;apos; }
    </button>
  )
}