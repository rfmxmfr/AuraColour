# 🎨 AuraColour - AI-Powered Color Analysis Platform

A comprehensive color analysis platform that uses AI to determine personal color palettes and provide styling recommendations.

## ✨ Features

### 🤖 AI Color Analysis
- **OpenAI GPT-4 Vision** integration for advanced image analysis
- **12-Season Color Analysis** with confidence scoring
- **Undertone Detection** (warm, cool, neutral)
- **Personalized Color Recommendations**

### 💼 Business Management
- **Admin Dashboard** with comprehensive analytics
- **Customer Management** system
- **Booking & Appointment** scheduling
- **Payment Processing** via Stripe
- **Email Notifications** via Resend

### 🗄️ Database & Storage
- **Supabase Backend** with PostgreSQL
- **File Storage** for photos and reports
- **Row Level Security** for data protection
- **Real-time Updates** and subscriptions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Stripe account (for payments)
- OpenAI API key
- Resend account (for emails)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/auracolour.git
   cd auracolour
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Set up database**
   ```bash
   ./setup-supabase.sh
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables
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

## 📊 Database Schema

### Core Tables
- **profiles** - User management with roles
- **questionnaire_submissions** - Color analysis forms
- **contact_submissions** - Contact form data
- **analyst_reports** - Generated analysis reports
- **bookings** - Appointment scheduling
- **payments** - Stripe transactions
- **gift_vouchers** - Voucher management

## 🎯 API Endpoints

### Core APIs
- `POST /api/questionnaire` - Submit color analysis form
- `POST /api/color-analysis` - AI color analysis
- `POST /api/contact` - Contact form submission
- `POST /api/create-payment` - Stripe payment creation
- `GET /api/reports/[id]` - Get analysis report

### Admin APIs
- `GET /api/admin/dashboard` - Dashboard statistics
- `GET /api/admin/submissions` - All submissions
- `PUT /api/admin/submissions/[id]` - Update submission

## 🔐 Authentication

### User Roles
- **User** - Standard customer access
- **Admin** - Full system access
- **Analyst** - Report management access

### Login
- Admin login: `/login`
- User authentication via Supabase Auth
- Role-based access control

## 💳 Payment Integration

### Stripe Setup
1. Create Stripe account
2. Get API keys (test/live)
3. Set up webhooks
4. Configure environment variables

### Supported Features
- One-time payments
- Multiple currencies (GBP, USD)
- Webhook handling
- Refund management

## 📧 Email System

### Resend Integration
- Automated customer emails
- Admin notifications
- Report delivery
- Contact form responses

## 🧪 Testing

### End-to-End Testing
```bash
npm run test:e2e
```

### Manual Testing
```bash
node test-e2e.js
```

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Setup
1. Set production environment variables
2. Configure Supabase for production
3. Set up Stripe webhooks
4. Configure domain and CORS

## 📁 Project Structure

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

## 🛠️ Development

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Tailwind CSS for styling

### Database Management
- Supabase CLI for migrations
- Row Level Security policies
- Automated backups
- Performance monitoring

## 📈 Analytics

### Dashboard Metrics
- Total revenue
- Customer count
- Conversion rates
- Monthly statistics

### Business Intelligence
- Customer behavior tracking
- Service popularity
- Revenue analytics
- Performance metrics

## 🔒 Security

### Data Protection
- Row Level Security (RLS)
- JWT authentication
- Input validation
- XSS protection
- SQL injection prevention

### File Security
- Type validation
- Size limits
- Secure storage
- Access controls

## 📦 Enhanced Packages

The application has been enhanced with the following packages:

- **@tanstack/react-query** - For efficient data fetching with caching
- **@stripe/react-stripe-js** - For React components that integrate with Stripe
- **@heroicons/react** - For high-quality SVG icons
- **jotai** - For lightweight global state management
- **react-dropzone** - For enhanced file upload functionality

See [PACKAGES_GUIDE.md](PACKAGES_GUIDE.md) for usage details.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Add tests
5. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- Documentation: [README-BACKEND.md](README-BACKEND.md)
- Issues: GitHub Issues
- Email: support@auracolour.com

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI models
- [ ] Multi-language support
- [ ] Affiliate program
- [ ] API marketplace
- [ ] White-label solutions

---

Built with ❤️ using Next.js, Supabase, and OpenAI