#!/bin/bash

echo "🧹 Cleaning up codebase for rebuild"

# Create backup directory
BACKUP_DIR="pre-rebuild-backup-$(date +%Y%m%d)"
mkdir -p $BACKUP_DIR

# Backup current files
echo "📦 Creating backup in $BACKUP_DIR"
cp -r app components hooks lib $BACKUP_DIR/
cp package.json $BACKUP_DIR/

# Remove problematic files and directories
echo "🗑️ Removing problematic files"
rm -rf eslint-fixes-backup
rm -rf dangerous-patterns-backup
rm -rf xss-fixes-backup
rm -rf manual-fixes

# Clean Docker files
echo "🐳 Cleaning Docker files"
rm -f docker-compose.yml
rm -f Dockerfile.dev
rm -f .env.docker
rm -f run-docker-fixed.sh
rm -f start-docker-fixed.sh
rm -f docker-run.sh
rm -f run-simple.sh
rm -f init-db.sh
rm -f fix-unicode-regex.js
rm -f fix-zod.sh

# Create clean Docker setup
echo "🔧 Creating clean Docker setup"
cat > docker-compose.yml << 'EOF'
version: '3'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_SITE_URL=http://localhost:3000
EOF

cat > Dockerfile.dev << 'EOF'
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Start development server
CMD ["npm", "run", "dev"]
EOF

# Create clean package.json with fixed dependencies
echo "📦 Updating package.json"
cat > package.json.new << 'EOF'
{
  "name": "auracolor-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-slot": "^1.0.2",
    "@stripe/react-stripe-js": "^2.4.0",
    "@stripe/stripe-js": "^2.3.0",
    "@supabase/auth-ui-react": "^0.4.7",
    "@supabase/supabase-js": "^2.39.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.309.0",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-dropzone": "^14.2.3",
    "react-hook-form": "^7.49.3",
    "resend": "^2.1.0",
    "stripe": "^14.12.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "zod": "3.20.2"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^18.2.47",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.0.4",
    "postcss": "^8.4.33",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.3.3"
  }
}
EOF
mv package.json.new package.json

# Create clean run script
echo "🚀 Creating clean run script"
cat > run-dev.sh << 'EOF'
#!/bin/bash

echo "🚀 Starting AuraColor development environment"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Start development server
echo "🌐 Starting development server..."
npm run dev
EOF
chmod +x run-dev.sh

echo "✅ Cleanup complete! Ready for rebuild."
echo "📋 Original files backed up to $BACKUP_DIR"
echo "🚀 Run './run-dev.sh' to start development"