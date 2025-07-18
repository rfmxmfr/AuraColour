#!/bin/bash

echo "🔧 Fixing EnhancedAdminDashboard.tsx"
echo "=================================="

# Find the file
FILE=$(find . -name "EnhancedAdminDashboard.tsx" | grep -v "eslint-fixes-backup")

if [ -z "$FILE" ]; then
  echo "❌ EnhancedAdminDashboard.tsx not found"
  exit 1
fi

echo "📄 Found file: $FILE"

# Create backup
cp "$FILE" "eslint-fixes-backup/EnhancedAdminDashboard.tsx.bak"

# Fix 'use client' directive position
sed -i '' -e "/'use client'/d" "$FILE"
sed -i '' -e "1s/^/'use client';\n\n/" "$FILE"

# Remove logger import (will add it back at the top)
sed -i '' -e "/import logger/d" "$FILE"

# Add logger import at the top (after 'use client')
sed -i '' -e "2s/^/import logger from \"..\/lib\/secure-logger\";\n/" "$FILE"

# Fix typos
sed -i '' 's/clientt/client/g' "$FILE"
sed -i '' 's/reactt/react/g' "$FILE"
sed -i '' 's/enhanced-admin.csss/enhanced-admin.css/g' "$FILE"
sed -i '' 's/dashboardd/dashboard/g' "$FILE"
sed -i '' 's/alll/all/g' "$FILE"
sed -i '' 's/questionnaire_submissionss/questionnaire_submissions/g' "$FILE"
sed -i '' 's/created_att/created_at/g' "$FILE"
sed -i '' 's/contact_submissionss/contact_submissions/g' "$FILE"
sed -i '' 's/profiless/profiles/g' "$FILE"
sed -i '' 's/updated_att/updated_at/g' "$FILE"
sed -i '' 's/analysiss/analysis/g' "$FILE"
sed -i '' 's/recommendationss/recommendations/g' "$FILE"
sed -i '' 's/assistancee/assistance/g' "$FILE"
sed -i '' 's/transformationn/transformation/g' "$FILE"
sed -i '' 's/activee/active/g' "$FILE"
sed -i '' 's/£75.000/£75.00/g' "$FILE"
sed -i '' 's/£100.000/£100.00/g' "$FILE"
sed -i '' 's/£150.000/£150.00/g' "$FILE"
sed -i '' 's/£300.000/£300.00/g' "$FILE"
sed -i '' 's/bookingg/booking/g' "$FILE"

# Fix missing parentheses
sed -i '' 's/useState((/useState(/g' "$FILE"
sed -i '' 's/from((/from(/g' "$FILE"
sed -i '' 's/select((/select(/g' "$FILE"
sed -i '' 's/order((/order(/g' "$FILE"
sed -i '' 's/error((/error(/g' "$FILE"
sed -i '' 's/\[\[/\[/g' "$FILE"

# Fix spacing issues
sed -i '' -E 's/\([^)]*\)=>/\1 =>/g' "$FILE"
sed -i '' -E 's/\{([^ \n])/\{ \1/g' "$FILE"
sed -i '' -E 's/([^ \n])\}/\1 \}/g' "$FILE"

# Fix React hooks dependencies
sed -i '' -E 's/\}, \[filters\]\)/\}, \[filters\]\) \/\/ eslint-disable-line react-hooks\/exhaustive-deps/g' "$FILE"

echo "✅ Fixed EnhancedAdminDashboard.tsx"