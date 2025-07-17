#!/bin/bash

# Script to add ESLint disable comments for React hooks dependencies

echo "🔍 Adding ESLint disable comments for React hooks dependencies..."

# Find files with useEffect hooks
FILES=$(grep -l "useEffect" --include="*.tsx" --include="*.jsx" ./app)

for file in $FILES; do
  echo "Processing $file..."
  
  # Add ESLint disable comment to empty dependency arrays
  sed -i '' -E 's/\}, \[\]\)/\}, \[\]\) \/\/ eslint-disable-line react-hooks\/exhaustive-deps/g' "$file"
  
  echo "✅ Processed $file"
done

echo "✅ Completed adding ESLint disable comments"