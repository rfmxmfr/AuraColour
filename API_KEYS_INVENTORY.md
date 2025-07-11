# 🔑 AuraColor API Keys & Environment Variables

## Current Environment Variables (.env.local)

### 🗄️ Database & Authentication
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 🤖 AI Services
```bash
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
# GOOGLE_AI_API_KEY=<not_set> (for Genkit - currently disabled)
```

### 💳 Payment Processing
```bash
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
# STRIPE_WEBHOOK_SECRET=<not_set> (needed for webhooks)
```

### 📧 Email Services
```bash
RESEND_API_KEY=re_placeholder_key
```

## Missing Environment Variables

### 🔴 Critical Missing Keys:
```bash
# Stripe Webhooks
STRIPE_WEBHOOK_SECRET=whsec_...

# Google AI (for color analysis)
GOOGLE_AI_API_KEY=AIza...

# Site URL (for webhooks)
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Supabase Service Role (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 🟡 Optional Services:
```bash
# SMS Notifications (Twilio)
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...

# Team Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
```

## API Key Usage by Feature

### 🎨 Color Analysis Engine
- **OpenAI API** - Primary AI analysis
- **Google AI** - Secondary analysis (disabled)
- **Files:** `app/api/ai-compare/route.ts`

### 💰 Payment System
- **Stripe Secret Key** - Server-side payments
- **Stripe Publishable Key** - Client-side checkout
- **Stripe Webhook Secret** - Payment confirmations
- **Files:** `app/api/create-payment/route.ts`, `app/api/webhooks/stripe/route.ts`

### 📧 Email Notifications
- **Resend API** - Transactional emails
- **Files:** `app/api/webhooks/stripe/route.ts`, `app/api/gift-vouchers/route.ts`

### 🗄️ Database Operations
- **Supabase URL** - Database connection
- **Supabase Anon Key** - Client-side auth
- **Supabase Service Key** - Admin operations
- **Files:** `lib/supabase/client.ts`, `lib/supabase/server.ts`

### 📱 SMS Notifications (Optional)
- **Twilio Keys** - SMS alerts
- **Files:** `app/api/test-sms/route.ts`

## Security Notes

### ✅ Properly Configured:
- Supabase keys (public/anon only)
- OpenAI API key
- Stripe test keys

### ⚠️ Needs Attention:
- **Resend API Key** - Using placeholder
- **Stripe Webhook Secret** - Missing
- **Google AI Key** - Not configured
- **Production URLs** - Not set

### 🔒 Security Best Practices:
1. Use test keys in development
2. Rotate keys regularly
3. Set up webhook endpoints
4. Configure CORS properly
5. Use environment-specific keys

## Setup Priority

### 🔴 High Priority:
1. Get real Resend API key
2. Configure Stripe webhook secret
3. Set up Google AI for color analysis
4. Add production site URL

### 🟡 Medium Priority:
1. Twilio for SMS notifications
2. Slack/Discord webhooks
3. Supabase service role key

### 🟢 Low Priority:
1. Additional AI providers
2. Analytics keys
3. CDN configurations