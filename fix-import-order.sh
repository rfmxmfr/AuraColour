#!/bin/bash

# Script to organize imports according to ESLint rules

echo "🔍 Organizing imports..."

# Find TypeScript and JavaScript files
FILES=$(find ./app -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | grep -v "node_modules")

for file in $FILES; do
  echo "Processing $file..."
  
  # Add blank line between different import groups
  # This is a simplified approach - for complex cases, ESLint's --fix would be better
  
  # 1. Find built-in imports and add blank line after them
  sed -i '' -E '/^import .* from '\''(fs|path|http|util|crypto|os|events|stream|buffer|url|querystring|zlib|readline|process|child_process|cluster|dgram|dns|domain|net|tls|https|punycode|tty|repl|string_decoder|timers|vm|v8|worker_threads)'\''/ {
    n
    /^import/ i\\

  }' "$file"
  
  # 2. Find external package imports and add blank line after them
  sed -i '' -E '/^import .* from '\''(@[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+|[a-zA-Z0-9-]+)'\''/ {
    n
    /^import .* from '\''\./ i\\

  }' "$file"
  
  echo "✅ Processed $file"
done

echo "✅ Completed organizing imports"
echo "Note: For more accurate import ordering, consider using ESLint's --fix option"