#!/usr/bin/env node

/**
 * Environment Setup Script
 * 
 * This script helps set up environment variables for different environments
 * (development, staging, production).
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const envConfig = require('../config/environment');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Get environment from command line argument or prompt
const args = process.argv.slice(2);
const envArg = args.find(arg => arg.startsWith('--env='));
let environment = envArg ? envArg.split('=')[1] : null;

function promptForEnvironment() {
  return new Promise((resolve) => {
    if (environment && ['development', 'staging', 'production'].includes(environment)) {
      resolve(environment);
      return;
    }
    
    console.log(`${colors.blue}Select environment:${colors.reset}`);
    console.log('1. Development');
    console.log('2. Staging');
    console.log('3. Production');
    
    rl.question('Enter choice (1-3): ', (answer) => {
      switch (answer) {
        case '1':
          resolve('development');
          break;
        case '2':
          resolve('staging');
          break;
        case '3':
          resolve('production');
          break;
        default:
          console.log(`${colors.red}Invalid choice. Using development.${colors.reset}`);
          resolve('development');
      }
    });
  });
}

async function setupEnvironment() {
  const env = await promptForEnvironment();
  console.log(`${colors.blue}Setting up ${env} environment...${colors.reset}`);
  
  const envFilePath = path.join(process.cwd(), `.env.${env === 'development' ? 'local' : env}`);
  const envExamplePath = path.join(process.cwd(), '.env.example');
  
  // Check if .env.example exists
  if (!fs.existsSync(envExamplePath)) {
    console.error(`${colors.red}Error: .env.example file not found${colors.reset}`);
    process.exit(1);
  }
  
  // Read .env.example
  const envExample = fs.readFileSync(envExamplePath, 'utf8');
  
  // Create or update environment file
  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, envExample);
    console.log(`${colors.green}Created ${envFilePath}${colors.reset}`);
  } else {
    console.log(`${colors.yellow}File ${envFilePath} already exists${colors.reset}`);
  }
  
  console.log(`${colors.blue}Please update the environment variables in ${envFilePath}${colors.reset}`);
  console.log(`${colors.green}Environment setup complete!${colors.reset}`);
  
  rl.close();
}

setupEnvironment();