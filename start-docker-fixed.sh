#!/bin/bash

echo "🎨 AuraColour Docker Development Setup"
echo "===================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
else
    echo "✅ Docker found"
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose not found. Please install Docker Compose first."
    exit 1
else
    echo "✅ Docker Compose found"
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️ .env.local not found. Creating from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local (please update with your actual API keys)"
fi

# Stop any running containers
echo "🛑 Stopping any running containers..."
docker-compose down

# Build and start Docker containers
echo "🚀 Starting Docker containers..."
docker-compose up -d

# Initialize database if needed
echo "🗄️ Checking if database needs initialization..."
docker-compose exec supabase-db psql -U postgres -c "SELECT 1" > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo "🔧 Initializing database..."
    # Run database setup scripts
    if [ -f ./setup-supabase.sh ]; then
        ./setup-supabase.sh
    else
        echo "⚠️ setup-supabase.sh not found. Database may need manual initialization."
    fi
fi

echo ""
echo "✅ Setup complete! 🎉"
echo ""
echo "📊 Database is available at:"
echo "localhost:54322 (user: postgres, password: postgres)"
echo ""
echo "🌐 Frontend is available at:"
echo "http://localhost:3000"
echo ""
echo "📝 To view logs:"
echo "docker-compose logs -f app"