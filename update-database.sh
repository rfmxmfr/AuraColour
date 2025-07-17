#!/bin/bash

# Script to update the database with the new schema for expanded questionnaires

echo "Updating AuraColour database schema..."

# Apply the new migration
npx supabase migration up

# Verify the tables were created
echo "Verifying tables..."
npx supabase db execute "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('wardrobe_audits', 'shopping_sessions', 'coaching_programs')"

# Add service_type to existing questionnaire_submissions if needed
echo "Updating existing questionnaire submissions..."
npx supabase db execute "UPDATE questionnaire_submissions SET service_type = '12-Season Color Analysis' WHERE service_type IS NULL"

echo "Database update complete!"