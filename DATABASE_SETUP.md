# Database Setup for AuraColor

This document outlines the database setup process for the AuraColor application.

## Option 1: Using Supabase CLI (Recommended for Development)

### Prerequisites

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Install Docker (required by Supabase CLI)

### Setup Steps

1. Run the Supabase setup script:
   ```bash
   pnpm supabase:setup
   ```

   This script will:
   - Initialize Supabase locally
   - Start Supabase services
   - Update your .env.local with the correct credentials
   - Run database migrations

2. Access the Supabase Studio:
   ```
   http://localhost:54323
   ```

## Option 2: Using Supabase Cloud

### Setup Steps

1. Create a Supabase project at [supabase.com](https://supabase.com/)

2. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

## Database Schema

The database schema is defined in `lib/db/migrations/001_initial_schema.sql` and includes:

- **profiles**: User profiles linked to Supabase auth
- **services**: Available services with pricing
- **questionnaires**: Collections of questions
- **questions**: Individual questions for questionnaires
- **bookings**: Service appointments
- **questionnaire_submissions**: User responses to questionnaires
- **payments**: Payment records
- **file_uploads**: User uploaded files
- **contact_submissions**: Contact form submissions

## Database Utilities

Database utility functions are available in `lib/db/index.ts`:

```typescript
// Client-side functions
import { getServices, getServiceById } from '@/lib/db';

// Server-side functions
import { getServicesServer, getProfileServer } from '@/lib/db';
```

## Troubleshooting

### Migration Errors

If you encounter errors running migrations:

1. Check that your Supabase credentials are correct in `.env.local`
2. Ensure you have the necessary permissions (service role key is required)
3. Try running migrations individually:
   ```bash
   supabase db execute --file lib/db/migrations/001_initial_schema.sql
   supabase db execute --file lib/db/migrations/002_seed_data.sql
   ```

### Connection Issues

If you can't connect to the database:

1. Make sure Supabase is running:
   ```bash
   supabase status
   ```

2. Restart Supabase if needed:
   ```bash
   supabase stop
   supabase start
   ```