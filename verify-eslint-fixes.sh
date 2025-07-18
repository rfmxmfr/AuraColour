#!/bin/bash

echo "🔍 Verifying ESLint Fixes"
echo "========================="

# Run ESLint on the codebase
echo "Running ESLint on app directory..."
npx eslint --ext .js,.jsx,.ts,.tsx ./app

echo "Running ESLint on components directory..."
npx eslint --ext .js,.jsx,.ts,.tsx ./components

echo "Running ESLint on lib directory..."
npx eslint --ext .js,.jsx,.ts,.tsx ./lib

echo "Running ESLint on hooks directory..."
npx eslint --ext .js,.jsx,.ts,.tsx ./hooks

echo "✅ Verification complete!"
echo "If no errors were shown above, all ESLint issues have been fixed."