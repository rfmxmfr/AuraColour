# AuraColour Developer Guide

This guide provides technical information for developers working on the AuraColour platform. It covers architecture, setup, development workflows, and best practices.

## Architecture Overview

AuraColour is built using the following technology stack:

- **Frontend**: Next.js with React and TypeScript
- **Backend**: Next.js API routes (serverless functions)
- **Database**: PostgreSQL via Supabase
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage
- **AI Integration**: OpenAI GPT-4 Vision
- **Payment Processing**: Stripe
- **Email Service**: Resend

### System Architecture Diagram

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Next.js    │────▶│  API Routes │────▶│  Supabase   │
│  Frontend   │     │  (Backend)  │     │  Database   │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │
       │                   │                   │
       ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│             │     │             │     │             │
│  Supabase   │     │  OpenAI     │     │  Stripe     │
│  Auth       │     │  API        │     │  Payments   │
│             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
```

## Development Environment Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Supabase CLI
- PostgreSQL (for local development)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/auracolour.git
   cd auracolour
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. Set up Supabase locally:
   ```bash
   npx supabase start
   ```

5. Run database migrations:
   ```bash
   ./setup-supabase.sh
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── components/        # React components
│   └── (auth)/            # Authentication pages
├── lib/                   # Utility libraries
│   ├── supabase/         # Database client
│   ├── services/         # Business logic
│   └── utils/            # Helper functions
├── supabase/             # Database migrations
├── components/           # Shared components
└── public/              # Static assets
```

## Key Development Workflows

### Authentication Flow

1. User signs up/logs in via Supabase Auth
2. JWT token is stored in cookies
3. Middleware validates token on protected routes
4. Role-based access control determines permissions

### Color Analysis Flow

1. User submits questionnaire (`/api/questionnaire`)
2. User uploads photos (`/api/upload`)
3. Analysis is triggered (`/api/generate-analysis`)
4. OpenAI processes images and questionnaire data
5. Results are stored in database
6. User is notified when analysis is complete

### Payment Processing Flow

1. User selects a service
2. Payment intent is created (`/api/create-payment`)
3. User completes payment via Stripe Elements
4. Stripe webhook confirms payment (`/api/webhooks/stripe`)
5. Service is marked as paid and activated

## Database Schema

### Core Tables

#### profiles
```sql
create table profiles (
  id uuid references auth.users primary key,
  email text unique not null,
  full_name text,
  role text default 'user',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

#### questionnaire_submissions
```sql
create table questionnaire_submissions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  answers jsonb not null,
  created_at timestamp with time zone default now()
);
```

#### analyst_reports
```sql
create table analyst_reports (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  questionnaire_id uuid references questionnaire_submissions(id),
  season text,
  undertone text,
  palette jsonb,
  recommendations jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## API Integration

### OpenAI Integration

```typescript
// lib/services/openai.ts
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function analyzeImage(imageUrl: string, questionnaireData: any) {
  try {
    const response = await openai.createCompletion({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this person's coloring for seasonal color analysis." },
            { type: "image_url", image_url: { url: imageUrl } }
          ],
        },
      ],
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw error;
  }
}
```

### Stripe Integration

```typescript
// lib/services/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function createPaymentIntent(amount: number, currency: string, customerId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      automatic_payment_methods: { enabled: true },
    });
    
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}
```

## Testing

### Unit Testing

We use Jest for unit testing:

```bash
npm run test
```

Example test:

```typescript
// __tests__/services/colorAnalysis.test.ts
import { determineColorSeason } from '../../lib/services/colorAnalysis';

describe('Color Analysis Service', () => {
  test('should determine correct season based on parameters', () => {
    const result = determineColorSeason({
      skinTone: 'fair',
      hairColor: 'blonde',
      eyeColor: 'blue',
      veins: 'blue',
    });
    
    expect(result.season).toBe('Summer');
    expect(result.undertone).toBe('cool');
  });
});
```

### End-to-End Testing

We use Playwright for E2E testing:

```bash
npm run test:e2e
```

## Deployment

### Production Deployment

1. Ensure all tests pass:
   ```bash
   npm run test && npm run test:e2e
   ```

2. Build the application:
   ```bash
   npm run build
   ```

3. Deploy to production:
   ```bash
   # If using Vercel
   vercel --prod
   
   # If using AWS
   ./deploy-aws.sh
   ```

### Environment Configuration

Ensure the following environment variables are set in production:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `RESEND_API_KEY`

## Best Practices

### Code Style

- Follow ESLint rules defined in `.eslintrc.js`
- Use TypeScript for type safety
- Follow the component structure guidelines
- Use React hooks for state management

### Security

- Never store API keys in client-side code
- Use Row Level Security in Supabase
- Validate all user inputs
- Implement proper error handling
- Use HTTPS for all API calls

### Performance

- Optimize image uploads
- Use React.memo for expensive components
- Implement proper caching strategies
- Use incremental static regeneration where appropriate

## Troubleshooting

### Common Issues

1. **Supabase Connection Issues**
   - Check your environment variables
   - Verify your IP is whitelisted
   - Test connection with `npx supabase db ping`

2. **OpenAI API Errors**
   - Verify API key is valid
   - Check rate limits
   - Ensure image format is supported

3. **Stripe Integration Problems**
   - Use test mode for development
   - Verify webhook is properly configured
   - Check for currency mismatches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

---

For additional support, contact the development team at dev@auracolour.com