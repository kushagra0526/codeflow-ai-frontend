# Emergency Vercel Deployment Script
Write-Host "🚀 CodeFlow AI - Emergency Deployment" -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
Write-Host "Checking Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI found: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "📦 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install Vercel CLI" -ForegroundColor Red
        Write-Host "Please run manually: npm install -g vercel" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ Vercel CLI installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Follow the prompts:" -ForegroundColor Yellow
Write-Host "  1. Login with your account" -ForegroundColor White
Write-Host "  2. Press Enter for all questions (use defaults)" -ForegroundColor White
Write-Host "  3. Wait for deployment to complete" -ForegroundColor White
Write-Host ""

# Deploy
vercel --prod

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "🎉 Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "  1. Copy the URL from above" -ForegroundColor White
    Write-Host "  2. Test: Visit URL and sign in with 'tourist'" -ForegroundColor White
    Write-Host "  3. Share the URL with your team" -ForegroundColor White
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "Try deploying via Vercel web UI: https://vercel.com/new" -ForegroundColor Yellow
}
