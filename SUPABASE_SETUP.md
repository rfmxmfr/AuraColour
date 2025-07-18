# Supabase Setup Guide

This guide provides step-by-step instructions for setting up Supabase for the AuraColor app.

## Prerequisites

1. **Install Docker**
   - Required for running Supabase locally
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)

2. **Install Supabase CLI**
   ```bash
   # Using npm
   npm install -g supabase
   
   # Using Homebrew (macOS)
   brew install supabase/tap/supabase
   ```

## Automatic Setup

Run the provided setup script:

```bash
pnpm supabase:setup
```

This script will:
1. Initialize Supabase locally
2. Start Supabase services
3. Update your `.env.local` with the correct credentials
4. Run database migrations

## Manual Setup

### 1. Initialize Supabase

```bash
supabase init
```

### 2. Start Supabase

```bash
supabase start
```

### 3. Apply Migrations

```bash
supabase db reset
```

### 4. Get Supabase Credentials

```bash
supabase status
```

Add the credentials to your `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## Accessing Supabase Studio

After starting Supabase, you can access the Studio UI at:

```
http://localhost:54323
```

## Database Schema

The database schema includes:

- **profiles**: User profiles linked to Supabase auth
- **services**: Available services with pricing
- **questionnaires**: Collections of questions
- **questions**: Individual questions for questionnaires
- **bookings**: Service appointments
- **questionnaire_submissions**: User responses to questionnaires
- **payments**: Payment records
- **file_uploads**: User uploaded files
- **contact_submissions**: Contact form submissions

## Troubleshooting

### Common Issues

1. **Port conflicts**
   - If you see errors about ports being in use, make sure no other services are using ports 54321-54326
   - Try stopping and restarting Supabase: `supabase stop && supabase start`

2. **Docker issues**
   - Ensure Docker is running
   - Try restarting Docker

3. **Database connection issues**
   - Check your `.env.local` file for correct credentials
   - Verify Supabase is running: `supabase status`

### Useful Commands

```bash
# Stop Supabase
supabase stop

# Reset database (caution: deletes all data)
supabase db reset

# View logs
supabase logs

# Execute SQL directly
supabase db execute --file path/to/sql/file.sql
```