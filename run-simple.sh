#!/bin/bash

echo "🚀 Starting AuraColour with minimal setup"

# Stop any existing containers
docker-compose down

# Build and start containers
docker-compose up --build

echo "✅ App should be running at http://localhost:3000"