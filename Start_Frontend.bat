@echo off
echo ========================================
echo Starting Neo CareerNest Frontend
echo ========================================
echo.

cd careernest-frontend
set PATH=C:\Program Files\nodejs;%PATH%

echo Starting React development server...
echo Frontend will run on: http://localhost:3000
echo.

call npm run dev

