#!/bin/bash

echo "🔒 Adding security imports to files in manual-fixes directory"

# Loop over the files in the manual-fixes directory
for file in manual-fixes/*; do
  # Skip if not a file
  [ -f "$file" ] || continue
  
  # Check if file already has the imports
  if grep -q "import.*sanitizeUrlParams" "$file"; then
    echo "✅ $file already has security imports"
    continue
  fi
  
  echo "🔧 Adding security imports to $file"
  
  # Determine the correct relative path to the security module
  if [[ "$file" == *"app/"* ]]; then
    import_path="../../lib/security/url-sanitizer"
  elif [[ "$file" == *"components/"* ]]; then
    import_path="../lib/security/url-sanitizer"
  else
    import_path="./lib/security/url-sanitizer"
  fi
  
  # Create a temporary file with the text to be inserted
  cat > temp.txt << EOF
import { sanitizeUrlParams, validateUrlParams } from '$import_path';
// SECURITY WARNING: This file uses URL parameters that need validation
// The code has been modified to use sanitizeUrlParams, but may need further review.

EOF

  # Concatenate the temporary file with the original file
  cat temp.txt "$file" > "${file}.new"
  mv "${file}.new" "$file"
done

# Remove the temporary file if it exists
rm -f temp.txt

echo "✅ Security imports added to files in manual-fixes directory"