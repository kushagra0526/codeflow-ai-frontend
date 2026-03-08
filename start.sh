#!/bin/bash
# CodeFlow AI - Quick Start Script for Linux/Mac
# This script sets up and runs the frontend application

echo "🚀 CodeFlow AI - Starting Application..."
echo ""

# Check if Node.js is installed
echo "Checking Node.js installation..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Node.js $NODE_VERSION found"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed!"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ npm $NPM_VERSION found"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
else
    echo "✅ Dependencies already installed"
fi

echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local file..."
    cp .env.local.example .env.local
    echo "✅ .env.local created"
    echo "ℹ️  You can edit .env.local to configure API URL"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Starting development server..."
echo "The app will open at http://localhost:3000"
echo ""
echo "📝 Quick Tips:"
echo "  • Sign in with your LeetCode username (no password needed!)"
echo "  • Try usernames like: tourist, Errichto, neal_wu"
echo "  • Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev
