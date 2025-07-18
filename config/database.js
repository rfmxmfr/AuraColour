/**
 * Database Configuration
 * 
 * This file documents the database technology choices for the AuraColor app.
 */

module.exports = {
  // Database provider
  provider: 'supabase',
  type: 'postgresql',
  
  // Connection
  connection: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  
  // Schema
  schema: {
    tables: [
      'profiles',
      'questionnaire_submissions',
      'contact_submissions',
      'bookings',
      'services',
      'payments',
      'analysis_results'
    ],
    migrations: '/supabase/migrations'
  },
  
  // Security
  security: {
    rowLevelSecurity: true,
    policies: {
      profiles: ['select', 'insert', 'update'],
      questionnaire_submissions: ['insert', 'select'],
      contact_submissions: ['insert', 'select']
    }
  }
};