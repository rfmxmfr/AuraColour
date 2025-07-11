#!/bin/bash

echo "🎨 AuraColour Supabase Setup Script"
echo "===================================="
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   brew install supabase/tap/supabase"
    exit 1
fi

echo "✅ Supabase CLI found"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the AuraColour project root directory"
    exit 1
fi

echo "✅ Project directory confirmed"

# Initialize Supabase if not already done
if [ ! -f "supabase/config.toml" ]; then
    echo "🔧 Initializing Supabase project..."
    supabase init
else
    echo "✅ Supabase already initialized"
fi

# Start local Supabase (optional - for development)
echo ""
read -p "🤔 Do you want to start local Supabase for development? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Starting local Supabase..."
    supabase start
    echo ""
    echo "📋 Local Supabase URLs:"
    supabase status
fi

echo ""
echo "🗄️  Database Schema Setup"
echo "========================"

# Check if user wants to apply migrations to local or remote
echo "Where do you want to apply the database schema?"
echo "1) Local development database"
echo "2) Remote Supabase project"
echo "3) Both"
read -p "Choose option (1-3): " choice

case $choice in
    1)
        echo "📤 Applying migrations to local database..."
        supabase db reset
        ;;
    2)
        echo "🌐 Applying migrations to remote database..."
        read -p "Enter your Supabase project reference (from dashboard): " project_ref
        supabase link --project-ref $project_ref
        supabase db push
        ;;
    3)
        echo "📤 Applying migrations to local database..."
        supabase db reset
        echo "🌐 Applying migrations to remote database..."
        read -p "Enter your Supabase project reference (from dashboard): " project_ref
        supabase link --project-ref $project_ref
        supabase db push
        ;;
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac

echo ""
echo "🔐 Environment Variables Setup"
echo "============================="

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    
    if [ -f "supabase/config.toml" ]; then
        # Extract local Supabase URLs if available
        LOCAL_URL=$(grep 'api_url' supabase/config.toml | cut -d'"' -f2 2>/dev/null || echo "http://localhost:54321")
        LOCAL_ANON_KEY=$(supabase status --output json 2>/dev/null | jq -r '.[] | select(.name=="API") | .anon_key' 2>/dev/null || echo "your_local_anon_key")
        
        cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$LOCAL_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$LOCAL_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# For production, replace with your actual Supabase project URLs:
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AI Services
OPENAI_API_KEY=your_openai_api_key
GOOGLE_AI_API_KEY=your_google_ai_api_key

# Email Service
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000
EOF
        
        echo "✅ Created .env.local with local Supabase configuration"
    else
        cp .env.example .env.local 2>/dev/null || echo "⚠️  Please create .env.local manually"
    fi
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "📊 Database Tables Created:"
echo "=========================="
echo "✅ profiles - User profiles and roles"
echo "✅ questionnaire_submissions - Color analysis forms"
echo "✅ contact_submissions - Contact form data"
echo "✅ analyst_reports - Generated color analysis reports"
echo "✅ bookings - Service appointments"
echo "✅ payments - Stripe payment records"
echo "✅ gift_vouchers - Gift voucher management"

echo ""
echo "🗂️  Storage Buckets Created:"
echo "============================"
echo "✅ color-analysis-photos - User uploaded photos"
echo "✅ profile-avatars - User profile pictures"
echo "✅ reports - Generated PDF reports"

echo ""
echo "🔧 Utility Functions Created:"
echo "============================="
echo "✅ generate_voucher_code() - Create unique voucher codes"
echo "✅ get_dashboard_stats() - Admin dashboard statistics"
echo "✅ redeem_gift_voucher() - Voucher redemption"
echo "✅ get_user_analysis_history() - User's analysis history"

echo ""
echo "👀 Database Views Created:"
echo "========================="
echo "✅ admin_questionnaire_view - Admin dashboard data"
echo "✅ user_submissions_view - User's own submissions"
echo "✅ monthly_revenue_stats - Revenue analytics"

echo ""
echo "🎯 Next Steps:"
echo "=============="
echo "1. Update .env.local with your actual API keys"
echo "2. Configure Stripe webhooks in your dashboard"
echo "3. Set up your AI service accounts (OpenAI/Google AI)"
echo "4. Configure Resend for email notifications"
echo "5. Test the application with: npm run dev"

echo ""
echo "🔗 Useful Commands:"
echo "=================="
echo "• View local database: supabase db diff"
echo "• Reset local database: supabase db reset"
echo "• Generate types: supabase gen types typescript --local > types/supabase.ts"
echo "• View logs: supabase logs"
echo "• Stop local services: supabase stop"

echo ""
echo "✅ Supabase setup complete! 🎉"