import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param input - The input string to sanitize
 * @param options - Optional sanitization options
 * @returns Sanitized string
 */
export function sanitizeInput(input: string | null | undefined, strict = true): string {
  if (input === null || input === undefined) {
    return '';
  }
  
  const options = strict ? 
    // Strict mode - only allow basic formatting
    {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
      allowedAttributes: { },
    } : 
    // Less strict mode - allow more formatting but still secure
    {
      allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'ul', 'ol', 'li', 'span'],
      allowedAttributes: {
        'span': ['style'],
        'p': ['style'],
      },
      allowedStyles: {
        '*': {
          'color': [/^#(0x)?[0-9a-f]+$/i, /^rgb\(\s*(\d{ 1,3 })\s*,\s*(\d{ 1,3 })\s*,\s*(\d{ 1,3 })\s*\)$/],
          'text-align': [/^left$/, /^right$/, /^center$/],
          'font-size': [/^\d+(?:px|em|rem|%)$/],
        },
      },
    };
  
  return sanitizeHtml(input, options);
}

/**
 * Validates a UUID string
 * @param id - The UUID string to validate
 * @returns Boolean indicating if the string is a valid UUID
 */
export function isValidUUID(id: string): boolean {
  return /^[0-9a-f]{ 8 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 4 }-[0-9a-f]{ 12 }$/i.test(id);
}

/**
 * Common validation schemas
 */
export const validationSchemas = {
  uuid: z.string().refine(isValidUUID, { message: 'Invalid UUID format' }),
  
  email: z.string().email({ message: 'Invalid email address' }),
  
  name: z.string().min(1).max(100),
  
  phone: z.string().min(5).max(20).optional(),
  
  date: z.string().regex(/^\d{ 4 }-\d{ 2 }-\d{ 2 }$/, { message: 'Date must be in YYYY-MM-DD format' }),
  
  time: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Time must be in HH:MM format' }),
  
  colorHex: z.string().regex(/^#[0-9A-Fa-f]{ 6 }$/, { message: 'Must be a valid hex color code' }),
  
  safeText: z.string().max(1000).transform(text => sanitizeInput(text)),
  
  safeHtml: z.string().max(5000).transform(html => sanitizeInput(html, false)),
};

/**
 * Safely parses JSON with error handling
 * @param jsonString - The JSON string to parse
 * @returns Parsed object or null if invalid
 */
export function safeJsonParse(jsonString: string): any {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return null;
  }
}

/**
 * Sanitizes an object's string properties recursively
 * @param obj - The object to sanitize
 * @returns Sanitized object
 */
export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = { };
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = sanitizeInput(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = sanitizeObject(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map(item => 
        typeof item === 'string' ? sanitizeInput(item) : 
          (item && typeof item === 'object') ? sanitizeObject(item) : item
      );
    } else {
      result[key] = value;
    }
  }
  
  return result;
}