# Development Environment Setup

This document outlines the development environment setup for the AuraColor project.

## Prerequisites

- **Node.js**: v18.0.0 or later
- **npm**: v8.0.0 or later
- **Git**: Latest version recommended

## Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd auracolor
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys and other environment variables.

4. **Run the setup script**

```bash
./setup-dev-environment.sh
```

This script will:
- Check for Node.js and npm
- Install dependencies
- Create VSCode settings
- Set up environment variables

## IDE Setup

### VSCode (Recommended)

The project includes VSCode settings and extension recommendations:

**Recommended Extensions:**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features
- Auto Rename Tag
- Code Spell Checker
- Color Highlight
- ES7+ React/Redux/React-Native snippets
- GitHub Copilot (optional)
- Import Cost

These extensions will be automatically recommended when you open the project in VSCode.

### Configuration Files

- `.vscode/settings.json`: Editor settings
- `.vscode/extensions.json`: Recommended extensions
- `.vscode/launch.json`: Debug configurations
- `.eslintrc.json`: ESLint configuration
- `.prettierrc`: Prettier configuration

## Development Tools

The project includes a development tools script that provides utilities for common tasks:

```bash
# Check environment setup
npm run check-env

# Generate a new component
npm run gen ComponentName [ui|layout|form]
```

## Running the Application

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Format code
npm run format
```

## Debugging

Use the VSCode debug configurations:

1. **Next.js: debug server-side**: Debug server-side code
2. **Next.js: debug client-side**: Debug client-side code in Chrome
3. **Next.js: debug full stack**: Debug both server and client code

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEXT_PUBLIC_SITE_URL`: Site URL (http://localhost:3000 for development)

Optional environment variables:

- `STRIPE_SECRET_KEY`: Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe publishable key
- `RESEND_API_KEY`: Resend API key for email