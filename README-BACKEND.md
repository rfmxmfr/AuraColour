# AuraColour Backend Setup Guide

## 📊 Backend Architecture Overview

The AuraColour application uses a modern serverless architecture with the following components:

### Database Layer (Supabase)
- **PostgreSQL Database** with Row Level Security (RLS)
- **Authentication** via Supabase Auth
- **File Storage** for photos and reports
- **Real-time subscriptions** for live updates

### API Layer (Next.js API Routes)
- **RESTful endpoints** for all business logic
- **Stripe integration** for payments
- **AI services** for color analysis
- **Email notifications** via Resend

## 🗄️ Database Schema

### Core Tables

#### 1. `profiles`
Extends Supabase auth.users with additional profile information.
```sql
- id (UUID, FK to auth.users)
- username (TEXT, unique)
- full_name (TEXT)
- avatar_url (TEXT)
- role (TEXT: 'user', 'admin', 'analyst')
- created_at, updated_at (TIMESTAMP)
```

#### 2. `questionnaire_submissions`
Stores color analysis questionnaire responses.
```sql
- id (UUID, primary key)
- user_id (UUID, FK to profiles)
- name, email, phone (TEXT)
- data (JSONB) - questionnaire responses
- service_type (TEXT)
- payment_status ('pending', 'confirmed', 'failed', 'refunded')
- payment_intent_id (TEXT)
- amount, currency (DECIMAL, TEXT)
- status ('submitted', 'processing', 'completed', 'cancelled')
- created_at, updated_at (TIMESTAMP)
```

#### 3. `contact_submissions`
Contact form submissions from website visitors.
```sql
- id (UUID, primary key)
- name, email, phone (TEXT)
- subject, message (TEXT)
- data (JSONB) - additional form data
- status ('new', 'read', 'replied', 'resolved')
- replied_at, created_at, updated_at (TIMESTAMP)
```

#### 4. `analyst_reports`
Generated color analysis reports.
```sql
- id (UUID, primary key)
- questionnaire_id (UUID, FK)
- analyst_id (UUID, FK to profiles)
- season_analysis (TEXT) - 12-season result
- color_recommendations (TEXT[])
- avoid_colors (TEXT[])
- undertone ('warm', 'cool', 'neutral')
- contrast_level ('low', 'medium', 'high')
- styling_notes, makeup_recommendations (TEXT)
- wardrobe_suggestions, shopping_guide (TEXT)
- confidence_score (INTEGER 0-100)
- ai_analysis (JSONB) - full AI response
- photos_analyzed (TEXT[]) - file paths
- status ('draft', 'completed', 'sent', 'archived')
- created_at, updated_at, sent_at (TIMESTAMP)
```

#### 5. `bookings`
Service appointment scheduling.
```sql
- id (UUID, primary key)
- user_id (UUID, FK to profiles)
- questionnaire_id (UUID, FK)
- service_type (TEXT)
- appointment_date (TIMESTAMP)
- duration_minutes (INTEGER)
- status ('scheduled', 'confirmed', 'completed', 'cancelled')
- notes, meeting_link, location (TEXT)
- created_at, updated_at (TIMESTAMP)
```

#### 6. `payments`
Stripe payment transaction records.
```sql
- id (UUID, primary key)
- questionnaire_id, booking_id (UUID, FK)
- stripe_payment_intent_id (TEXT, unique)
- stripe_customer_id (TEXT)
- amount, currency (DECIMAL, TEXT)
- status ('pending', 'succeeded', 'failed', 'cancelled', 'refunded')
- payment_method, description (TEXT)
- metadata (JSONB)
- created_at, updated_at, paid_at (TIMESTAMP)
```

#### 7. `gift_vouchers`
Gift voucher management system.
```sql
- id (UUID, primary key)
- code (TEXT, unique) - 8-character code
- purchaser_name, purchaser_email (TEXT)
- recipient_name, recipient_email (TEXT)
- amount, currency (DECIMAL, TEXT)
- service_type, message (TEXT)
- status ('active', 'redeemed', 'expired', 'cancelled')
- expires_at, redeemed_at (TIMESTAMP)
- redeemed_by (UUID, FK to profiles)
- payment_id (UUID, FK to payments)
- created_at, updated_at (TIMESTAMP)
```

## 🗂️ Storage Buckets

### 1. `color-analysis-photos`
- **Purpose**: User-uploaded photos for color analysis
- **Access**: Private, users can only access their own photos
- **File Types**: JPEG, PNG, WebP
- **Size Limit**: 10MB per file

### 2. `profile-avatars`
- **Purpose**: User profile pictures
- **Access**: Public read, users can only upload their own
- **File Types**: JPEG, PNG, WebP
- **Size Limit**: 2MB per file

### 3. `reports`
- **Purpose**: Generated PDF reports and HTML exports
- **Access**: Private, users can only access their own reports
- **File Types**: PDF, HTML
- **Size Limit**: 5MB per file

## 🔧 Utility Functions

