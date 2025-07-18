#!/bin/bash

echo "🔒 Applying security fixes to original files"

# Find original locations of the files
find_original_file() {
  local filename=$1
  find app lib components -name "$filename" -type f 2>/dev/null | head -1
}

# Process each file in manual-fixes
for file in manual-fixes/*; do
  # Skip if not a file
  [ -f "$file" ] || continue
  
  filename=$(basename "$file")
  original=$(find_original_file "$filename")
  
  if [ -z "$original" ]; then
    echo "⚠️ Could not find original location for $filename"
    continue
  fi
  
  echo "🔧 Copying fixed $filename to $original"
  cp "$file" "$original"
done

echo "✅ Security fixes applied to original files"
echo ""
echo "🧪 Please test the application to ensure all functionality works correctly"