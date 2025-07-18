#!/bin/bash

echo "🔧 Setting up development environment for AuraColor"

# Check for Node.js and npm
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js v18 or later."
  echo "   Visit https://nodejs.org/en/download/"
  exit 1
else
  NODE_VERSION=$(node -v)
  echo "✅ Node.js $NODE_VERSION installed"
fi

if ! command -v npm &> /dev/null; then
  echo "❌ npm not found. Please install npm."
  exit 1
else
  NPM_VERSION=$(npm -v)
  echo "✅ npm $NPM_VERSION installed"
fi

# Install pnpm if not installed
if ! command -v pnpm &> /dev/null; then
  echo "📦 Installing pnpm..."
  npm install -g pnpm
  PNPM_VERSION=$(pnpm --version)
  echo "✅ pnpm $PNPM_VERSION installed"
else
  PNPM_VERSION=$(pnpm --version)
  echo "✅ pnpm $PNPM_VERSION already installed"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Create VSCode settings
mkdir -p .vscode
cat > .vscode/settings.json << 'EOF'
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
EOF

cat > .vscode/extensions.json << 'EOF'
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next"
  ]
}
EOF

# Create .env.local from example if it doesn't exist
if [ ! -f .env.local ]; then
  echo "🔑 Creating .env.local from .env.example..."
  cp .env.example .env.local
fi

echo "✅ Development environment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Run './scripts/install-extensions.sh' to install recommended VSCode extensions"
echo "2. Run './scripts/update-env.sh' to update your environment variables"
echo "3. Run 'pnpm dev' to start the development server"