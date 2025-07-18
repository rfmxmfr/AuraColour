#!/usr/bin/env node

/**
 * Frontend Setup Verification Script
 * 
 * This script verifies that all required frontend dependencies are installed
 * and that the build configuration is correct.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const frontendConfig = require('../config/frontend');

// Check package.json for dependencies
console.log('Checking frontend dependencies...');
const packageJson = require('../package.json');
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

// Required dependencies based on configuration
const requiredDeps = {
  'next': true,
  'react': true,
  'react-dom': true,
  'tailwindcss': true,
};

// Check for missing dependencies
const missingDeps = Object.keys(requiredDeps).filter(
  dep => !dependencies[dep] && !devDependencies[dep]
);

if (missingDeps.length > 0) {
  console.error(`Missing dependencies: ${missingDeps.join(', ')}`);
  console.log('Run: npm install --save ' + missingDeps.join(' '));
  process.exit(1);
}

// Verify Next.js configuration
console.log('Verifying Next.js configuration...');
const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
if (!fs.existsSync(nextConfigPath)) {
  console.error('Missing next.config.js');
  process.exit(1);
}

// Verify routing setup
console.log('Verifying routing setup...');
const appDirExists = fs.existsSync(path.join(__dirname, '..', 'app'));
if (!appDirExists) {
  console.error('App directory not found. App Router requires an "app" directory.');
  process.exit(1);
}

// Success
console.log('✅ Frontend framework setup verified successfully!');
console.log(`Framework: ${frontendConfig.framework} ${frontendConfig.version}`);
console.log(`UI Library: ${frontendConfig.ui.library}`);
console.log(`Styling: ${frontendConfig.ui.styling}`);