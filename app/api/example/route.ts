import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { withValidation } from '@/lib/middleware/validation';

// Define a schema for request validation
const exampleSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().optional(),
});

// Define the handler with validation
export const POST = withValidation(
  exampleSchema,
  async (req: NextRequest, data) => {
    // Process the validated data
    // data is typed correctly based on the schema
    
    return NextResponse.json({
      success: true,
      message: `Hello, ${data.name}!`,
    });
  }
);