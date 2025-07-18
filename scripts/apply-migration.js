#!/usr/bin/env node

/**
 * Apply Database Migration Script
 * 
 * This script prepares a migration file for manual execution in the Supabase dashboard.
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

// Get migration file from command line argument
const args = process.argv.slice(2);
const migrationFile = args[0];

if (!migrationFile) {
  console.error(`${colors.red}Error: No migration file specified${colors.reset}`);
  console.error('Usage: node apply-migration.js <migration-file>');
  process.exit(1);
}

const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', migrationFile);

if (!fs.existsSync(migrationPath)) {
  console.error(`${colors.red}Error: Migration file not found: ${migrationPath}${colors.reset}`);
  process.exit(1);
}

function prepareMigration() {
  console.log(`${colors.blue}Preparing migration: ${migrationFile}${colors.reset}`);
  
  try {
    // Read migration file
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'tmp');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    
    // Write to output file
    const outputPath = path.join(outputDir, `migration-${Date.now()}.sql`);
    fs.writeFileSync(outputPath, sql);
    
    console.log(`${colors.green}Migration prepared: ${outputPath}${colors.reset}`);
    console.log(`${colors.yellow}Instructions:${colors.reset}`);
    console.log(`1. Go to the Supabase dashboard: https://app.supabase.com`);
    console.log(`2. Select your project`);
    console.log(`3. Go to SQL Editor`);
    console.log(`4. Open the file: ${outputPath}`);
    console.log(`5. Execute the SQL`);
  } catch (err) {
    console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
    process.exit(1);
  }
}

prepareMigration();