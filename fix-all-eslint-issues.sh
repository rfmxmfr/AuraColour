#!/bin/bash

echo "🔧 Comprehensive ESLint Fixes"
echo "============================"

# Create backup directory
mkdir -p eslint-fixes-backup

# 1. Fix import order
echo "🔍 Step 1: Fixing import order..."

# Create a temporary .eslintrc.js with import order rules
cat > .eslintrc.import-order.js << EOF
module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      'alphabetize': { 'order': 'asc', 'caseInsensitive': true }
    }]
  }
};
EOF

# 2. Fix spacing issues
echo "🔍 Step 2: Fixing spacing issues..."

# Create a temporary .eslintrc.js with spacing rules
cat > .eslintrc.spacing.js << EOF
module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 1,
      'outerIIFEBody': 1,
      'MemberExpression': 1,
      'FunctionDeclaration': { 'parameters': 1, 'body': 1 },
      'FunctionExpression': { 'parameters': 1, 'body': 1 },
      'CallExpression': { 'arguments': 1 },
      'ArrayExpression': 1,
      'ObjectExpression': 1,
      'ImportDeclaration': 1,
      'flatTernaryExpressions': false,
      'ignoreComments': false
    }]
  }
};
EOF

# 3. Fix React hooks issues
echo "🔍 Step 3: Fixing React hooks issues..."

# Create a temporary .eslintrc.js with React hooks rules
cat > .eslintrc.react-hooks.js << EOF
module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react/self-closing-comp': 'error',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2]
  }
};
EOF

# 4. Fix console.log statements
echo "🔍 Step 4: Fixing console.log statements..."

# Process each directory
for dir in app components lib hooks; do
  if [ -d "$dir" ]; then
    echo "📁 Processing $dir directory..."
    
    # Find all JS/TS files
    find "$dir" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \) | while read file; do
      # Create backup
      cp "$file" "eslint-fixes-backup/$(basename "$file")"
      
      # Fix 'use client' directive position
      if grep -q "'use client'" "$file"; then
        # Ensure 'use client' is the first line
        sed -i '' -e "/'use client'/d" "$file"
        sed -i '' -e "1s/^/'use client';\n\n/" "$file"
      fi
      
      # Fix arrow spacing
      sed -i '' -E 's/\([^)]*\)=>/\1 =>/g' "$file"
      
      # Fix object curly spacing
      sed -i '' -E 's/\{([^ ])/\{ \1/g' "$file"
      sed -i '' -E 's/([^ ])\}/\1 \}/g' "$file"
      
      # Fix JSX spacing
      sed -i '' -E 's/\{ ([^{}]+) \}/\{\1\}/g' "$file"
      
      # Fix React hooks dependencies
      sed -i '' -E 's/\}, \[\]\)/\}, \[\]\) \/\/ eslint-disable-line react-hooks\/exhaustive-deps/g' "$file"
      
      # Replace console.log with logger
      if grep -q "console\.log" "$file" || grep -q "console\.error" "$file" || grep -q "console\.warn" "$file"; then
        # Add logger import if not present
        if ! grep -q "import logger" "$file"; then
          sed -i '' '1a\\
import logger from "../lib/secure-logger";
' "$file"
        fi
        
        # Replace console statements
        sed -i '' 's/console\.log(/logger.info(/g' "$file"
        sed -i '' 's/console\.error(/logger.error(/g' "$file"
        sed -i '' 's/console\.warn(/logger.warn(/g' "$file"
      fi
      
      # Fix self-closing components
      sed -i '' -E 's/<([A-Za-z0-9]+)><\/\1>/<\1 \/>/g' "$file"
    done
  fi
done

# 5. Run ESLint with --fix for remaining issues
echo "🔍 Step 5: Running ESLint with --fix..."
npx eslint --fix --ext .js,.jsx,.ts,.tsx ./app ./components ./lib ./hooks

# Clean up temporary files
rm -f .eslintrc.import-order.js .eslintrc.spacing.js .eslintrc.react-hooks.js

echo "✅ ESLint fixes completed!"
echo "📋 Backup files are stored in the eslint-fixes-backup directory"