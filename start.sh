#!/bin/bash

# TikTok Ads Creative Flow - Quick Start Script
# This script sets up and runs the React application

echo "🚀 TikTok Ads Creative Flow - Setup & Launch"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found. Please run this script from the project root directory."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "🎬 Starting development server..."
echo ""
echo "The app will open in your browser at http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm start
