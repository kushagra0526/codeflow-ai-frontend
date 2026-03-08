# CodeFlow AI - Quick Start Script for Windows
# This script sets up and runs the frontend application

Write-Host "🚀 CodeFlow AI - Starting Application..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "✅ Dependencies already installed" -ForegroundColor Green
}

Write-Host ""

# Check if .env.local exists
if (-Not (Test-Path ".env.local")) {
    Write-Host "⚙️  Creating .env.local file..." -ForegroundColor Yellow
    Copy-Item ".env.local.example" ".env.local"
    Write-Host "✅ .env.local created" -ForegroundColor Green
    Write-Host "ℹ️  You can edit .env.local to configure API URL" -ForegroundColor Cyan
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Cyan
Write-Host "The app will open at http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Quick Tips:" -ForegroundColor Yellow
Write-Host "  • Sign in with your LeetCode username (no password needed!)" -ForegroundColor White
Write-Host "  • Try usernames like: tourist, Errichto, neal_wu" -ForegroundColor White
Write-Host "  • Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host ""

# Start the development server
npm run dev
