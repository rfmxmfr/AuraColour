import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()
  
  // Authentication logic here
  return NextResponse.json({ 
    success: true, 
    token: 'jwt-token',
    user: { id: 1, email }
  })
}