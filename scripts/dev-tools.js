#!/usr/bin/env node

/**
 * Development tools script for AuraColor
 * 
 * This script provides utilities for development tasks:
 * - Checking environment setup
 * - Validating configuration
 * - Generating component templates
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check environment
function checkEnvironment() {
  console.log('🔍 Checking development environment...');
  
  // Check Node.js version
  const nodeVersion = process.version;
  console.log(`Node.js version: ${nodeVersion}`);
  
  // Check npm version
  try {
    const npmVersion = execSync('npm --version').toString().trim();
    console.log(`npm version: ${npmVersion}`);
  } catch (error) {
    console.error('❌ Error checking npm version:', error.message);
  }
  
  // Check for required environment variables
  const requiredEnvVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
  
  if (missingEnvVars.length > 0) {
    console.warn('⚠️ Missing environment variables:');
    missingEnvVars.forEach(envVar => console.warn(`  - ${envVar}`));
    console.warn('Please check your .env.local file');
  } else {
    console.log('✅ All required environment variables are set');
  }
}

// Generate a new component
function generateComponent(name, type = 'ui') {
  if (!name) {
    console.error('❌ Component name is required');
    return;
  }
  
  const componentDir = path.join(process.cwd(), 'components', type);
  const componentPath = path.join(componentDir, `${name}.tsx`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(componentDir)) {
    fs.mkdirSync(componentDir, { recursive: true });
  }
  
  // Check if component already exists
  if (fs.existsSync(componentPath)) {
    console.error(`❌ Component ${name} already exists at ${componentPath}`);
    return;
  }
  
  // Create component file
  const componentContent = `import React from 'react';

interface ${name}Props {
  children?: React.ReactNode;
}

export default function ${name}({ children }: ${name}Props) {
  return (
    <div>
      {children}
    </div>
  );
}
`;
  
  fs.writeFileSync(componentPath, componentContent);
  console.log(`✅ Component ${name} created at ${componentPath}`);
}

// Main function
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'check':
      checkEnvironment();
      break;
    case 'generate':
    case 'gen':
      const type = process.argv[4] || 'ui';
      generateComponent(process.argv[3], type);
      break;
    default:
      console.log(`
AuraColor Development Tools

Usage:
  node scripts/dev-tools.js [command]

Commands:
  check                Check development environment
  generate [name] [type]  Generate a new component (type defaults to 'ui')
      `);
      break;
  }
}

main();