#!/bin/bash

# Replace console.log statements with secure logger

echo "🔍 Starting replacement of console.log statements..."

# Find all TypeScript and JavaScript files
FILES=$(find ./app ./components ./lib ./hooks -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx")

# Add import statement to files with console.log
for FILE in $FILES; do
  if grep -q "console\.log" "$FILE" || grep -q "console\.error" "$FILE" || grep -q "console\.warn" "$FILE"; then
    echo "🔧 Processing $FILE"
    
    # Check if the file already imports the logger
    if ! grep -q "import.*secure-logger" "$FILE"; then
      # Add import statement at the top of the file after other imports
      sed -i '' '1s/^/import logger from "..\/lib\/secure-logger";\n/' "$FILE"
    fi
    
    # Replace console.log statements
    sed -i '' 's/console\.log(/logger.info(/g' "$FILE"
    sed -i '' 's/console\.error(/logger.error(/g' "$FILE"
    sed -i '' 's/console\.warn(/logger.warn(/g' "$FILE"
    sed -i '' 's/console\.debug(/logger.debug(/g' "$FILE"
  fi
done

echo "✅ Console.log replacement completed!"