import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

/**
 * Sanitizes URL search parameters
 * @param params URLSearchParams object or string
 * @returns Sanitized URLSearchParams object
 */
export function sanitizeUrlParams(params: URLSearchParams | string): URLSearchParams {
  const searchParams = typeof params === 'string' ? new URLSearchParams(params) : params;
  const sanitizedParams = new URLSearchParams();
  
  // Iterate through all parameters and sanitize them
  for (const [key, value] of searchParams.entries()) {
    sanitizedParams.append(key, sanitizeHtml(value));
  }
  
  return sanitizedParams;
}

/**
 * Creates a safe wrapper around useSearchParams hook
 * @param searchParams Original search params from useSearchParams
 * @returns Sanitized search params
 */
export function useSanitizedSearchParams(searchParams: URLSearchParams): URLSearchParams {
  return sanitizeUrlParams(searchParams);
}

/**
 * Validates and sanitizes URL parameters against a schema
 * @param params URLSearchParams object
 * @param schema Zod schema for validation
 * @returns Validated and sanitized object
 */
export function validateUrlParams<T>(
  params: URLSearchParams,
  schema: z.ZodType<T>
): { data: T | null; errors: z.ZodError | null } {
  // Convert URLSearchParams to object
  const paramsObj: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    paramsObj[key] = value;
  }
  
  // Validate with schema
  try {
    const validData = schema.parse(paramsObj);
    return { data: validData, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { data: null, errors: error };
    }
    throw error;
  }
}

/**
 * Example usage:
 * 
 * // Define a schema for URL parameters
 * const userParamsSchema = z.object({
 *   id: z.string().uuid(),
 *   tab: z.enum(['profile', 'settings', 'history']).optional(),
 * });
 * 
 * // In a component
 * const searchParams = useSanitizedSearchParams(useSearchParams());
 * const { data, errors } = validateUrlParams(searchParams, userParamsSchema);
 * 
 * if (data) {
 *   // Safe to use data.id and data.tab
 * } else {
 *   // Handle invalid parameters
 * }
 */
// Helper function to validate and get URL parameters
function validateAndGet(params, key) {
  const value = params.get(key);
  if (!value) return null;
  
  // Sanitize the value
  return sanitizeHtml(value);
}
