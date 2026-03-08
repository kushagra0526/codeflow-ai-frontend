@echo off
echo ========================================
echo   DEPLOYING TO VERCEL - STEP BY STEP
echo ========================================
echo.

echo Step 1: Installing Vercel CLI...
call npm install -g vercel
echo.

echo Step 2: Logging into Vercel...
echo (This will open your browser)
call vercel login
echo.

echo Step 3: Deploying to production...
call vercel --prod
echo.

echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Your live URL will be shown above!
echo.
pause
