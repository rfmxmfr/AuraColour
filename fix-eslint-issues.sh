#!/bin/bash

# Comprehensive ESLint fix script

echo "🔍 Starting ESLint fixes..."

# 1. Fix spacing and formatting issues
echo "🔧 Fixing spacing and formatting issues..."
# Fix arrow spacing
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/\(\)=>/\(\) =>/g'
# Fix object curly spacing
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/\{([^ ])/\{ \1/g'
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/([^ ])\}/\1 \}/g'
# Fix JSX curly spacing
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs sed -i '' -E 's/\{([^ ])/\{ \1/g'
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs sed -i '' -E 's/([^ ])\}/\1 \}/g'

# 2. Fix console.log statements
echo "🔧 Replacing console.log with secure logger..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/console\.log\(/logger.info\(/g'
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/console\.error\(/logger.error\(/g'
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/\/\/ logger/logger/g'

# 3. Fix React self-closing components
echo "🔧 Fixing React self-closing components..."
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs sed -i '' -E 's/<([A-Za-z0-9]+)><\/([A-Za-z0-9]+)>/<\1 \/>/g'

# 4. Fix mixed spaces and tabs in config files
echo "🔧 Fixing mixed spaces and tabs in config files..."
if [ -f "./tailwind.config.ts" ]; then
  sed -i '' -E 's/\t/  /g' ./tailwind.config.ts
fi
if [ -f "./next.config.mjs" ]; then
  sed -i '' -E 's/\t/  /g' ./next.config.mjs
fi

# 5. Fix 'apos; issues in files
echo "🔧 Fixing string quote issues..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E "s/'apos;/'/g"
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E "s/apos;'/'/g"

# 6. Fix import statements
echo "🔧 Fixing import statements..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E "s/from  'apos;apos;/from '/g"
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E "s/apos;apos;/'/g"

# 7. Fix 'use client' directive
echo "🔧 Fixing 'use client' directive..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E "s/'apos;use clientt'apos;apos;/'use client'/g"

echo "✅ Basic automatic fixes completed!"
echo "📝 Please run 'npx eslint --fix .' to apply additional fixes."
echo "⚠️ Manual fixes will still be needed for:"
echo "  - Unused variables"
echo "  - React hooks dependencies"
echo "  - Import ordering"
echo "  - Missing dependencies"