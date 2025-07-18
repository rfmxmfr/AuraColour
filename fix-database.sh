#!/bin/bash

echo "🔧 Fixing database schema and tables"

# Check if Supabase is running
if ! supabase status &> /dev/null; then
  echo "❌ Supabase is not running. Starting Supabase..."
  supabase start
fi

# Run the SQL script
echo "📊 Creating required tables..."
supabase db reset --db-url postgresql://postgres:postgres@localhost:54322/postgres

# Apply our custom SQL
echo "🔧 Applying custom SQL fixes..."
PGPASSWORD=postgres psql -h localhost -p 54322 -U postgres -d postgres -f fix-database.sql

echo "✅ Database schema fixed"
echo ""
echo "🚀 You can now run the application with:"
echo "npm run dev"