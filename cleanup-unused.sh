#!/bin/bash

# Cleanup script to remove unused files

# Remove duplicate configuration files (keeping the TypeScript versions)
rm -f next.config.js        # Keep next.config.mjs
rm -f tailwind.config.js    # Keep tailwind.config.ts

# Remove test files (already covered by cleanup-tests.sh)
rm -f test-*.js
rm -f jest.config.js
rm -rf tests/

# Remove test directories
rm -rf app/test/
rm -rf app/test-questionnaire/
rm -rf app/api/test/
rm -rf app/api/test-*/
rm -rf app/api/full-color-test/

# Remove unused documentation files
rm -f e2e-test-report.md
rm -f extract-vercel-app.js
rm -f get-vercel-source.js
rm -f fix-build-errors.js

# Remove unused components
rm -f tania-component.tsx

# Remove duplicate files in admin dashboard
rm -f auracolor-admin-dashboard-main/._*

# Remove temporary files
rm -rf supabase/.temp/

echo "Unused files cleanup complete!"