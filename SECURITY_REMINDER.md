# URGENT SECURITY REMINDER

## API Keys Security

API keys and secrets are sensitive credentials that should NEVER be:
- Committed to version control
- Shared in chat messages or emails
- Posted in forums or public repositories
- Included in client-side code

## Immediate Actions Required

If you've accidentally exposed API keys:

1. **Rotate all exposed keys immediately**:
   - Stripe: https://dashboard.stripe.com/apikeys
   - Supabase: https://app.supabase.com/project/_/settings/api
   - OpenAI: https://platform.openai.com/api-keys
   - Google AI: https://console.cloud.google.com/apis/credentials
   - Resend: https://resend.com/api-keys

2. **Check for unauthorized usage**:
   - Review logs and activity in each service dashboard
   - Look for unexpected API calls or charges

3. **Update environment variables**:
   - Replace keys in your .env.local file
   - Update deployment environment variables

## Best Practices

- Use `.env.local` for local development (already in .gitignore)
- Use environment variables in deployment platforms
- Consider using a secrets manager for production
- Never hardcode secrets in your application code
- Implement proper access controls and least privilege

## Environment Variables Setup

```bash
# Create/edit your .env.local file
nano .env.local

# Add your NEW API keys (never reuse compromised keys)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
# etc.
```