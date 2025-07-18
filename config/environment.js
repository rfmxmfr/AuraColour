/**
 * Environment Configuration
 * 
 * This file documents the environment configuration for the AuraColor app.
 */

module.exports = {
  // Environment types
  environments: {
    development: {
      url: 'http://localhost:3000',
      debug: true,
      logLevel: 'debug'
    },
    staging: {
      url: 'https://staging.auracolor.com',
      debug: true,
      logLevel: 'info'
    },
    production: {
      url: 'https://auracolor.com',
      debug: false,
      logLevel: 'error'
    }
  },
  
  // Environment variables
  variables: {
    // Supabase
    'NEXT_PUBLIC_SUPABASE_URL': 'Supabase project URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': 'Supabase anonymous key',
    'SUPABASE_SERVICE_ROLE_KEY': 'Supabase service role key',
    
    // Stripe
    'STRIPE_SECRET_KEY': 'Stripe secret key',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': 'Stripe publishable key',
    'STRIPE_WEBHOOK_SECRET': 'Stripe webhook secret',
    
    // Email
    'RESEND_API_KEY': 'Resend API key',
    
    // App
    'NEXT_PUBLIC_SITE_URL': 'Site URL'
  },
  
  // Logging configuration
  logging: {
    levels: ['debug', 'info', 'warn', 'error'],
    sanitize: true,
    contexts: ['APP', 'API', 'AUTH', 'DB', 'PAYMENT']
  }
};