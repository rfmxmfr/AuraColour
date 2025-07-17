#!/bin/bash

# Cleanup script to remove test files

# Remove root level test files
rm -f test-*.js
rm -f e2e-test-report.md
rm -f jest.config.js

# Remove test directories
rm -rf tests/
rm -rf app/test/
rm -rf app/test-questionnaire/
rm -rf app/api/test/
rm -rf app/api/test-*/
rm -rf app/api/full-color-test/

# Remove test files in admin dashboard
rm -rf auracolor-admin-dashboard-main/test-*.js
rm -rf auracolor-admin-dashboard-main/tests/
rm -rf auracolor-admin-dashboard-main/test-results/
rm -rf auracolor-admin-dashboard-main/app/test/
rm -rf auracolor-admin-dashboard-main/app/test-questionnaire/
rm -rf auracolor-admin-dashboard-main/app/ml-test/
rm -rf auracolor-admin-dashboard-main/app/api/test/
rm -rf auracolor-admin-dashboard-main/app/api/test-*/
rm -rf auracolor-admin-dashboard-main/app/api/full-color-test/
rm -rf auracolor-admin-dashboard-main/app/api/simple-test/
rm -rf auracolor-admin-dashboard-main/miscellaneous/test-*.js

# Remove test files in .next directory
rm -rf .next/server/app/api/test/
rm -rf .next/static/chunks/app/api/test/

echo "Test files cleanup complete!"