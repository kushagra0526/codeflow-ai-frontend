#!/bin/bash
# Emergency Vercel Deployment Script

echo "🚀 CodeFlow AI - Emergency Deployment"
echo ""

# Check if Vercel CLI is installed
echo "Checking Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install Vercel CLI"
        echo "Please run manually: npm install -g vercel"
        exit 1
    fi
    echo "✅ Vercel CLI installed"
else
    VERCEL_VERSION=$(vercel --version)
    echo "✅ Vercel CLI found: $VERCEL_VERSION"
fi

echo ""
echo "🚀 Deploying to Vercel..."
echo ""
echo "Follow the prompts:"
echo "  1. Login with your account"
echo "  2. Press Enter for all questions (use defaults)"
echo "  3. Wait for deployment to complete"
echo ""

# Deploy
vercel --prod

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "Next steps:"
    echo "  1. Copy the URL from above"
    echo "  2. Test: Visit URL and sign in with 'tourist'"
    echo "  3. Share the URL with your team"
else
    echo ""
    echo "❌ Deployment failed"
    echo "Try deploying via Vercel web UI: https://vercel.com/new"
fi
