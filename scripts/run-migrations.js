#!/usr/bin/env node

/**
 * Database migration script for AuraColor
 * 
 * This script runs database migrations in order.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Path to migrations directory
const migrationsDir = path.join(__dirname, '..', 'lib', 'db', 'migrations');

// Check if directory exists
if (!fs.existsSync(migrationsDir)) {
  console.error(`❌ Migrations directory not found: ${migrationsDir}`);
  process.exit(1);
}

// Get all migration files
const migrationFiles = fs.readdirSync(migrationsDir)
  .filter(file => file.endsWith('.sql'))
  .sort(); // Sort to ensure migrations run in order

if (migrationFiles.length === 0) {
  console.error('❌ No migration files found.');
  process.exit(1);
}

// Function to execute SQL file against Supabase
const executeSql = (filePath, description) => {
  try {
    console.log(`📦 Running migration: ${description}...`);
    
    // Try to use Supabase CLI first
    try {
      execSync('which supabase', { stdio: 'ignore' });
      execSync(`supabase db execute --file ${filePath}`, { stdio: 'inherit' });
      console.log(`✅ Migration ${description} completed successfully!`);
      return;
    } catch (e) {
      // Supabase CLI not available or failed, fall back to direct execution
      console.log('Supabase CLI not available, using direct execution...');
    }
    
    // Direct execution using psql if available
    try {
      execSync('which psql', { stdio: 'ignore' });
      
      // Get database connection info from environment
      const dbHost = process.env.POSTGRES_HOST || 'localhost';
      const dbPort = process.env.POSTGRES_PORT || '54322';
      const dbName = process.env.POSTGRES_DB || 'postgres';
      const dbUser = process.env.POSTGRES_USER || 'postgres';
      const dbPassword = process.env.POSTGRES_PASSWORD || 'postgres';
      
      // Set PGPASSWORD environment variable for psql
      const env = { ...process.env, PGPASSWORD: dbPassword };
      
      // Execute SQL file using psql
      execSync(`psql -h ${dbHost} -p ${dbPort} -d ${dbName} -U ${dbUser} -f ${filePath}`, { 
        stdio: 'inherit',
        env
      });
      
      console.log(`✅ Migration ${description} completed successfully!`);
      return;
    } catch (e) {
      // psql not available or failed
      console.log('psql not available, cannot execute migrations.');
      console.error(e.message);
      process.exit(1);
    }
  } catch (error) {
    console.error(`❌ Error running migration ${description}:`, error.message);
    process.exit(1);
  }
};

// Main function
const main = async () => {
  console.log('🔧 Running AuraColor database migrations...');
  
  // Run each migration
  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    executeSql(filePath, file);
  }
  
  console.log('✅ All migrations completed successfully!');
};

main();