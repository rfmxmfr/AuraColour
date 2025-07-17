/**
 * Common types for the application
 */

// Generic response type
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// User profile type
export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin' | 'analyst';
  createdAt: string;
  updatedAt: string;
}

// Color analysis result type
export interface ColorAnalysisResult {
  season: string;
  confidence: number;
  undertone: 'warm' | 'cool' | 'neutral';
  colors: string[];
  recommendations: string[];
}

// Analysis report type
export interface AnalysisReport {
  id: string;
  userId: string;
  type: string;
  results: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Form submission type
export interface FormSubmission {
  id: string;
  userId: string;
  formType: string;
  data: Record<string, unknown>;
  status: 'pending' | 'processed' | 'completed';
  createdAt: string;
}

// Payment type
export interface Payment {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  paymentMethod: string;
  createdAt: string;
}

// File upload type
export interface FileUpload {
  id: string;
  userId: string;
  filename: string;
  fileType: string;
  fileSize: number;
  url: string;
  createdAt: string;
}

// Logger options type
export interface LoggerOptions {
  context?: string;
  sanitize?: boolean;
  level?: 'info' | 'warn' | 'error' | 'debug';
}

// Generic data type for when any is needed but with better documentation
export type GenericData = Record<string, unknown>;

// Function to help migrate from any to GenericData
export const asGenericData = (data: unknown): GenericData => {
  if (typeof data === 'object' && data !== null) {
    return data as GenericData;
  }
  return { value: data };
};
