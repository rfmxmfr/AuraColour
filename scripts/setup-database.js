#!/usr/bin/env node

/**
 * Database setup script for AuraColor
 * 
 * This script applies the schema and seed data to the Supabase database.
 * It requires the Supabase CLI to be installed and configured.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials. Please check your .env.local file.');
  process.exit(1);
}

// Path to SQL files
const schemaPath = path.join(__dirname, '..', 'lib', 'supabase', 'schema.sql');
const seedPath = path.join(__dirname, '..', 'lib', 'supabase', 'seed.sql');

// Check if files exist
if (!fs.existsSync(schemaPath)) {
  console.error(`❌ Schema file not found: ${schemaPath}`);
  process.exit(1);
}

if (!fs.existsSync(seedPath)) {
  console.error(`❌ Seed file not found: ${seedPath}`);
  process.exit(1);
}

// Function to execute SQL file against Supabase
const executeSql = (filePath, description) => {
  try {
    console.log(`📦 Applying ${description}...`);
    
    // Create a temporary file with the SQL content
    const tempFile = path.join(__dirname, `temp_${Date.now()}.sql`);
    fs.copyFileSync(filePath, tempFile);
    
    // Execute the SQL using the Supabase REST API
    const command = `curl -X POST "${SUPABASE_URL}/rest/v1/rpc/exec_sql" \\
      -H "apikey: ${SUPABASE_SERVICE_ROLE_KEY}" \\
      -H "Authorization: Bearer ${SUPABASE_SERVICE_ROLE_KEY}" \\
      -H "Content-Type: application/json" \\
      -d @${tempFile}`;
    
    execSync(command, { stdio: 'inherit' });
    
    // Clean up the temporary file
    fs.unlinkSync(tempFile);
    
    console.log(`✅ ${description} applied successfully!`);
  } catch (error) {
    console.error(`❌ Error applying ${description}:`, error.message);
    process.exit(1);
  }
};

// Main function
const main = async () => {
  console.log('🔧 Setting up AuraColor database...');
  
  // Apply schema
  executeSql(schemaPath, 'database schema');
  
  // Apply seed data
  executeSql(seedPath, 'seed data');
  
  console.log('✅ Database setup complete!');
};

main();