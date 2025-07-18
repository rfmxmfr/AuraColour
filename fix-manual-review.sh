#!/bin/bash

echo "🔍 Manual Review Helper for Security Issues"
echo "========================================"

# Check if reports exist
if [ ! -f "eval-function-report.txt" ] && [ ! -f "url-params-report.txt" ]; then
  echo "❌ Report files not found. Run fix-dangerous-patterns.sh first."
  exit 1
fi

# Create directory for fixed files
mkdir -p manual-fixes

# Process eval/Function files
if [ -f "eval-function-report.txt" ]; then
  echo "📋 Processing files with eval() or new Function()..."
  
  while IFS= read -r file; do
    echo "🔍 Reviewing $file"
    
    # Create a fixed version of the file
    cp "$file" "manual-fixes/$(basename "$file")"
    
    # Replace eval with Function.prototype.apply pattern
    sed -i.bak 's/eval(\([^)]*\))/Function.prototype.apply.call(function() { return \1; }, null)/g' "manual-fixes/$(basename "$file")"
    
    # Replace new Function with a safer alternative
    sed -i.bak 's/new Function(\([^)]*\))/(() => { console.warn("Function constructor replaced with safe alternative"); return function() {}; })()/g' "manual-fixes/$(basename "$file")"
    
    # Add warning comment
    sed -i.bak '1i\// SECURITY WARNING: This file contained potentially unsafe eval() or new Function() calls\n// that have been replaced with safer alternatives. Please review the changes.\n' "manual-fixes/$(basename "$file")"
    
    echo "✅ Created safe alternative in manual-fixes/$(basename "$file")"
    echo "⚠️ Please review this file manually as automatic fixes may break functionality"
  done < "eval-function-report.txt"
fi

# Process URL parameter files
if [ -f "url-params-report.txt" ]; then
  echo "📋 Processing files with URL parameters..."
  
  while IFS= read -r file; do
    echo "🔍 Reviewing $file"
    
    # Create a fixed version of the file
    cp "$file" "manual-fixes/$(basename "$file")"
    
    # Add imports for URL sanitization
    sed -i.bak '1i\import { sanitizeUrlParams, validateUrlParams } from "../lib/security/url-sanitizer";\n' "manual-fixes/$(basename "$file")"
    
    # Replace useSearchParams with sanitized version
    sed -i.bak 's/const \([a-zA-Z0-9_]*\) = useSearchParams()/const rawParams = useSearchParams();\n  const \1 = sanitizeUrlParams(rawParams)/g' "manual-fixes/$(basename "$file")"
    
    # Replace direct parameter access with validation
    sed -i.bak 's/\([a-zA-Z0-9_]*\)\.get(\([^)]*\))/validateAndGet(\1, \2)/g' "manual-fixes/$(basename "$file")"
    
    # Add helper function for validation
    cat >> "manual-fixes/$(basename "$file")" << 'EOF'

// Helper function to validate and get URL parameters
function validateAndGet(params, key) {
  const value = params.get(key);
  if (!value) return null;
  
  // Sanitize the value
  return sanitizeHtml(value);
}
EOF
    
    # Add warning comment
    sed -i.bak '1i\// SECURITY WARNING: This file uses URL parameters that need validation\n// The code has been modified to use sanitizeUrlParams, but may need further review.\n' "manual-fixes/$(basename "$file")"
    
    echo "✅ Created safe alternative in manual-fixes/$(basename "$file")"
    echo "⚠️ Please review this file manually as automatic fixes may break functionality"
  done < "url-params-report.txt"
fi

# Clean up backup files
find manual-fixes -name "*.bak" -type f -delete

echo ""
echo "✅ Created safer alternatives for all files in the manual-fixes directory"
echo ""
echo "⚠️ IMPORTANT: You must manually review these files before using them"
echo "   as the automatic fixes may break functionality. The fixed files"
echo "   contain comments indicating what was changed."
echo ""
echo "📋 Next steps:"
echo "  1. Review each file in the manual-fixes directory"
echo "  2. Test the changes to ensure functionality is preserved"
echo "  3. Copy the fixed files back to their original locations"