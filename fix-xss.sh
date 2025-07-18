#!/bin/bash

echo "🔒 Fixing Cross-Site Scripting (XSS) Vulnerabilities"
echo "=================================================="

# Find files that might contain XSS vulnerabilities
echo "🔍 Scanning for potential XSS vulnerabilities..."

# Create a backup directory
mkdir -p xss-fixes-backup

# Fix dangerouslySetInnerHTML usage
echo "🛠️ Fixing dangerouslySetInnerHTML usage..."
find app components lib -type f -name "*.tsx" -o -name "*.jsx" | xargs grep -l "dangerouslySetInnerHTML" | while read file; do
  echo "  Checking $file"
  cp "$file" "xss-fixes-backup/$(basename "$file")"
  # Replace dangerouslySetInnerHTML with sanitized content
  sed -i.bak 's/dangerouslySetInnerHTML={{ __html: \([^}]*\) }}/dangerouslySetInnerHTML={{ __html: sanitizeHtml(\1) }}/g' "$file"
done

# Fix direct DOM manipulation
echo "🛠️ Fixing direct DOM manipulation..."
find app components lib -type f -name "*.tsx" -o -name "*.jsx" -o -name "*.ts" -o -name "*.js" | xargs grep -l "innerHTML\|outerHTML" | while read file; do
  echo "  Checking $file"
  cp "$file" "xss-fixes-backup/$(basename "$file")"
  # Add comment to review these files manually
  sed -i.bak '1i\// SECURITY: This file contains potential XSS vulnerabilities that need manual review\n' "$file"
done

# Add sanitizeHtml import where needed
echo "🛠️ Adding sanitizeHtml imports where needed..."
find app components lib -type f -name "*.tsx" -o -name "*.jsx" | xargs grep -l "sanitizeHtml" | while read file; do
  if ! grep -q "import sanitizeHtml" "$file"; then
    sed -i.bak '1i\import sanitizeHtml from "sanitize-html";\n' "$file"
  fi
done

# Clean up backup files
find . -name "*.bak" -type f -delete

echo "✅ XSS fixes applied"
echo ""
echo "⚠️ IMPORTANT: Manual review is still required for all files that use:"
echo "  - dangerouslySetInnerHTML"
echo "  - innerHTML/outerHTML"
echo "  - document.write"
echo "  - eval() or new Function()"
echo "  - URL parameters without validation"
echo ""
echo "📋 Files that need manual review are in the xss-fixes-backup directory"
echo "   and have been marked with a comment at the top."