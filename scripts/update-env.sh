#!/bin/bash

echo "🔑 Updating environment variables..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
  echo "Creating .env.local from .env.example..."
  cp .env.example .env.local
fi

# Function to update or add an environment variable
update_env_var() {
  local key=$1
  local value=$2
  local file=".env.local"
  
  # Check if the key exists in the file
  if grep -q "^$key=" "$file"; then
    # Replace the existing value
    sed -i '' "s|^$key=.*|$key=$value|" "$file"
  else
    # Add the key-value pair
    echo "$key=$value" >> "$file"
  fi
}

# Prompt for Supabase credentials
read -p "Enter Supabase URL: " SUPABASE_URL
read -p "Enter Supabase Anon Key: " SUPABASE_ANON_KEY

# Prompt for Stripe credentials
read -p "Enter Stripe Publishable Key (leave empty to skip): " STRIPE_PUBLISHABLE_KEY
read -p "Enter Stripe Secret Key (leave empty to skip): " STRIPE_SECRET_KEY

# Prompt for email service
read -p "Enter Resend API Key (leave empty to skip): " RESEND_API_KEY

# Update .env.local
update_env_var "NEXT_PUBLIC_SUPABASE_URL" "$SUPABASE_URL"
update_env_var "NEXT_PUBLIC_SUPABASE_ANON_KEY" "$SUPABASE_ANON_KEY"

if [ ! -z "$STRIPE_PUBLISHABLE_KEY" ]; then
  update_env_var "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" "$STRIPE_PUBLISHABLE_KEY"
fi

if [ ! -z "$STRIPE_SECRET_KEY" ]; then
  update_env_var "STRIPE_SECRET_KEY" "$STRIPE_SECRET_KEY"
fi

if [ ! -z "$RESEND_API_KEY" ]; then
  update_env_var "RESEND_API_KEY" "$RESEND_API_KEY"
fi

# Set site URL for local development
update_env_var "NEXT_PUBLIC_SITE_URL" "http://localhost:3000"

echo "✅ Environment variables updated successfully!"
echo "You can review and edit them in .env.local"