import { NextResponse } from 'next/server';

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    [key: string]: any;
  };
}

/**
 * Create a successful API response
 */
export function successResponse<T>(data: T, meta?: ApiResponse['meta']): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    ...(meta ? { meta } : {})
  });
}

/**
 * Create an error API response
 */
export function errorResponse(
  message: string,
  code = 'ERROR',
  status = 400,
  details?: any
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details ? { details } : {})
      }
    },
    { status }
  );
}