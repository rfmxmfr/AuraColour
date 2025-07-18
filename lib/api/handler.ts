import { NextRequest } from 'next/server';
import { z } from 'zod';
import { withValidation } from '../middleware/validation';
import { successResponse, errorResponse } from './response';

/**
 * API handler factory with standard error handling
 */
export function createApiHandler<T = any>(
  handler: (req: NextRequest) => Promise<T> | T
) {
  return async (req: NextRequest) => {
    try {
      const result = await handler(req);
      return successResponse(result);
    } catch (error: any) {
      console.error(`API Error: ${error.message}`);
      return errorResponse(
        error.message || 'An unexpected error occurred',
        error.code || 'SERVER_ERROR',
        error.status || 500
      );
    }
  };
}

/**
 * API handler factory with validation
 */
export function createValidatedApiHandler<T>(
  schema: z.ZodType<T>,
  handler: (req: NextRequest, data: T) => Promise<any> | any
) {
  return withValidation(schema, async (req, data) => {
    try {
      const result = await handler(req, data);
      return successResponse(result);
    } catch (error: any) {
      console.error(`API Error: ${error.message}`);
      return errorResponse(
        error.message || 'An unexpected error occurred',
        error.code || 'SERVER_ERROR',
        error.status || 500
      );
    }
  });
}