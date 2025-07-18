import { updateSession } from './lib/supabase/middleware'
import { xssProtectionMiddleware } from './lib/security/xss-protection'
import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // Apply XSS protection
  const xssResponse = xssProtectionMiddleware(request)
  
  // Update session
  const sessionResponse = await updateSession(request)
  
  // Merge headers from both middleware functions
  const response = sessionResponse || NextResponse.next()
  
  // Copy XSS protection headers
  xssResponse.headers.forEach((value, key) => {
    response.headers.set(key, value)
  })
  
  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}