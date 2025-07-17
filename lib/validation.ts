// Form validation utilities

/**
 * Validates if a string is a valid email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates if a string has a minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Validates if a value is not empty (string, array, or object)
 */
export function isNotEmpty(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim() !== '';
  }
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  if (typeof value === 'object' && value !== null) {
    return Object.keys(value).length > 0;
  }
  return value !== null && value !== undefined;
}

/**
 * Validates a questionnaire form
 */
export function validateQuestionnaireForm(answers: Record<string, any>, requiredFields: string[]): { 
  isValid: boolean; 
  errors: Record<string, string> 
} {
  const errors: Record<string, string> = { };
  
  for (const field of requiredFields) {
    if (!isNotEmpty(answers[field])) {
      errors[field] = 'This field is required';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a booking form
 */
export function validateBookingForm(data: { 
  name?: string; 
  email?: string; 
  phone?: string;
}): { 
  isValid: boolean; 
  errors: Record<string, string> 
} {
  const errors: Record<string, string> = { };
  
  if (!data.name || !hasMinLength(data.name, 2)) {
    errors.name = 'Please enter your full name';
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}