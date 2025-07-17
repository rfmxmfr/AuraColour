#!/bin/bash

# Script to clean up duplicate files and update references

echo "Cleaning up duplicate API endpoints and hooks..."

# Remove duplicate API endpoints
rm -f app/api/color-analysis/route.ts
rm -f app/api/style-analysis/route.ts

# Remove duplicate hooks
rm -f hooks/use-ai-analysis.ts
rm -f hooks/use-style-analysis.ts
rm -f hooks/use-color-analysis.ts

# Update database schema
echo "Updating database schema..."
bash update-database.sh

echo "Cleanup complete!"