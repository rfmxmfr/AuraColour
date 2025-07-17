import { uploadImage } from '@/lib/file-upload'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    const imageUrl = await uploadImage(file)
    
    if (!imageUrl) {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
    }
    
    return NextResponse.json({ imageUrl })
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}