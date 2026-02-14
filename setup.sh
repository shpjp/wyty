#!/bin/bash

# DSA TypeMaster Setup Script
# This script helps you set up the development environment

echo "🚀 DSA TypeMaster Setup"
echo "======================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ Error: .env file not found!"
    echo "Please copy .env.example to .env and configure your database"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env; then
    echo "❌ Error: DATABASE_URL not found in .env"
    exit 1
fi

echo "✅ Environment file found"
echo ""

# Generate Prisma Client
echo "📦 Generating Prisma Client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi
echo "✅ Prisma Client generated"
echo ""

# Push schema to database
echo "🗄️  Pushing database schema..."
npm run db:push
if [ $? -ne 0 ]; then
    echo "❌ Failed to push database schema"
    echo "Make sure your DATABASE_URL is correct and database is accessible"
    exit 1
fi
echo "✅ Database schema created"
echo ""

# Seed database
echo "🌱 Seeding database with DSA problems..."
npm run db:seed
if [ $? -ne 0 ]; then
    echo "❌ Failed to seed database"
    exit 1
fi
echo "✅ Database seeded with 6 problems"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Run 'npm run dev' to start the development server"
echo "Then visit http://localhost:3000"
