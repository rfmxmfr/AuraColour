import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

/**
 * Creates a Zod schema for sanitized string input
 * @param options Additional Zod string validations
 * @returns A Zod schema that sanitizes input
 */
export function sanitizedString(options?: z.StringOptions) {
  return z.string(options)
    .transform((val) => sanitizeHtml(val))
    .refine((val) => val.length > 0, { message: 'Cannot be empty after sanitization' });
}

/**
 * Creates a Zod schema for sanitized URL input
 * @returns A Zod schema that validates and sanitizes URLs
 */
export function sanitizedUrl() {
  return z.string()
    .url({ message: 'Invalid URL format' })
    .transform((val) => {
      // Only allow http and https URLs
      if (!val.startsWith('http://') && !val.startsWith('https://')) {
        return '';
      }
      return sanitizeHtml(val);
    })
    .refine((val) => val.length > 0, { message: 'Invalid URL after sanitization' });
}

/**
 * Creates a Zod schema for sanitized email input
 * @returns A Zod schema that validates and sanitizes emails
 */
export function sanitizedEmail() {
  return z.string()
    .email({ message: 'Invalid email address' })
    .transform((val) => sanitizeHtml(val));
}

/**
 * Creates a Zod schema for sanitized HTML content
 * @param options Additional options for sanitizeHtml
 * @returns A Zod schema that sanitizes HTML content
 */
export function sanitizedHtml(options?: sanitizeHtml.IOptions) {
  return z.string()
    .transform((val) => sanitizeHtml(val, options));
}

/**
 * Example usage for a contact form schema
 */
export const contactFormSchema = z.object({
  name: sanitizedString({ required_error: 'Name is required' })
    .min(2, { message: 'Name must be at least 2 characters' }),
  email: sanitizedEmail(),
  message: sanitizedString({ required_error: 'Message is required' })
    .min(10, { message: 'Message must be at least 10 characters' }),
  website: sanitizedUrl().optional(),
});

/**
 * Example usage for a questionnaire submission schema
 */
export const questionnaireSchema = z.object({
  fullName: sanitizedString({ required_error: 'Full name is required' }),
  email: sanitizedEmail(),
  age: z.number().int().positive(),
  skinTone: sanitizedString(),
  hairColor: sanitizedString(),
  eyeColor: sanitizedString(),
  preferredColors: z.array(sanitizedString()),
  additionalNotes: sanitizedHtml(),
});