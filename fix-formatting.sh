#!/bin/bash

echo "🔧 Fixing ESLint formatting issues"
echo "=================================="

# Fix arrow spacing, comma dangling, and object curly spacing
echo "🔍 Running ESLint with automatic fixes for formatting issues..."
npx eslint --fix "app/**/*.{js,jsx,ts,tsx}" "components/**/*.{js,jsx,ts,tsx}" "lib/**/*.{js,jsx,ts,tsx}" "hooks/**/*.{js,jsx,ts,tsx}" --rule "arrow-spacing: error" --rule "comma-dangle: [error, always-multiline]" --rule "object-curly-spacing: [error, always]"

echo "✅ Formatting fixes applied"