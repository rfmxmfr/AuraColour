'use client'

import { useState, useRef } from 'react'

interface PhotoUploadProps {
  onFilesChange: (files: FileList | null) => void
  currentFiles?: FileList | null
}

export default function PhotoUpload({ onFilesChange, currentFiles }: PhotoUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [previews, setPreviews] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    
    const fileArray = Array.from(files)
    const newPreviews: string[] = []
    
    fileArray.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          newPreviews.push(e.target?.result as string)
          if (newPreviews.length === fileArray.length) {
            setPreviews(newPreviews)
          }
        }
        reader.readAsDataURL(file)
      }
    })
    
    onFilesChange(files)
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div 
        className={`border-2 border-dashed rounded-2xl p-8 text-center bg-white/30 backdrop-blur-md transition-all duration-200 ${
          dragActive 
            ? 'border-purple-500 bg-purple-50/50' 
            : 'border-purple-300/50 hover:border-purple-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {previews.length > 0 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border-2 border-white shadow-md"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    ✓
                  </div>
                </div>
              ))}
            </div>
            <p className="text-green-600 font-semibold">
              {previews.length} photo{previews.length > 1 ? 's' : ''} uploaded successfully
            </p>
            <button
              onClick={onButtonClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Change Photos
            </button>
          </div>
        ) : (
          <div>
            <svg className="w-16 h-16 mx-auto text-purple-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-900 mb-2 font-semibold">
              {dragActive ? 'Drop your photos here' : 'Drag & drop your 3 photos here'}
            </p>
            <p className="text-gray-600 text-sm mb-6">or click to browse</p>
            <p className="text-gray-500 text-xs mb-4">JPG, PNG up to 10MB each</p>
            
            <button
              onClick={onButtonClick}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 font-semibold"
            >
              Choose Photos
            </button>
          </div>
        )}
        
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
      
      <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span>Your photos are secure and private</span>
      </div>
    </div>
  )
}