/**
 * Safely parse JSON without using eval
 * @param jsonString The JSON string to parse
 * @returns Parsed object or null if invalid
 */
export function safeJsonParse<T>(jsonString: string): T | null {
  try {
    // Use native JSON.parse which doesn't use eval internally
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
}

/**
 * Safely stringify an object to JSON
 * @param value The value to stringify
 * @returns JSON string or empty object if error
 */
export function safeJsonStringify(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    console.error('Failed to stringify to JSON:', error);
    return '{}';
  }
}

/**
 * Safely parse and validate JSON against a schema
 * @param jsonString The JSON string to parse
 * @param validator Validation function that returns boolean
 * @returns Parsed and validated object or null if invalid
 */
export function parseAndValidateJson<T>(
  jsonString: string,
  validator: (data: unknown) => data is T
): T | null {
  const parsed = safeJsonParse<unknown>(jsonString);
  
  if (parsed === null) {
    return null;
  }
  
  if (validator(parsed)) {
    return parsed;
  }
  
  console.error('JSON validation failed');
  return null;
}

/**
 * Type guard for checking if a value is a plain object
 * @param value Value to check
 * @returns True if the value is a plain object
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}