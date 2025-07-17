#!/bin/bash

# Fix remaining ESLint issues

echo "🔍 Starting fixes for remaining ESLint issues..."

# 1. Fix unused variables by commenting them out
echo "🔧 Fixing unused variables..."
FILES=$(find ./app ./components ./lib ./hooks -type f -name "*.ts" -o -name "*.tsx")

for FILE in $FILES; do
  # Look for common unused variable patterns and comment them out
  sed -i '' 's/const \([a-zA-Z0-9_]*\) = [^;]*;.*\/\/ eslint-disable-line.*unused-vars/\/\/ const \1 = ...; \/\/ Commented out unused variable/g' "$FILE"
  sed -i '' 's/const { \([^}]*\) } = [^;]*;.*\/\/ eslint-disable-line.*unused-vars/\/\/ const { \1 } = ...; \/\/ Commented out unused variable/g' "$FILE"
done

# 2. Fix explicit any types by adding more specific types
echo "🔧 Creating a types.ts file with common types..."
mkdir -p lib/types

cat > lib/types/index.ts << 'EOL'
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
EOL

# 3. Fix import ordering by adding an import sorter config
echo "🔧 Adding import sorter configuration..."
cat > .importsortrc << 'EOL'
{
  "importOrder": [
    "^(react|next)(.*)$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]"
  ],
  "importOrderSeparation": true,
  "importOrderSortSpecifiers": true
}
EOL

echo "✅ Remaining fixes completed!"
echo "📝 You'll still need to manually fix:"
echo "  - Replace explicit 'any' types with types from lib/types"
echo "  - Fix import ordering in each file"
echo "  - Add missing dependencies to package.json"