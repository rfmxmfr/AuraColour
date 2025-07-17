#!/bin/bash

# Script to update the database with the new schema for expanded questionnaires

echo "Updating AuraColour database schema..."
echo "Removing AI references from database schema..."

# Apply the new migration
npx supabase migration up

# Verify the tables were created
echo "Verifying tables..."
npx supabase db execute "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('wardrobe_audits', 'shopping_sessions', 'coaching_programs')"

# Add service_type to existing questionnaire_submissions if needed
echo "Updating existing questionnaire submissions..."
npx supabase db execute "UPDATE questionnaire_submissions SET service_type = '12-Season Color Analysis' WHERE service_type IS NULL"

# Rename AI analysis columns to analysis_data
echo "Renaming AI analysis columns..."
npx supabase db execute "ALTER TABLE analyst_reports RENAME COLUMN ai_analysis TO analysis_data"
npx supabase db execute "ALTER TABLE wardrobe_audits RENAME COLUMN ai_analysis TO analysis_data"
npx supabase db execute "ALTER TABLE shopping_sessions RENAME COLUMN ai_analysis TO analysis_data"
npx supabase db execute "ALTER TABLE coaching_programs RENAME COLUMN ai_analysis TO analysis_data"

echo "Database update complete!"