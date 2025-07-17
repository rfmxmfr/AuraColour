#!/bin/bash

# Fix common ESLint issues manually

echo "🔍 Starting manual fixes for common issues..."

# 1. Fix tailwind.config.ts mixed spaces and tabs
echo "🔧 Fixing mixed spaces and tabs in tailwind.config.ts..."
if [ -f "./tailwind.config.ts" ]; then
  sed -i '' 's/\t/  /g' ./tailwind.config.ts
fi

# 2. Fix unescaped entities in React components
echo "🔧 Fixing unescaped entities in React components..."
find ./app -type f -name "*.tsx" | xargs sed -i '' "s/'/&apos;/g"

# 3. Fix arrow spacing
echo "🔧 Fixing arrow spacing..."
find ./app ./components ./lib ./hooks -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/\([a-zA-Z0-9)]\)=>/\1 =>/g'

# 4. Fix object curly spacing
echo "🔧 Fixing object curly spacing..."
find ./app ./components ./lib ./hooks -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/{\\([^\\s]\\)/{ \\1/g'
find ./app ./components ./lib ./hooks -type f -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's/\\([^\\s]\\)}/\\1 }/g'

# 5. Fix self-closing components
echo "🔧 Fixing self-closing components..."
find ./app ./components -type f -name "*.tsx" | xargs sed -i '' 's/<\\([A-Za-z][A-Za-z0-9]*\\)><\\/\\1>/<\\1 \\/>/g'

echo "✅ Basic fixes completed!"
echo "📝 You'll still need to manually fix:"
echo "  - Replace console.log calls with a logger utility"
echo "  - Fix unused variables"
echo "  - Fix explicit any types"
echo "  - Fix import ordering"
echo "  - Fix missing dependencies"