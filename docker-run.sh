#!/bin/bash

echo "🐳 Starting AuraColour in Docker"

# Stop any existing containers
docker-compose down

# Build and start containers
docker-compose up --build -d

# Initialize database
echo "⏳ Waiting for database to be ready..."
sleep 5
docker-compose exec supabase-db psql -U postgres -c "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";"

echo "✅ Setup complete!"
echo "🌐 App should be available at http://localhost:3000"
echo "📊 Database available at localhost:54322"
echo "📝 To view logs: docker-compose logs -f app"