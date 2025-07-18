#!/bin/bash

echo "🐳 Starting AuraColour in Docker with Unicode fix"

# Stop any existing containers
docker-compose down

# Build and start containers with rebuild
docker-compose up --build -d

echo "✅ Setup complete!"
echo "🌐 App should be available at http://localhost:3000"
echo "📝 To view logs: docker-compose logs -f app"