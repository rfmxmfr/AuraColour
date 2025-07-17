# AuraColour Configuration Guide

This guide provides detailed instructions for configuring the AuraColour platform for different environments and use cases.

## Table of Contents

1. [Environment Configuration](#environment-configuration)
2. [Supabase Configuration](#supabase-configuration)
3. [OpenAI Integration](#openai-integration)
4. [Stripe Configuration](#stripe-configuration)
5. [Email Service Setup](#email-service-setup)
6. [Authentication Settings](#authentication-settings)
7. [Storage Configuration](#storage-configuration)
8. [Deployment Configuration](#deployment-configuration)

## Environment Configuration

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# AI Services
OPENAI_API_KEY=your_openai_key
GOOGLE_AI_API_KEY=your_google_ai_key

# Email
RESEND_API_KEY=your_resend_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AuraColour
NEXT_PUBLIC_SUPPORT_EMAIL=support@auracolour.com
```

### Environment-Specific Configuration

For different environments, create separate environment files:

- `.env.development` - Development environment
- `.env.test` - Testing environment
- `.env.production` - Production environment

## Supabase Configuration

### Project Setup

1. Create a new Supabase project at [https://app.supabase.io](https://app.supabase.io)
2. Get your project URL and API keys from the project settings

### Database Initialization

Run the setup script to initialize the database:

```bash
./setup-supabase.sh
```

This script will:
1. Create all required tables
2. Set up Row Level Security policies
3. Create storage buckets
4. Initialize authentication settings

### Row Level Security Policies

Ensure the following RLS policies are configured:

```sql
-- Allow users to read their own data
CREATE POLICY "Users can view own profiles"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own profiles
CREATE POLICY "Users can update own profiles"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Allow users to read their own submissions
CREATE POLICY "Users can view own submissions"
  ON questionnaire_submissions
  FOR SELECT
  USING (auth.uid() = user_id);
```

### Storage Buckets

Configure the following storage buckets:

1. `profile-photos` - For user profile pictures
2. `analysis-photos` - For color analysis uploads
3. `reports` - For generated PDF reports

Set appropriate bucket policies:

```sql
-- Allow users to upload their own profile photos
CREATE POLICY "Users can upload own profile photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-photos' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

## OpenAI Integration

### API Configuration

1. Create an OpenAI account at [https://platform.openai.com](https://platform.openai.com)
2. Generate an API key
3. Set the `OPENAI_API_KEY` environment variable

### Model Selection

Configure the AI model in `lib/services/openai.ts`:

```typescript
// For production
const MODEL = "gpt-4-vision-preview";

// For development/testing (cheaper)
// const MODEL = "gpt-3.5-turbo";
```

### Rate Limiting

Implement rate limiting for OpenAI API calls:

```typescript
// lib/services/openai.ts
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1m"), // 10 requests per minute
});

export async function analyzeImage(imageUrl: string) {
  const { success } = await ratelimit.limit(
    `openai_${process.env.NODE_ENV}`
  );
  
  if (!success) {
    throw new Error("Rate limit exceeded");
  }
  
  // Proceed with OpenAI API call
}
```

## Stripe Configuration

### Account Setup

1. Create a Stripe account at [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your API keys from the Developers section
3. Set the environment variables:
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

### Webhook Configuration

1. Create a webhook endpoint in the Stripe dashboard
2. Point it to `https://your-domain.com/api/webhooks/stripe`
3. Select the following events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.completed`
4. Get the webhook signing secret and set it as `STRIPE_WEBHOOK_SECRET`

### Product Configuration

Set up your products and prices in the Stripe dashboard:

1. Create products for each service (e.g., "Color Analysis", "Personal Shopping")
2. Set prices for each product
3. Note the product and price IDs for use in your application

## Email Service Setup

### Resend Configuration

1. Create a Resend account at [https://resend.com](https://resend.com)
2. Verify your domain
3. Create an API key
4. Set the `RESEND_API_KEY` environment variable

### Email Templates

Configure email templates in `lib/email-templates.ts`:

```typescript
export const emailTemplates = {
  welcome: {
    subject: "Welcome to AuraColour",
    body: (name: string) => `
      <h1>Welcome to AuraColour, ${name}!</h1>
      <p>Thank you for joining our platform...</p>
    `,
  },
  analysisComplete: {
    subject: "Your Color Analysis is Ready",
    body: (name: string, reportUrl: string) => `
      <h1>Hello ${name},</h1>
      <p>Your color analysis is now complete...</p>
      <a href="${reportUrl}">View Your Report</a>
    `,
  },
  // Add more templates as needed
};
```

## Authentication Settings

### Supabase Auth Configuration

1. In the Supabase dashboard, go to Authentication > Settings
2. Configure the following:
   - Site URL: Your application URL
   - Redirect URLs: Allowed redirect URLs after authentication
   - JWT Expiry: 3600 (1 hour)

### Email Authentication

1. Enable Email authentication in the Supabase dashboard
2. Configure email templates for:
   - Confirmation emails
   - Password reset emails
   - Magic link emails

### Social Authentication (Optional)

To enable social authentication:

1. Create OAuth applications with providers (Google, Facebook, etc.)
2. Configure the credentials in the Supabase dashboard
3. Add the redirect URLs to your OAuth providers

## Storage Configuration

### File Upload Limits

Configure file upload limits in `lib/file-upload.ts`:

```typescript
export const fileUploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/heic'],
  maxFiles: 5,
};
```

### Image Processing

Configure image processing settings:

```typescript
export const imageProcessingConfig = {
  resize: {
    width: 1200,
    height: 1200,
    fit: 'inside',
  },
  compress: {
    quality: 80,
  },
};
```

## Deployment Configuration

### Vercel Deployment

For Vercel deployment:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in the Vercel dashboard
3. Set up the following:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Custom Server Deployment

For custom server deployment:

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

3. Use a process manager like PM2:
   ```bash
   pm2 start npm --name "auracolour" -- start
   ```

### Docker Deployment

Create a `Dockerfile` in the root directory:

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]
```

Build and run the Docker container:

```bash
docker build -t auracolour .
docker run -p 3000:3000 auracolour
```

---

For additional configuration options or troubleshooting, refer to the [Developer Guide](DEVELOPER_GUIDE.md) or contact the development team.