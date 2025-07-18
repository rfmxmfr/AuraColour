#!/bin/bash

# Apply database schema script for AuraColor
# This script applies the database schema to Supabase

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI is not installed. Please install it first."
    echo "Visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

# Check if logged in to Supabase
if ! supabase status &> /dev/null; then
    echo "Supabase is not running. Please start it first."
    echo "Run: supabase start"
    exit 1
fi

# Apply migrations
echo "Applying database migrations..."
supabase db reset

echo "Database schema applied successfully!"