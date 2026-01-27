@echo off
REM TikTok Ads Creative Flow - Quick Start Script for Windows
REM This script sets up and runs the React application

echo.
echo ===================================================
echo  TikTok Ads Creative Flow - Setup and Launch
echo ===================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js found
for /f "tokens=*" %%i in ('node --version') do echo     Version: %%i

for /f "tokens=*" %%i in ('npm --version') do echo [OK] npm Version: %%i
echo.

REM Check if package.json exists
if not exist "package.json" (
    echo ERROR: package.json not found.
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo [*] Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [OK] Dependencies installed successfully!
echo.
echo [*] Starting development server...
echo.
echo The app will open in your browser at http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

call npm start
