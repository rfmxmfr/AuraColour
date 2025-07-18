#!/bin/bash

echo "🎨 AuraColour Local Development"
echo "============================="

# Check if Supabase is running
if ! supabase status &> /dev/null; then
  echo "🚀 Starting Supabase..."
  supabase start
else
  echo "✅ Supabase is already running"
fi

# Start the Next.js development server
echo "🚀 Starting Next.js development server..."
npm run dev