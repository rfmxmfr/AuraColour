#!/bin/bash

echo "🏗️ Setting up AuraColor project structure"

# Create core directories
mkdir -p app/api
mkdir -p app/components
mkdir -p app/contexts
mkdir -p app/hooks
mkdir -p app/lib
mkdir -p app/pages
mkdir -p app/styles
mkdir -p app/utils
mkdir -p public/images

# Create essential files
touch app/layout.tsx
touch app/page.tsx
touch app/globals.css

# Create README
cat > README.md << 'EOF'
# AuraColor App

Professional color analysis and styling service platform.

## Project Overview

AuraColor is a B2C service marketplace for personal styling services, offering:

- 12-Season Color Analysis (£75)
- Virtual Wardrobe Curation (£100)
- Personal Shopping Service (£150)
- Style Evolution Coaching (£300)
- Gift Vouchers (From £75)

## Development

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Project Structure

- `app/` - Next.js application
  - `api/` - API routes
  - `components/` - React components
  - `contexts/` - React contexts
  - `hooks/` - Custom React hooks
  - `lib/` - Utility libraries
  - `pages/` - Page components
  - `styles/` - CSS styles
  - `utils/` - Utility functions

## Deployment

The application is deployed on Vercel.

## License

Private - All rights reserved
EOF

# Create basic Next.js config
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
EOF

# Create basic tailwind config
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C3AED',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
EOF

# Create basic tsconfig
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF

# Create basic layout
cat > app/layout.tsx << 'EOF'
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AuraColor - Professional Color Analysis',
  description: 'Discover your optimal color palette with professional color analysis services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
EOF

# Create basic page
cat > app/page.tsx << 'EOF'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold text-center">
        Welcome to <span className="text-primary-600">AuraColor</span>
      </h1>
      <p className="mt-4 text-xl text-center">
        Professional color analysis and styling services
      </p>
    </main>
  );
}
EOF

# Create basic globals.css
cat > app/globals.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --foreground-rgb: 0, 0, 0;
  --background-rgb: 255, 255, 255;
}

body {
  color: rgb(var(--foreground-rgb));
  background: rgb(var(--background-rgb));
}

@layer base {
  h1 {
    @apply text-3xl font-bold;
  }
  h2 {
    @apply text-2xl font-bold;
  }
  h3 {
    @apply text-xl font-bold;
  }
}
EOF

echo "✅ Project structure setup complete!"
echo "🚀 Run './run-dev.sh' to start development"