#!/bin/bash

echo "🎨 AuraColour Unified Deployment Script"
echo "====================================="
echo ""

# Function to display usage
show_usage() {
  echo "Usage: ./run.sh [option]"
  echo ""
  echo "Options:"
  echo "  local    - Standard local deployment (default)"
  echo "  docker   - Docker-based deployment"
  echo "  test     - Run setup test only"
  echo "  help     - Show this help message"
  echo ""
}

# Parse command line arguments
DEPLOY_TYPE="local"
if [ $# -gt 0 ]; then
  case "$1" in
    local)
      DEPLOY_TYPE="local"
      ;;
    docker)
      DEPLOY_TYPE="docker"
      ;;
    test)
      DEPLOY_TYPE="test"
      ;;
    help)
      show_usage
      exit 0
      ;;
    *)
      echo "❌ Unknown option: $1"
      show_usage
      exit 1
      ;;
  esac
fi

# Check for required tools
check_requirements() {
  echo "🔍 Checking requirements..."
  
  # Check for Node.js
  if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
  else
    NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
    if [ "$NODE_VERSION" -lt 18 ]; then
      echo "❌ Node.js 18+ required. Found version: $(node -v)"
      exit 1
    else
      echo "✅ Node.js $(node -v) found"
    fi
  fi
  
  # Check for npm
  if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
  else
    echo "✅ npm $(npm -v) found"
  fi
  
  # Check for Supabase CLI
  if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    if command -v brew &> /dev/null; then
      brew install supabase/tap/supabase
    else
      echo "❌ Homebrew not found. Please install Supabase CLI manually."
      exit 1
    fi
  else
    echo "✅ Supabase CLI found"
  fi
  
  # Check for Docker if using docker deployment
  if [ "$DEPLOY_TYPE" = "docker" ]; then
    if ! command -v docker &> /dev/null; then
      echo "❌ Docker not found. Please install Docker first."
      exit 1
    else
      echo "✅ Docker found"
    fi
    
    if ! command -v docker-compose &> /dev/null; then
      echo "❌ Docker Compose not found. Please install Docker Compose first."
      exit 1
    else
      echo "✅ Docker Compose found"
    fi
  fi
}

# Setup environment
setup_environment() {
  echo ""
  echo "🔧 Setting up environment..."
  
  # Check if .env.local exists
  if [ ! -f .env.local ]; then
    echo "⚠️ .env.local not found. Creating from template..."
    cp .env.example .env.local 2>/dev/null || echo "❌ Failed to create .env.local"
    echo "⚠️ Please update .env.local with your actual API keys."
  else
    echo "✅ .env.local file found"
  fi
  
  # Install dependencies
  echo "📦 Installing dependencies..."
  npm install --legacy-peer-deps
}

# Start Supabase
start_supabase() {
  echo ""
  echo "🚀 Starting Supabase..."
  
  # Check if Supabase is already running
  if supabase status &> /dev/null; then
    echo "✅ Supabase is already running"
  else
    supabase start
  fi
  
  # Apply database migrations
  echo "📤 Applying database migrations..."
  supabase db reset
}

# Run test script
run_tests() {
  echo ""
  echo "🧪 Running setup tests..."
  node test-setup.js
}

# Main execution based on deployment type
check_requirements

case "$DEPLOY_TYPE" in
  local)
    setup_environment
    start_supabase
    run_tests
    
    echo ""
    echo "🚀 Starting Next.js development server..."
    npm run dev
    ;;
    
  docker)
    setup_environment
    start_supabase
    
    echo ""
    echo "🚀 Starting Docker containers..."
    docker-compose up --build
    ;;
    
  test)
    setup_environment
    start_supabase
    run_tests
    ;;
esac

echo ""
echo "✅ Deployment complete! 🎉"
echo ""
echo "📊 Access URLs:"
echo "- Frontend: http://localhost:3000"
echo "- Supabase Studio: http://localhost:54323"