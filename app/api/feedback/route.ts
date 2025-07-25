import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { page, rating, feedback, timestamp, userAgent } = body

    // Log feedback for analysis
    console.log('User Feedback:', {
      page,
      rating,
      feedback,
      timestamp,
      userAgent: userAgent?.substring(0, 100)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Feedback API error:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}