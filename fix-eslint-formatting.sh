#!/bin/bash

echo "🔧 Fixing ESLint Formatting Issues"
echo "================================="

# Check if ESLint is installed
if ! npx eslint --version &> /dev/null; then
  echo "❌ ESLint not found. Installing..."
  npm install eslint --save-dev
fi

# Create a temporary ESLint config focused on formatting
cat > .eslintrc.formatting.js << EOF
module.exports = {
  extends: ['./.eslintrc.js'],
  rules: {
    // Arrow spacing - ensure exactly one space before and after the fat arrow
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    
    // Comma dangling - add trailing commas in multiline objects/arrays/functions
    'comma-dangle': ['error', 'always-multiline'],
    
    // Object curly spacing - use spaces inside braces
    'object-curly-spacing': ['error', 'always'],
    
    // Indent - conform to the 2-space indent standard
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

# Create a backup directory
mkdir -p eslint-fixes-backup

# Run ESLint with automatic fixes for formatting issues
echo "🔍 Running ESLint with automatic fixes for formatting issues..."

# Fix arrow spacing, comma dangling, and object curly spacing in app directory
echo "📁 Fixing app directory..."
find app -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | while read file; do
  cp "$file" "eslint-fixes-backup/$(basename "$file")"
  npx eslint --config .eslintrc.formatting.js --fix "$file"
done

# Fix arrow spacing, comma dangling, and object curly spacing in components directory
echo "📁 Fixing components directory..."
find components -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | while read file; do
  cp "$file" "eslint-fixes-backup/$(basename "$file")"
  npx eslint --config .eslintrc.formatting.js --fix "$file"
done

# Fix arrow spacing, comma dangling, and object curly spacing in lib directory
echo "📁 Fixing lib directory..."
find lib -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | while read file; do
  cp "$file" "eslint-fixes-backup/$(basename "$file")"
  npx eslint --config .eslintrc.formatting.js --fix "$file"
done

# Fix arrow spacing, comma dangling, and object curly spacing in hooks directory
echo "📁 Fixing hooks directory..."
find hooks -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | while read file; do
  cp "$file" "eslint-fixes-backup/$(basename "$file")"
  npx eslint --config .eslintrc.formatting.js --fix "$file"
done

# Clean up temporary ESLint config
rm .eslintrc.formatting.js

echo "✅ Formatting fixes applied"
echo ""
echo "📋 Backup files are stored in the eslint-fixes-backup directory"
echo "   in case you need to revert any changes."