#!/usr/bin/env node

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

async function testDatabaseConnection() {
  console.log('🔍 Testing Supabase Database Connection');
  console.log('======================================\n');

  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined in .env.local');
    }
    
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined in .env.local');
    }

    console.log(`Supabase URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}`);
    console.log('Attempting to connect to Supabase...');

    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Test connection by querying a table
    console.log('Testing query to profiles table...');
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);

    if (error) {
      throw new Error(`Database query failed: ${error.message}`);
    }

    console.log('✅ Database connection successful!');
    console.log(`Retrieved ${data.length} records from profiles table`);
    
    // Test other tables
    const tables = ['questionnaire_submissions', 'contact_submissions'];
    for (const table of tables) {
      console.log(`\nTesting query to ${table} table...`);
      const { data, error } = await supabase
        .from(table)
        .select('id')
        .limit(1);
      
      if (error) {
        console.log(`❌ Query to ${table} failed: ${error.message}`);
      } else {
        console.log(`✅ Query to ${table} successful, found ${data.length} records`);
      }
    }

  } catch (error) {
    console.log(`❌ Database connection test failed: ${error.message}`);
  }
}

// Run the test
testDatabaseConnection().catch(console.error);