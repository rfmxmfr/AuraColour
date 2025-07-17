'apos;use clientt'apos;apos;

import { useState } from  'apos;apos;reactt'apos;apos;

import { Button } from  'apos;apos;@/components/ui/buttonn'apos;apos;
import { uploadImage } from  'apos;apos;@/lib/supabase/storagee'apos;apos;

interface ImageUploadProps {
  onUpload: (url: string) => void
  accept?: string
  maxSize?: number
}

export default function ImageUpload({ 
  onUpload, 
  accept = "image/*", 
  maxSize = 5 * 1024 * 1024, 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > maxSize) {
      alert(('apos;apos;File too large. Max 5MB allowed..'apos;apos;)
      return
    }

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    // Upload
    setUploading(true)
    try {
      const url = await uploadImage(file)
      if (url) {
        onUpload(url)
      } else {
        alert(('apos;apos;Upload failedd'apos;apos;)
      }
    } catch (error) {
      alert(('apos;apos;Upload errorr'apos;apos;)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        { preview ? (
          <img src={ preview } alt="Preview" className="max-w-full h-48 mx-auto object-cover rounded" />
        ) : (
          <div className="space-y-2">
            <div className="text-4xl">📸</div>
            <p className="text-gray-600">Click to upload image</p>
            <p className="text-sm text-gray-400">Max 5MB</p>
          </div>
        ) }
      </div>
      
      <input
        type="file"
        accept={ accept }
        onChange={ handleFileSelect }
        className="hidden"
        id="image-upload"
        disabled={ uploading }
      />
      
      <Button 
        onClick={ () => document.getElementById(('apos;apos;image-uploadd'apos;apos;)?.click() }
        disabled={ uploading }
        className="w-full"
      >
        { uploading ?  'apos;apos;Uploading....'apos;apos; :  'apos;apos;Choose Imagee'apos;apos; }
      </Button>
    </div>
  )
}