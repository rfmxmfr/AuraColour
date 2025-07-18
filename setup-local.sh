#!/bin/bash

echo "🎨 AuraColour Local Development Setup"
echo "===================================="

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    brew install supabase/tap/supabase
else
    echo "✅ Supabase CLI found"
fi

# Start local Supabase
echo "🚀 Starting local Supabase..."
supabase start

# Apply database migrations
echo "📤 Applying migrations to local database..."
supabase db reset

# Install dependencies
echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo ""
echo "✅ Setup complete! 🎉"
echo ""
echo "🚀 To start the development server, run:"
echo "npm run dev"
echo ""
echo "📊 Supabase Studio is available at:"
echo "http://localhost:54323"