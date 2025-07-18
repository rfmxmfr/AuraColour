import { NextRequest, NextResponse } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://firebase-deploy-ecru.vercel.app',
  'https://auracolor.com',
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
];

/**
 * Middleware to handle CORS headers
 */
export function corsMiddleware(request: NextRequest) {
  const origin = request.headers.get('origin') || '';
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
  
  // Create response with CORS headers
  const response = NextResponse.next();
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', isAllowedOrigin ? origin : ALLOWED_ORIGINS[0]);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-CSRF-Token');
  
  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204,
      headers: response.headers
    });
  }
  
  return response;
}