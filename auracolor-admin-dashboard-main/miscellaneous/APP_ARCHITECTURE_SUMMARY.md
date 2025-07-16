# 🎨 AuraColor App Architecture & User Journey

## 🏗️ System Architecture

### **Tech Stack**
- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe
- **AI:** OpenAI + Google AI (Genkit)
- **Email:** Resend
- **Storage:** Supabase Storage

### **App Structure**
```
app/
├── page.tsx                    # Landing page
├── layout.tsx                  # Root layout
├── questionnaire/              # Color analysis form
├── services/                   # Service offerings
├── results/[id]/              # Analysis results
├── admin/                     # Admin dashboard
├── api/                       # Backend endpoints
└── components/                # Reusable UI components
```

## 🎯 Core Functionalities

### **1. Color Analysis Engine**
- **12-Season Analysis** - Advanced color categorization
- **AI-Powered Analysis** - OpenAI integration for photo analysis
- **Photo Processing** - Upload and analyze user photos
- **Confidence Scoring** - Analysis accuracy measurement

### **2. Service Offerings**
- **12-Season Color Analysis** (£75) - Personal color palette
- **Virtual Wardrobe Curation** (£100) - Wardrobe optimization
- **Personal Shopping Service** (£150) - Guided shopping
- **Style Evolution Coaching** (£300) - Complete makeover
- **Gift Vouchers** (£75) - Flexible gift options

### **3. User Management**
- **Authentication** - Supabase Auth with email/password
- **User Profiles** - Personal information storage
- **Session Management** - Secure user sessions
- **Admin Dashboard** - User and booking management

### **4. Payment System**
- **Stripe Integration** - Secure payment processing
- **Webhook Handling** - Payment confirmation
- **Email Notifications** - Payment confirmations
- **Booking Management** - Service scheduling

### **5. Content Management**
- **Dynamic Results** - Personalized color analysis
- **Photo Upload** - Supabase Storage integration
- **Email Templates** - Automated notifications
- **Multi-language** - i18next internationalization

## 👤 User Journey Flow

### **Primary Journey: Color Analysis**

```
🏠 Landing Page
    ↓
📝 Take Quiz (Questionnaire)
    ├── Q1: Skin Tone (6 options)
    ├── Q2: Hair Color (8 options)  
    ├── Q3: Eye Color (6 options)
    ├── Q4: Style Preference (6 options)
    └── Q5: Photo Upload (3 photos)
    ↓
💳 Payment (Stripe Checkout)
    ↓
⏳ Processing (AI Analysis)
    ↓
📧 Email Notification
    ↓
🎨 Results Page (Color Palette + Recommendations)
```

### **Secondary Journeys**

**Service Browse:**
```
🏠 Landing → 🛍️ Services → 📝 Questionnaire → 💳 Payment
```

**Contact Inquiry:**
```
🏠 Landing → 📧 Contact Form → ✅ Confirmation
```

**Admin Management:**
```
🔐 Admin Login → 📊 Dashboard → 👥 User Management → 📈 Analytics
```

## 🔧 API Endpoints

### **Public Routes**
- `GET /` - Landing page
- `GET /services` - Service listings
- `GET /about` - About page
- `POST /api/contact` - Contact form

### **Protected Routes**
- `GET /questionnaire` - Color analysis form
- `POST /api/questionnaire` - Submit questionnaire
- `POST /api/upload` - Photo upload
- `POST /api/create-payment` - Payment processing
- `GET /results/[id]` - View results

### **Admin Routes**
- `GET /admin` - Admin dashboard
- `GET /api/bookings` - Booking management
- `POST /api/reports/[id]/send` - Send results

### **AI Processing**
- `POST /api/color-analysis` - Basic analysis
- `POST /api/12-season-analysis` - Advanced analysis
- `POST /api/ai-compare` - Multi-AI comparison

## 📊 Database Schema

### **Core Tables**
```sql
users (id, email, created_at)
profiles (user_id, full_name, phone, preferences)
questionnaire_responses (user_id, skin_tone, eye_color, hair_color, photos)
analysis_results (user_id, season_type, color_palette, recommendations)
payments (user_id, stripe_payment_id, amount, status)
bookings (user_id, service_type, status, scheduled_date)
```

## 🎨 UI Components Architecture

### **Atomic Design Pattern**
```
components/
├── atoms/           # Basic elements (Button, Icon)
├── molecules/       # Component combinations (ServiceDropdown)
├── organisms/       # Complex components (Navigation)
└── ui/             # Reusable UI components
```

### **Key Components**
- **ColorAnalysisHero** - Landing page hero section
- **BookingModal** - Service booking interface
- **MultiplePhotoUpload** - Photo upload component
- **ProgressIndicator** - Questionnaire progress
- **AdminDashboard** - Admin management interface

## 🔄 Data Flow

### **1. User Registration**
```
User Input → Supabase Auth → Session Token → Protected Access
```

### **2. Questionnaire Submission**
```
Form Data → Validation → Database Storage → Analysis Queue
```

### **3. Photo Processing**
```
File Upload → Supabase Storage → URL Generation → AI Analysis
```

### **4. AI Analysis**
```
User Data + Photos → OpenAI API → Color Analysis → Results Storage
```

### **5. Payment Processing**
```
Stripe Checkout → Webhook → Database Update → Email Notification
```

## 🚀 Key Features

### **✅ Currently Working**
- Landing page with hero section
- Service listings and descriptions
- Questionnaire flow (5 steps)
- Photo upload functionality
- Payment integration (Stripe)
- Email notifications
- Admin dashboard
- User authentication

### **🔧 Needs Configuration**
- AI analysis (missing API keys)
- Email service (placeholder key)
- Webhook endpoints
- Production deployment

### **📈 Performance Features**
- Next.js Image optimization
- Static page generation
- Component lazy loading
- Responsive design
- Progressive Web App ready

The app is a comprehensive color analysis platform with a complete user journey from questionnaire to personalized results, built with modern web technologies and ready for production deployment.