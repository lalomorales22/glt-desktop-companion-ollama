#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Install Express dependencies if needed
if ! npm list express >/dev/null 2>&1; then
    echo "Installing Express dependencies..."
    npm install express cors
fi

# Check if any GLB files exist
echo "Checking for GLB files..."
ls -la *.glb 2>/dev/null || echo "WARNING: No GLB files found in current directory!"
echo ""

# Start the Electron app with Express server
echo "Starting Desktop Companion with Express Server..."
echo "================================================"
echo "The app will:"
echo "1. Start Express server at http://127.0.0.1:3456"
echo "2. Open the avatar window (translucent & draggable)"
echo "3. Open the control panel"
echo ""
echo "Window Controls:"
echo "- Drag the top area of avatar window to move it"
echo "- Click and drag the avatar itself to reposition"
echo ""
echo "To debug GLB loading issues:"
echo "- Press Cmd+Option+I in the avatar window"
echo "- Check the Console tab for errors"
echo ""
echo "Make sure Ollama is running at http://localhost:11434"
echo "================================================"
echo ""

# Start with Express server version
npx electron main-simple.js