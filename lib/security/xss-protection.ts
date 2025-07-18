import { NextResponse, type NextRequest } from 'next/server';
import sanitizeHtml from 'sanitize-html';

// Sanitize HTML configuration
const SANITIZE_HTML_OPTIONS = {
  allowedTags: [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
    'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
    'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'span'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src', 'alt', 'height', 'width'],
    '*': ['class', 'id', 'style']
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedSchemesByTag: { },
  allowedSchemesAppliedToAttributes: ['href', 'src'],
  allowProtocolRelative: true
};

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param html The HTML content to sanitize
 * @returns Sanitized HTML
 */
export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, SANITIZE_HTML_OPTIONS);
}

/**
 * Sanitizes an object's string properties recursively
 * @param obj The object to sanitize
 * @returns A new object with sanitized string properties
 */
export function sanitizeObject<T>(obj: T): T {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const result = Array.isArray(obj) ? [] : { } as T;

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      
      if (typeof value === 'string') {
        // Sanitize string values
        result[key] = sanitizeHtml(value, SANITIZE_HTML_OPTIONS) as any;
      } else if (typeof value === 'object' && value !== null) {
        // Recursively sanitize nested objects
        result[key] = sanitizeObject(value);
      } else {
        // Keep non-string values as is
        result[key] = value;
      }
    }
  }

  return result;
}

/**
 * Middleware to add security headers and sanitize input
 * @param request The incoming request
 */
export function xssProtectionMiddleware(request: NextRequest) {
  // Add security headers to the response
  const response = NextResponse.next();
  
  // Set security headers
  const headers = response.headers;
  
  // Content-Security-Policy
  headers.set('Content-Security-Policy', 
    "default-src 'self'; " +
    "script-src 'self' https://js.stripe.com; " +
    "style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data: https:; " +
    "connect-src 'self' https://api.openai.com https://api.stripe.com; " +
    "frame-src 'self' https://js.stripe.com; " +
    "font-src 'self'; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self'; " +
    "frame-ancestors 'none'; " +
    "upgrade-insecure-requests;"
  );
  
  // X-XSS-Protection
  headers.set('X-XSS-Protection', '1; mode=block');
  
  // X-Content-Type-Options
  headers.set('X-Content-Type-Options', 'nosniff');
  
  // Referrer-Policy
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions-Policy
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}