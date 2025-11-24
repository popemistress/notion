#!/bin/bash

# Notion Dashboard Setup Script
# This script helps you set up the Notion Dashboard quickly

set -e

echo "🚀 Notion Dashboard Setup"
echo "========================="
echo ""

# Check Node.js version
echo "Checking Node.js version..."
node_version=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$node_version" -lt 18 ]; then
    echo "❌ Error: Node.js 18+ is required. You have $(node -v)"
    exit 1
fi
echo "✅ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
echo "✅ Dependencies installed"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cp .env.example .env.local
    echo "✅ Created .env.local from template"
    echo ""
    echo "⚠️  IMPORTANT: You need to update .env.local with your credentials!"
    echo ""
else
    echo "ℹ️  .env.local already exists, skipping..."
    echo ""
fi

# Generate NEXTAUTH_SECRET if not set
if ! grep -q "NEXTAUTH_SECRET=.*[a-zA-Z0-9]" .env.local; then
    echo "🔐 Generating NEXTAUTH_SECRET..."
    secret=$(openssl rand -base64 32)
    if [ "$(uname)" == "Darwin" ]; then
        # macOS
        sed -i '' "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=$secret/" .env.local
    else
        # Linux
        sed -i "s/NEXTAUTH_SECRET=.*/NEXTAUTH_SECRET=$secret/" .env.local
    fi
    echo "✅ NEXTAUTH_SECRET generated"
    echo ""
fi

# Check if Notion credentials are set
echo "🔍 Checking Notion credentials..."
if grep -q "NOTION_CLIENT_ID=your_notion_client_id_here" .env.local; then
    echo ""
    echo "⚠️  WARNING: You haven't set your Notion credentials yet!"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to https://www.notion.so/my-integrations"
    echo "2. Create a new integration (Public, with Read content capability)"
    echo "3. Copy your Client ID and Client Secret"
    echo "4. Edit .env.local and update:"
    echo "   - NOTION_CLIENT_ID"
    echo "   - NOTION_CLIENT_SECRET"
    echo ""
    echo "Then run: npm run dev"
    echo ""
else
    echo "✅ Notion credentials appear to be set"
    echo ""
    echo "🎉 Setup complete! Run: npm run dev"
    echo ""
fi

echo "📖 For detailed instructions, see QUICKSTART.md"
echo ""
