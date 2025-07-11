# 🔑 Environment Setup Guide

## Required API Keys Setup

### 1. 📧 Resend (Email Service)
1. Go to [resend.com](https://resend.com)
2. Create account and verify domain
3. Generate API key
4. Replace `re_your_real_resend_key_here` in `.env.local`

### 2. 🤖 Google AI (Color Analysis)
1. Go to [Google AI Studio](https://aistudio.google.com)
2. Create API key
3. Replace `your_google_ai_key_here` in `.env.local`

### 3. 💳 Stripe Webhook Secret
1. Go to Stripe Dashboard → Webhooks
2. Create endpoint: `http://localhost:3000/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret
5. Replace `whsec_your_webhook_secret_here` in `.env.local`

### 4. 🗄️ Supabase Service Role Key
1. Go to Supabase Dashboard → Settings → API
2. Copy "service_role" key (not anon key)
3. Replace `your_service_role_key_here` in `.env.local`

### 5. 🔐 NextAuth Secret
```bash
# Generate random secret
openssl rand -base64 32
```
Replace `your_nextauth_secret_here` in `.env.local`

## Quick Setup Commands

```bash
# 1. Update .env.local with real keys
nano .env.local

# 2. Apply database migrations
supabase db reset

# 3. Test build
npm run build

# 4. Start development
npm run dev
```

## Priority Order
1. ✅ Resend API key (emails)
2. ✅ Google AI key (color analysis) 
3. ✅ Stripe webhook (payments)
4. ✅ Supabase service key (admin)
5. ✅ NextAuth secret (security)