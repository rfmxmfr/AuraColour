# AuraColor Development Setup Instructions

## Quick Start

1. **Install Node.js and npm**
   - Download from [nodejs.org](https://nodejs.org/) (v18+ recommended)

2. **Run the setup script**
   ```bash
   ./setup-dev-environment.sh
   ```
   This will automatically install pnpm if it's not already installed.

3. **Install VSCode extensions**
   ```bash
   ./scripts/install-extensions.sh
   ```

4. **Update environment variables**
   ```bash
   ./scripts/update-env.sh
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

## Required API Keys

You'll need to set up the following services and obtain API keys:

### Supabase (Required)
1. Create a project at [supabase.com](https://supabase.com/)
2. Get your project URL and anon key from the API settings
3. Add them to your `.env.local` file

### Stripe (Optional)
1. Create an account at [stripe.com](https://stripe.com/)
2. Get your publishable and secret keys
3. Add them to your `.env.local` file

### Resend (Optional)
1. Create an account at [resend.com](https://resend.com/)
2. Get your API key
3. Add it to your `.env.local` file

## Manual Setup

If you prefer to set up manually:

1. **Install pnpm**
   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env.local
   ```

4. **Edit environment variables**
   Open `.env.local` and add your API keys

5. **Install VSCode extensions manually**
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - TypeScript and JavaScript Language Features