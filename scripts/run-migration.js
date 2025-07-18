#!/usr/bin/env node

/**
 * Run Database Migration Script
 * 
 * This script runs a specific migration file against the Supabase database.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
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
  console.error('Usage: node run-migration.js <migration-file>');
  process.exit(1);
}

const migrationPath = path.join(process.cwd(), 'supabase', 'migrations', migrationFile);

if (!fs.existsSync(migrationPath)) {
  console.error(`${colors.red}Error: Migration file not found: ${migrationPath}${colors.reset}`);
  process.exit(1);
}

async function runMigration() {
  console.log(`${colors.blue}Running migration: ${migrationFile}${colors.reset}`);
  
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error(`${colors.red}Error: Missing Supabase environment variables${colors.reset}`);
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
  }
  
  // Create Supabase client with service role key for admin access
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  try {
    // Read migration file
    const sql = fs.readFileSync(migrationPath, 'utf8');
    
    // Execute SQL directly
    const { error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) {
      console.error(`${colors.yellow}Warning: Could not use exec_sql RPC function. Trying alternative method...${colors.reset}`);
      
      // Alternative: Split SQL into separate statements and execute them one by one
      const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
      
      for (const statement of statements) {
        const { error } = await supabase.sql(statement);
        if (error) {
          throw new Error(`Migration statement failed: ${error.message}\n\nStatement: ${statement}`);
        }
      }
    }
    
    console.log(`${colors.green}Migration completed successfully${colors.reset}`);
  } catch (err) {
    console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
    process.exit(1);
  }
}

runMigration();