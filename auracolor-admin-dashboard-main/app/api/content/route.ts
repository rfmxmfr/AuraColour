import { NextRequest, NextResponse } from 'next/server'

let contentStore: any[] = [
  {
    id: '1',
    type: 'service',
    title: '12-Season Color Analysis',
    content: 'Professional color analysis service that determines your optimal color palette.',
    status: 'published',
    lastModified: new Date().toISOString()
  }
]

export async function GET() {
  return NextResponse.json(contentStore)
}

export async function POST(request: NextRequest) {
  try {
    const content = await request.json()
    const newContent = {
      ...content,
      id: Date.now().toString(),
      lastModified: new Date().toISOString()
    }
    
    contentStore.push(newContent)
    return NextResponse.json(newContent)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create content' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const content = await request.json()
    const index = contentStore.findIndex(item => item.id === content.id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 })
    }
    
    contentStore[index] = {
      ...content,
      lastModified: new Date().toISOString()
    }
    
    return NextResponse.json(contentStore[index])
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
  }
}