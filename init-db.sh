#!/bin/bash

echo "🗄️ Initializing AuraColour database..."

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
docker-compose exec supabase-db pg_isready -U postgres
while [ $? -ne 0 ]; do
  sleep 1
  docker-compose exec supabase-db pg_isready -U postgres
done

# Run initialization script
echo "🔧 Running database initialization script..."
docker-compose exec -T supabase-db psql -U postgres -f - < init-db.sql

echo "✅ Database initialization complete!"