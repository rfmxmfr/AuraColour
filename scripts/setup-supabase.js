#!/usr/bin/env node

/**
 * Setup Supabase for local development
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if Supabase CLI is installed
try {
  execSync('which supabase', { stdio: 'ignore' });
  console.log('✅ Supabase CLI is installed');
} catch (error) {
  console.error('❌ Supabase CLI is not installed. Please install it first:');
  console.error('npm install -g supabase');
  process.exit(1);
}

// Initialize Supabase if not already initialized
if (!fs.existsSync(path.join(process.cwd(), 'supabase'))) {
  console.log('🚀 Initializing Supabase...');
  try {
    execSync('supabase init', { stdio: 'inherit' });
    console.log('✅ Supabase initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Supabase:', error.message);
    process.exit(1);
  }
}

// Start Supabase
console.log('🚀 Starting Supabase...');
try {
  execSync('supabase start', { stdio: 'inherit' });
  console.log('✅ Supabase started');
} catch (error) {
  console.error('❌ Failed to start Supabase:', error.message);
  process.exit(1);
}

// Get Supabase credentials
console.log('🔑 Getting Supabase credentials...');
try {
  const output = execSync('supabase status --output json').toString();
  const status = JSON.parse(output);
  
  const apiUrl = status.api.url;
  const anonKey = status.api.anon_key;
  const serviceRoleKey = status.api.service_role_key;
  
  if (apiUrl && anonKey && serviceRoleKey) {
    console.log('✅ Supabase credentials retrieved');
    
    // Update .env.local file
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = '';
    
    if (fs.existsSync(envPath)) {
      envContent = fs.readFileSync(envPath, 'utf8');
    }
    
    // Update or add Supabase credentials
    const updateEnvVar = (name, value) => {
      const regex = new RegExp(`^${name}=.*`, 'm');
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, `${name}=${value}`);
      } else {
        envContent += `\n${name}=${value}`;
      }
    };
    
    updateEnvVar('NEXT_PUBLIC_SUPABASE_URL', apiUrl);
    updateEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey);
    updateEnvVar('SUPABASE_SERVICE_ROLE_KEY', serviceRoleKey);
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Updated .env.local with Supabase credentials');
    
    // Apply migrations directly using supabase CLI
    console.log('🚀 Running migrations...');
    
    const migrationsDir = path.join(__dirname, '..', 'lib', 'db', 'migrations');
    const migrationFiles = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();
    
    for (const file of migrationFiles) {
      const filePath = path.join(migrationsDir, file);
      console.log(`📦 Running migration: ${file}...`);
      
      try {
        execSync(`supabase db execute --file ${filePath}`, { stdio: 'inherit' });
        console.log(`✅ Migration ${file} completed successfully!`);
      } catch (error) {
        console.error(`❌ Error running migration ${file}:`, error.message);
      }
    }
    
    console.log('✅ Setup complete!');
  } else {
    console.error('❌ Failed to retrieve Supabase credentials');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to get Supabase status:', error.message);
  process.exit(1);
}