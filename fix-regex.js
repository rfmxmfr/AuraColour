#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Function to recursively find files
function findFiles(dir, pattern, callback) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        // Skip node_modules and .next directories to avoid unnecessary processing
        if (file.name !== 'node_modules' && file.name !== '.next') {
          findFiles(filePath, pattern, callback);
        }
      } else if (pattern.test(file.name)) {
        callback(filePath);
      }
    });
  });
}

// Function to fix the file
function fixFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Replace problematic regex pattern
    const fixedData = data
      .replace(/\\p{\s*Extended_Pictographic\s*}/g, '[\\u{1F300}-\\u{1F5FF}\\u{1F900}-\\u{1F9FF}\\u{1F600}-\\u{1F64F}\\u{1F680}-\\u{1F6FF}\\u{2600}-\\u{26FF}\\u{2700}-\\u{27BF}]')
      .replace(/\\p{\s*Emoji_Component\s*}/g, '[\\u{1F1E6}-\\u{1F1FF}\\u{1F3FB}-\\u{1F3FF}\\u{FE0F}\\u{E0020}-\\u{E007F}]');

    if (data !== fixedData) {
      fs.writeFile(filePath, fixedData, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file ${filePath}:`, err);
          return;
        }
        console.log(`✅ Fixed: ${filePath}`);
      });
    }
  });
}

// Main function
function main() {
  console.log('🔍 Searching for files with problematic regex patterns...');
  
  // Find JavaScript and TypeScript files
  findFiles('.', /\.(js|jsx|ts|tsx)$/, (filePath) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return;
      }
      
      // Check if file contains the problematic pattern
      if (data.includes('Extended_Pictographic') || data.includes('Emoji_Component')) {
        console.log(`🔧 Fixing: ${filePath}`);
        fixFile(filePath);
      }
    });
  });
}

main();