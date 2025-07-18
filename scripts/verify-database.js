#!/usr/bin/env node

/**
 * Database Connection Verification Script
 * 
 * This script verifies the connection to the Supabase database
 * and checks that all required tables exist.
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const dbConfig = require('../config/database');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

async function verifyDatabase() {
  console.log(`${colors.blue}Verifying database connection...${colors.reset}`);
  
  // Check environment variables
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.error(`${colors.red}Error: Missing Supabase environment variables${colors.reset}`);
    console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local');
    process.exit(1);
  }
  
  // Create Supabase client
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  
  try {
    // Test connection
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      throw new Error(`Database connection error: ${error.message}`);
    }
    
    console.log(`${colors.green}✓ Connected to Supabase successfully${colors.reset}`);
    
    // Verify tables
    console.log(`${colors.blue}Verifying database tables...${colors.reset}`);
    
    for (const table of dbConfig.schema.tables) {
      try {
        const { error } = await supabase.from(table).select('count').limit(1);
        
        if (error) {
          console.error(`${colors.red}✗ Table '${table}' error: ${error.message}${colors.reset}`);
        } else {
          console.log(`${colors.green}✓ Table '${table}' exists${colors.reset}`);
        }
      } catch (err) {
        console.error(`${colors.red}✗ Error checking table '${table}': ${err.message}${colors.reset}`);
      }
    }
    
    console.log(`${colors.green}Database verification complete${colors.reset}`);
  } catch (err) {
    console.error(`${colors.red}Error: ${err.message}${colors.reset}`);
    process.exit(1);
  }
}

verifyDatabase();