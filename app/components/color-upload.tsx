'use client'

import { useState } from 'react'

export default function ColorUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSelectedImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = () => {
    setAnalyzing(true)
    // Simulate analysis
    setTimeout(() => setAnalyzing(false), 3000)
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Upload Your Photo</h2>
        
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 mb-8">
          {selectedImage ? (
            <img src={selectedImage} alt="Uploaded" className="max-w-sm mx-auto rounded-lg" />
          ) : (
            <div>
              <p className="text-gray-400 mb-4">Upload a clear photo of yourself in natural lighting</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="bg-purple-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-purple-700"
              >
                Choose Photo
              </label>
            </div>
          )}
        </div>

        {selectedImage && (
          <button
            onClick={analyzeImage}
            disabled={analyzing}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze Colors'}
          </button>
        )}
      </div>
    </section>
  )
}