import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Validates request data against a Zod schema
 */
export function validateRequest<T>(
  request: NextRequest,
  schema: z.ZodType<T>,
  errorStatus = 400
): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> {
  return request.json()
    .then((body) => {
      const result = schema.safeParse(body);
      
      if (!result.success) {
        return {
          success: false,
          response: NextResponse.json(
            { error: 'Validation error', details: result.error.format() },
            { status: errorStatus }
          )
        };
      }
      
      return { success: true, data: result.data };
    })
    .catch(() => {
      return {
        success: false,
        response: NextResponse.json(
          { error: 'Invalid JSON' },
          { status: errorStatus }
        )
      };
    });
}

/**
 * Creates a request handler with validation
 */
export function withValidation<T>(
  schema: z.ZodType<T>,
  handler: (req: NextRequest, data: T) => Promise<NextResponse> | NextResponse
) {
  return async (req: NextRequest) => {
    const validation = await validateRequest(req, schema);
    
    if (!validation.success) {
      return validation.response;
    }
    
    return handler(req, validation.data);
  };
}