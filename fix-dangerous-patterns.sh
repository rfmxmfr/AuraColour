#!/bin/bash

echo "🔒 Fixing Dangerous JavaScript Patterns"
echo "====================================="

# Create backup directory
mkdir -p dangerous-patterns-backup

# 1. Fix dangerouslySetInnerHTML
echo "🔍 Finding and fixing dangerouslySetInnerHTML..."
find app components lib -type f -name "*.jsx" -o -name "*.tsx" | xargs grep -l "dangerouslySetInnerHTML" | while read file; do
  echo "  Fixing $file"
  cp "$file" "dangerous-patterns-backup/$(basename "$file")"
  sed -i.bak 's/dangerouslySetInnerHTML={{ __html: \([^}]*\) }}/dangerouslySetInnerHTML={{ __html: sanitizeHtml(\1) }}/g' "$file"
  
  # Add import if not present
  if ! grep -q "import sanitizeHtml" "$file"; then
    sed -i.bak '1i\import sanitizeHtml from "sanitize-html";' "$file"
  fi
done

# 2. Fix innerHTML/outerHTML
echo "🔍 Finding and fixing innerHTML/outerHTML..."
find app components lib -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -l "\.innerHTML\|\.outerHTML" | while read file; do
  echo "  Fixing $file"
  cp "$file" "dangerous-patterns-backup/$(basename "$file")"
  
  # Replace innerHTML assignments with sanitized versions
  sed -i.bak 's/\([a-zA-Z0-9_.]*\)\.innerHTML\s*=\s*\([^;]*\);/\1.innerHTML = sanitizeHtml(\2);/g' "$file"
  sed -i.bak 's/\([a-zA-Z0-9_.]*\)\.outerHTML\s*=\s*\([^;]*\);/\1.outerHTML = sanitizeHtml(\2);/g' "$file"
  
  # Add import if not present
  if ! grep -q "import sanitizeHtml" "$file" && grep -q "sanitizeHtml" "$file"; then
    sed -i.bak '1i\import sanitizeHtml from "sanitize-html";' "$file"
  fi
done

# 3. Fix document.write
echo "🔍 Finding and fixing document.write..."
find app components lib -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -l "document\.write" | while read file; do
  echo "  Fixing $file"
  cp "$file" "dangerous-patterns-backup/$(basename "$file")"
  
  # Replace document.write with safer alternatives
  sed -i.bak 's/document\.write(\([^)]*\))/document.body.insertAdjacentHTML("beforeend", sanitizeHtml(\1))/g' "$file"
  
  # Add import if not present
  if ! grep -q "import sanitizeHtml" "$file" && grep -q "sanitizeHtml" "$file"; then
    sed -i.bak '1i\import sanitizeHtml from "sanitize-html";' "$file"
  fi
done

# 4. Fix eval() and new Function()
echo "🔍 Finding and fixing eval() and new Function()..."
find app components lib -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -l "eval\|new Function" | while read file; do
  echo "  ⚠️ Found potentially unsafe code in $file"
  cp "$file" "dangerous-patterns-backup/$(basename "$file")"
  
  # Add warning comment to files with eval or new Function
  sed -i.bak '1i\// SECURITY WARNING: This file contains potentially unsafe eval() or new Function() calls\n// that should be refactored to avoid XSS vulnerabilities.\n' "$file"
  
  # Create a report of files with eval
  echo "$file" >> eval-function-report.txt
done

# 5. Fix URL parameters without validation
echo "🔍 Finding URL parameter usage..."
find app components lib -type f -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" | xargs grep -l "useSearchParams\|searchParams\|URLSearchParams\|location.search" | while read file; do
  echo "  Checking $file for URL parameter validation"
  cp "$file" "dangerous-patterns-backup/$(basename "$file")"
  
  # Add utility import for URL sanitization
  if ! grep -q "import { sanitizeObject } from " "$file"; then
    sed -i.bak '1i\import { sanitizeObject } from "../lib/security/xss-protection";\n' "$file"
  fi
  
  # Add warning comment
  sed -i.bak '1i\// SECURITY NOTE: Ensure all URL parameters are sanitized before use\n' "$file"
  
  # Create a report of files with URL parameters
  echo "$file" >> url-params-report.txt
done

# Clean up backup files
find . -name "*.bak" -type f -delete

echo "✅ Fixed dangerous patterns"
echo ""
echo "📋 Reports generated:"
echo "  - eval-function-report.txt: Files with eval() or new Function()"
echo "  - url-params-report.txt: Files using URL parameters"
echo ""
echo "⚠️ Manual review required for:"
echo "  - Files listed in eval-function-report.txt (eval cannot be automatically fixed)"
echo "  - Files listed in url-params-report.txt (verify parameter sanitization)"
echo ""
echo "📁 Backup files are stored in the dangerous-patterns-backup directory"