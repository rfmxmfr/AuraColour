# AuraColour Local Development Guide

This guide will help you set up and run the AuraColour application locally for testing both the frontend and backend.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase CLI installed (`brew install supabase/tap/supabase` on macOS)
- API keys for:
  - Stripe (test mode)
  - OpenAI
  - Google AI (optional)
  - Resend (for email functionality)

## Quick Setup

1. **Run the setup script**

   ```bash
   ./setup-local.sh
   ```

   This script will:
   - Check for and install Supabase CLI if needed
   - Start a local Supabase instance
   - Apply database migrations
   - Install project dependencies

2. **Update environment variables**

   Edit `.env.local` with your actual API keys:
   - Stripe test keys
   - OpenAI API key
   - Resend API key (for email functionality)
   - Google AI API key (optional)

3. **Start the development server**

   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:3000

## Manual Setup

If you prefer to set up manually or if the script doesn't work for you:

1. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

2. **Start Supabase locally**

   ```bash
   supabase start
   ```

3. **Apply database migrations**

   ```bash
   supabase db reset
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

## Accessing Local Services

- **Frontend Application**: http://localhost:3000
- **Supabase Studio**: http://localhost:54323
- **Supabase API**: http://localhost:54321

## Testing Stripe Integration

1. Install the Stripe CLI: https://stripe.com/docs/stripe-cli
2. Forward webhook events to your local server:

   ```bash
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
   ```

3. Use Stripe test cards for payment testing:
   - Success: 4242 4242 4242 4242
   - Decline: 4000 0000 0000 0002

## Troubleshooting

### Database Issues

If you encounter database issues:

```bash
supabase db reset
```

### Dependency Issues

If you encounter dependency issues:

```bash
rm -rf node_modules
npm install --legacy-peer-deps
```

### API Key Issues

Ensure all API keys in `.env.local` are valid and have the correct permissions.

## Working with Supabase

### Accessing Supabase Studio

Open http://localhost:54323 in your browser to access the Supabase Studio interface.

### Database Schema

The main tables in the application are:
- `profiles` - User profiles and roles
- `questionnaire_submissions` - Color analysis forms
- `contact_submissions` - Contact form data
- `analyst_reports` - Generated color analysis reports
- `bookings` - Service appointments
- `payments` - Stripe payment records
- `gift_vouchers` - Gift voucher management

### Storage Buckets

- `color-analysis-photos` - User uploaded photos
- `profile-avatars` - User profile pictures
- `reports` - Generated PDF reports

## Stopping Local Services

When you're done with development:

```bash
supabase stop
```

This will stop the local Supabase services.