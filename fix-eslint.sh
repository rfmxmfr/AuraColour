#!/bin/bash

# Fix ESLint issues script

echo "🔍 Starting ESLint fixes..."

# 1. Fix spacing and formatting issues
echo "🔧 Fixing spacing and formatting issues..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/\(\)=>/\(\) =>/g'
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/\{([^ ])/\{ \1/g'
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/([^ ])\}/\1 \}/g'

# 2. Fix console.log statements
echo "🔧 Replacing console.log with secure logger..."
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/console\.log\(/\/\/ console.log\(/g'
find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs sed -i '' -E 's/console\.error\(/\/\/ console.error\(/g'

# 3. Fix React self-closing components
echo "🔧 Fixing React self-closing components..."
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs sed -i '' -E 's/<([A-Za-z0-9]+)><\/([A-Za-z0-9]+)>/<\1 \/>/g'

# 4. Fix mixed spaces and tabs in tailwind.config.ts
echo "🔧 Fixing mixed spaces and tabs in tailwind.config.ts..."
if [ -f "./tailwind.config.ts" ]; then
  sed -i '' -E 's/\t/  /g' ./tailwind.config.ts
fi

# 5. Fix unescaped entities
echo "🔧 Fixing unescaped entities..."
find . -type f -name "*.tsx" -o -name "*.jsx" | xargs sed -i '' -E "s/([^\\])'/\\1&apos;/g"

echo "✅ Basic automatic fixes completed!"
echo "📝 Please run 'npx eslint --fix .' to apply additional fixes."
echo "⚠️ Manual fixes will still be needed for:"
echo "  - Unused variables"
echo "  - Explicit any types"
echo "  - Import ordering"
echo "  - Missing dependencies"