#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 AuraColour Build Error Fix Script');
console.log('=====================================\n');

// Backend Analysis
console.log('📊 BACKEND NEEDS ANALYSIS:');
console.log('==========================');

const backendNeeds = {
  database: {
    supabase: {
      tables: [
        'questionnaire_submissions',
        'contact_submissions', 
        'profiles',
        'analyst_reports',
        'bookings',
        'payments',
        'gift_vouchers'
      ],
      auth: 'Supabase Auth with role-based access',
      storage: 'File uploads for color analysis photos'
    }
  },
  apis: {
    core: [
      '/api/questionnaire - Form submissions',
      '/api/contact - Contact form handling',
      '/api/color-analysis - AI color analysis',
      '/api/generate-analysis - Report generation',
      '/api/reports/[id] - Report management'
    ],
    payments: [
      '/api/create-payment - Stripe integration',
      '/api/webhooks/stripe - Payment webhooks'
    ],
    services: [
      '/api/12-season-analysis',
      '/api/personal-shopping',
      '/api/style-coaching',
      '/api/virtual-wardrobe'
    ]
  },
  integrations: {
    ai: 'Google AI/OpenAI for color analysis',
    email: 'Resend for notifications',
    payments: 'Stripe for processing',
    storage: 'Supabase Storage for images'
  }
};

console.log('Database Tables Required:');
backendNeeds.database.supabase.tables.forEach(table => {
  console.log(`  ✓ ${table}`);
});

console.log('\nAPI Endpoints:');
[...backendNeeds.apis.core, ...backendNeeds.apis.payments, ...backendNeeds.apis.services].forEach(api => {
  console.log(`  ✓ ${api}`);
});

console.log('\nIntegrations:');
Object.entries(backendNeeds.integrations).forEach(([key, value]) => {
  console.log(`  ✓ ${key}: ${value}`);
});

console.log('\n🔧 FIXING BUILD ERRORS:');
console.log('========================\n');

// Fix 1: Update AdminDashboard.tsx interface issue
const adminDashboardPath = './app/admin/components/AdminDashboard.tsx';
if (fs.existsSync(adminDashboardPath)) {
  let content = fs.readFileSync(adminDashboardPath, 'utf8');
  
  // Check if already fixed
  if (!content.includes('contactSubmissions: [],')) {
    console.log('❌ AdminDashboard.tsx needs fixing...');
    
    // Fix the useState initialization
    content = content.replace(
      /const \[dashboardData, setDashboardData\] = useState<DashboardData>\(\{\s*totalRevenue: 0,\s*totalOrders: 0,\s*activeCustomers: 0,\s*conversionRate: 0,\s*orders: \[\],\s*customers: \[\],\s*services: \[\]\s*\}\)/,
      `const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalRevenue: 0,
    totalOrders: 0,
    activeCustomers: 0,
    conversionRate: 0,
    orders: [],
    customers: [],
    services: [],
    contactSubmissions: [],
    monthlyStats: [],
    recentActivity: []
  })`
    );
    
    // Fix the setDashboardData call
    content = content.replace(
      /setDashboardData\(\{\s*totalRevenue,\s*totalOrders: totalBookings,\s*activeCustomers: users\?\.length \|\| 0,\s*conversionRate: 85\.2,\s*orders: bookings \|\| \[\],\s*customers: users \|\| \[\],\s*services: \[\s*\{ title: '12-Season Color Analysis', description: 'Professional color analysis', price: '£75\.00' \}\s*\]\s*\}\)/,
      `setDashboardData({
        totalRevenue,
        totalOrders: totalBookings,
        activeCustomers: users?.length || 0,
        conversionRate: 85.2,
        orders: bookings || [],
        customers: users || [],
        services: [
          { title: '12-Season Color Analysis', description: 'Professional color analysis', price: '£75.00' }
        ],
        contactSubmissions: [],
        monthlyStats: [],
        recentActivity: []
      })`
    );
    
    fs.writeFileSync(adminDashboardPath, content);
    console.log('✅ Fixed AdminDashboard.tsx interface issue');
  } else {
    console.log('✅ AdminDashboard.tsx already fixed');
  }
} else {
  console.log('⚠️  AdminDashboard.tsx not found');
}

// Fix 2: Create next.config.js with webpack configuration for handlebars
const nextConfigPath = './next.config.js';
let nextConfigContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Handle handlebars warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    // Ignore handlebars warnings
    config.ignoreWarnings = [
      /require.extensions is not supported by webpack/,
    ];
    
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['@genkit-ai/core', '@genkit-ai/googleai']
  }
};

module.exports = nextConfig;
`;

if (fs.existsSync(nextConfigPath)) {
  const existingConfig = fs.readFileSync(nextConfigPath, 'utf8');
  if (!existingConfig.includes('ignoreWarnings')) {
    fs.writeFileSync(nextConfigPath, nextConfigContent);
    console.log('✅ Updated next.config.js to handle webpack warnings');
  } else {
    console.log('✅ next.config.js already configured');
  }
} else {
  fs.writeFileSync(nextConfigPath, nextConfigContent);
  console.log('✅ Created next.config.js with webpack configuration');
}

// Fix 3: Check and fix any other route parameter issues
const routeFiles = [
  './app/api/reports/[id]/route.ts',
  './app/api/reports/[id]/send/route.ts'
];

routeFiles.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix GET route parameters
    if (content.includes('{ params }: { params: { id: string } }')) {
      content = content.replace(
        /{ params }: { params: { id: string } }/g,
        '{ params }: { params: Promise<{ id: string }> }'
      );
      
      // Add await params
      content = content.replace(
        /(export async function (?:GET|POST|PUT|DELETE)[^{]*{[^}]*)/,
        '$1\n  const { id } = await params'
      );
      
      // Replace params.id with id
      content = content.replace(/params\.id/g, 'id');
      
      modified = true;
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed route parameters in ${filePath}`);
    }
  }
});

// Fix 4: Ensure all required environment variables are documented
const envExamplePath = './.env.example';
const envExample = `# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# AI Services
OPENAI_API_KEY=your_openai_key
GOOGLE_AI_API_KEY=your_google_ai_key

# Email
RESEND_API_KEY=your_resend_key

# App
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
`;

if (!fs.existsSync(envExamplePath)) {
  fs.writeFileSync(envExamplePath, envExample);
  console.log('✅ Created .env.example with required variables');
}

console.log('\n🎯 BUILD VERIFICATION:');
console.log('======================');

// Run build check
const { execSync } = require('child_process');

try {
  console.log('Running npm run build...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build still has issues. Check the output above.');
  process.exit(1);
}

console.log('\n🚀 NEXT STEPS:');
console.log('===============');
console.log('1. Set up environment variables in .env.local');
console.log('2. Configure Supabase database tables');
console.log('3. Set up Stripe webhooks');
console.log('4. Configure AI service keys');
console.log('5. Test all API endpoints');
console.log('\n✅ All fixes applied successfully!');