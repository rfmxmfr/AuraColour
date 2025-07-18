const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), debug: process.env.DEBUG });

async function testSetup() {
  console.log('🧪 Testing AuraColour Setup');
  console.log('==========================');
  
  // Check environment variables
  console.log('\n📋 Checking environment variables:');
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
    'OPENAI_API_KEY',
    'RESEND_API_KEY'
  ];
  
  let allEnvVarsPresent = true;
  
  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      console.log(`✅ ${envVar} is set`);
    } else {
      console.log(`❌ ${envVar} is missing`);
      allEnvVarsPresent = false;
    }
  }
  
  if (!allEnvVarsPresent) {
    console.log('\n⚠️ Some environment variables are missing. Please check your .env.local file.');
  }
  
  // Test Supabase connection
  console.log('\n📡 Testing Supabase connection:');
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
    
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    
    if (error) {
      console.log(`❌ Supabase connection failed: ${error.message}`);
    } else {
      console.log('✅ Supabase connection successful');
    }
  } catch (error) {
    console.log(`❌ Supabase connection failed: ${error.message}`);
  }
  
  // Check if Next.js is running
  console.log('\n🌐 Checking if Next.js server is running:');
  try {
    const response = await fetch('http://localhost:3000/api/health');
    if (response.ok) {
      console.log('✅ Next.js server is running');
    } else {
      console.log('❌ Next.js server is not running or health endpoint is not available');
    }
  } catch (error) {
    console.log('❌ Next.js server is not running');
  }
  
  console.log('\n🏁 Setup test completed');
}

testSetup().catch(console.error);