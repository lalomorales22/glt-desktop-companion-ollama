# Desktop Companion - GLB Avatar with Ollama Chat
<img width="440" height="1777" alt="Screenshot 2025-08-11 at 2 26 16 PM" src="https://github.com/user-attachments/assets/2bf6b01b-207c-46d4-975f-1ba5880b4314" />

A translucent Electron app that displays an interactive 3D avatar on your desktop with Ollama AI chat integration.

## Features

- **Translucent Avatar Window**: Your GLB character appears to live on your desktop with no background
- **Interactive Controls**: Move and animate your avatar with a sleek control panel
- **11 Animations**: idle, walk, run, jump, climb, fall, dive, shoot, slash, hurt, turn
- **Ollama Integration**: Chat with your avatar using any Ollama model
- **Chat Bubbles**: Responses appear in stylish word bubbles above the avatar
- **Model Selection**: Dropdown to choose between installed Ollama models
- **Draggable Avatar**: Click and drag the avatar to reposition on screen

## Prerequisites

1. **Node.js and npm** installed
2. **Ollama** running locally (default: http://localhost:11434)
3. At least one Ollama model installed (e.g., `ollama pull llama2`)

## Installation

```bash
# Install dependencies
npm install

# Start the application
npm start
```

## Usage

1. **Main Avatar Window**: 
   - Shows your 3D character
   - Click and drag to move around the screen
   - Translucent background integrates with your desktop

2. **Control Panel**:
   - **Movement Controls**: Arrow buttons to move the avatar
   - **Action Buttons**: Trigger different animations
   - **Chat Interface**: 
     - Select an Ollama model from the dropdown
     - Type messages and chat with your avatar
     - Responses appear as chat bubbles above the avatar

## Building for Distribution

```bash
# Build for current platform
npm run build

# Build for all platforms
npm run dist
```

## File Structure

- `main.js` - Electron main process
- `index.html` - Avatar window with Three.js rendering
- `control.html` - Control panel window
- `package.json` - Project configuration
- `*.glb` - Your 3D character animation files

## Customization

- Adjust window positions in `main.js`
- Modify avatar scale and lighting in `index.html`
- Customize UI colors and styles in the embedded CSS
- Change chat bubble duration and styling

## Notes

- The avatar window stays on top of other windows
- Both windows close together when the main window is closed
- Chat history is maintained during the session
- Model list refreshes every 30 seconds
