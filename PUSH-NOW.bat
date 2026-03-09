@echo off
echo ========================================
echo   PUSHING TO GITHUB
echo ========================================
echo.

echo Adding GitHub remote...
git remote add origin https://github.com/kushagra0526/codeflow-ai-frontend.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   DONE! Code is on GitHub!
echo ========================================
echo.
echo Now go to: https://vercel.com/new
echo And import: kushagra0526/codeflow-ai-frontend
echo.
pause