### Database Functions

#### `generate_voucher_code()`
Generates unique 8-character alphanumeric voucher codes.

#### `get_dashboard_stats(admin_user_id UUID)`
Returns comprehensive dashboard statistics for admin users.

#### `redeem_gift_voucher(voucher_code TEXT, user_id UUID)`
Validates and redeems gift voucher codes.

#### `get_user_analysis_history(user_id UUID)`
Retrieves user's complete color analysis history.

### Database Views

#### `admin_questionnaire_view`
Comprehensive view of all questionnaire submissions with payment and report information for admin dashboard.

#### `user_submissions_view`
User-specific view of their own submissions and reports.

#### `monthly_revenue_stats`
Monthly revenue and payment statistics for analytics.

## 🔐 Security & Permissions

### Row Level Security (RLS)
All tables have RLS enabled with policies for:
- **Users**: Can only access their own data
- **Admins**: Can access all data
- **Analysts**: Can access questionnaires and reports

### API Security
- **Authentication**: Supabase JWT tokens
- **Authorization**: Role-based access control
- **Rate Limiting**: Implemented on sensitive endpoints
- **Input Validation**: Zod schemas for all inputs

## 🚀 API Endpoints

### Core Endpoints
- `POST /api/questionnaire` - Submit color analysis questionnaire
- `GET /api/questionnaire` - Get user's submissions
- `POST /api/contact` - Submit contact form
- `POST /api/color-analysis` - AI color analysis processing
- `POST /api/generate-analysis` - Generate analysis report
- `GET /api/reports/[id]` - Get specific report
- `PUT /api/reports/[id]` - Update report
- `POST /api/reports/[id]/send` - Email report to customer

### Payment Endpoints
- `POST /api/create-payment` - Create Stripe payment intent
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

### Service Endpoints
- `POST /api/12-season-analysis` - 12-season color analysis
- `POST /api/personal-shopping` - Personal shopping service
- `POST /api/style-coaching` - Style coaching service
- `POST /api/virtual-wardrobe` - Virtual wardrobe curation

### Admin Endpoints
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/submissions` - All questionnaire submissions
- `GET /api/admin/contacts` - All contact submissions
- `PUT /api/admin/submissions/[id]` - Update submission status

## 🔧 Setup Instructions

### 1. Database Setup
```bash
# Run the setup script
./setup-supabase.sh

# Or manually apply migrations
supabase db reset
```

### 2. Environment Variables
Create `.env.local` with:
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
```

### 3. Stripe Webhook Setup
1. Create webhook endpoint in Stripe Dashboard
2. Point to: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook secret to environment variables

### 4. AI Service Setup
1. **OpenAI**: Create API key at platform.openai.com
2. **Google AI**: Enable Vertex AI or Gemini API
3. Configure rate limits and usage monitoring

### 5. Email Setup
1. Create Resend account
2. Verify your domain
3. Create API key and add to environment variables

## 📊 Monitoring & Analytics

### Database Monitoring
- Query performance via Supabase dashboard
- Storage usage tracking
- Connection pool monitoring

### API Monitoring
- Response times and error rates
- Rate limiting metrics
- Payment success rates

### Business Metrics
- Conversion rates (questionnaire → payment)
- Customer satisfaction scores
- Revenue analytics
- Service popularity

## 🔄 Data Flow

### Color Analysis Process
1. **User submits questionnaire** → `questionnaire_submissions`
2. **Payment processed** → `payments` table updated
3. **AI analysis triggered** → Color analysis API called
4. **Report generated** → `analyst_reports` created
5. **Report sent** → Email notification via Resend
6. **Files stored** → Supabase Storage buckets

### Admin Workflow
1. **Admin views dashboard** → Aggregated statistics
2. **Reviews submissions** → `admin_questionnaire_view`
3. **Generates/edits reports** → `analyst_reports` CRUD
4. **Sends reports** → Email integration
5. **Manages customers** → User management interface

## 🚨 Error Handling

### Database Errors
- Connection failures → Retry logic
- Constraint violations → User-friendly messages
- RLS policy violations → Access denied responses

### API Errors
- Rate limiting → 429 responses with retry headers
- Authentication failures → 401 responses
- Validation errors → 400 responses with details
- Server errors → 500 responses with error tracking

### Payment Errors
- Failed payments → Update questionnaire status
- Webhook failures → Retry mechanism
- Refund processing → Automated status updates

## 📈 Scaling Considerations

### Database Scaling
- Read replicas for analytics queries
- Connection pooling optimization
- Query optimization and indexing
- Archival strategy for old data

### API Scaling
- Serverless function optimization
- Caching strategies (Redis/Vercel KV)
- CDN for static assets
- Background job processing

### Storage Scaling
- Image optimization and compression
- CDN integration for file delivery
- Automated cleanup of old files
- Backup and disaster recovery

This backend architecture provides a robust, scalable foundation for the AuraColour color analysis platform with comprehensive data management, security, and integration capabilities.