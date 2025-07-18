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

# Start Supabase
echo "🚀 Starting Supabase..."
supabase start

# Build and start Docker containers
echo "🚀 Starting Docker containers..."
docker-compose up --build

echo ""
echo "✅ Setup complete! 🎉"
echo ""
echo "📊 Supabase Studio is available at:"
echo "http://localhost:54323"
echo ""
echo "🌐 Frontend is available at:"
echo "http://localhost:3000"