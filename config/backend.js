/**
 * Backend Framework Configuration
 * 
 * This file documents the backend technology choices for the AuraColor app.
 */

module.exports = {
  // Runtime environment
  runtime: 'node',
  version: '18.x',
  
  // API framework
  framework: 'next-api',
  apiVersion: '1.0',
  
  // API structure
  structure: {
    type: 'rest',
    basePath: '/api',
    versioning: false
  },
  
  // Middleware (already configured)
  middleware: [
    'cors',
    'validation',
    'xss-protection',
    'session'
  ]
};