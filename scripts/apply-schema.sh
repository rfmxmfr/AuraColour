#!/bin/bash

# Script to apply SQL schema to Supabase project
# This script uploads and executes the SQL schema file

echo "Applying SQL schema to Supabase project..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Check if we're logged in to Supabase
if ! supabase projects list &> /dev/null; then
    echo "Please login to Supabase CLI first:"
    echo "supabase login"
    exit 1
fi

# Get Supabase project ID
read -p "Enter your Supabase project ID: " PROJECT_ID

# Apply schema
echo "Applying schema to project $PROJECT_ID..."
supabase db push -p $PROJECT_ID --db-url "postgresql://postgres:postgres@localhost:5432/postgres" --schema-only

echo "Schema applied successfully!"
echo ""
echo "If you prefer to apply the schema manually:"
echo "1. Go to https://app.supabase.com/project/$PROJECT_ID/sql/new"
echo "2. Copy the contents of supabase/migrations/01_schema.sql"
echo "3. Paste into the SQL editor and run"