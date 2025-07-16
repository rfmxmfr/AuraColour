import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { colorAnalyzer } from '@/lib/ml/color-analyzer'
import { ImageProcessor } from '@/lib/ml/image-processor'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { data: analyses } = await supabase
      .from('ml_analyses')
      .select('*')
      .order('created_at', { ascending: false })
    
    return NextResponse.json(analyses || [])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch analyses' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get('image') as File
    const clientId = formData.get('clientId') as string
    
    if (!imageFile || !clientId) {
      return NextResponse.json({ error: 'Image and client ID required' }, { status: 400 })
    }

    // Process image
    const imageBuffer = await imageFile.arrayBuffer()
    const imageData = await processImageBuffer(imageBuffer)
    
    // Run TensorFlow analysis
    const analysisResult = await colorAnalyzer.analyzeImage(imageData)
    
    // Store result
    const supabase = createClient()
    await supabase.from('ml_analyses').insert({
      client_id: clientId,
      season: analysisResult.season,
      confidence: analysisResult.confidence,
      colors: analysisResult.colors,
      undertone: analysisResult.undertone,
      status: 'completed'
    })
    
    return NextResponse.json({
      id: Date.now().toString(),
      clientId,
      season: analysisResult.season,
      confidence: analysisResult.confidence,
      colors: analysisResult.colors,
      undertone: analysisResult.undertone,
      status: 'completed'
    })

  } catch (error) {
    console.error('ML Analysis error:', error)
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}

async function processImageBuffer(buffer: ArrayBuffer): Promise<ImageData> {
  // Server-side image processing
  const canvas = require('canvas')
  const img = new canvas.Image()
  img.src = Buffer.from(buffer)
  
  const canvasEl = canvas.createCanvas(224, 224)
  const ctx = canvasEl.getContext('2d')
  ctx.drawImage(img, 0, 0, 224, 224)
  
  return ctx.getImageData(0, 0, 224, 224)
}