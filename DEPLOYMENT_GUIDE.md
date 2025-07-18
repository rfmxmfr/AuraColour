# AuraColour Deployment Guide

This guide provides instructions for deploying the AuraColour application locally for testing both the frontend and backend.

## Option 1: Standard Local Deployment

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase CLI (`brew install supabase/tap/supabase` on macOS)
- API keys for required services

### Steps

1. **Clone the repository (if you haven't already)**
   ```bash
   git clone <repository-url>
   cd AuraColour-Working-App
   ```

2. **Run the setup script**
   ```bash
   ./setup-local.sh
   ```
   
   This script will:
   - Check for and install Supabase CLI if needed
   - Start a local Supabase instance
   - Apply database migrations
   - Install project dependencies

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Supabase Studio: http://localhost:54323

## Option 2: Docker Deployment

### Prerequisites
- Docker and Docker Compose
- Supabase CLI

### Steps

1. **Run the Docker setup script**
   ```bash
   ./start-docker.sh
   ```
   
   This script will:
   - Start Supabase locally
   - Build and start the Docker containers

2. **Access the application**
   - Frontend: http://localhost:3000
   - Supabase Studio: http://localhost:54323

## Testing Your Setup

Run the test script to verify your setup:

```bash
node test-setup.js
```

This will check:
- Environment variables
- Supabase connection
- Next.js server status

## Environment Variables

Make sure your `.env.local` file includes the following variables:

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Stripe (test keys)
STRIPE_SECRET_KEY=<your-stripe-secret-key>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
STRIPE_WEBHOOK_SECRET=<your-webhook-secret>

# AI Services
OPENAI_API_KEY=<your-openai-api-key>
GOOGLE_AI_API_KEY=<your-google-ai-api-key>

# Email
RESEND_API_KEY=<your-resend-api-key>

# App
NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

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

### Docker Issues
If you encounter Docker issues:

```bash
docker-compose down
docker-compose up --build
```

## Stopping Services

### Standard Deployment
To stop the Next.js server:
```bash
# Press Ctrl+C in the terminal where it's running
```

To stop Supabase:
```bash
supabase stop
```

### Docker Deployment
To stop all containers:
```bash
docker-compose down
```