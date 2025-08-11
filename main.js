const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;
let controlWindow;

function createMainWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    
    mainWindow = new BrowserWindow({
        width: 400,
        height: 800,
        x: 100,
        y: height - 900,
        transparent: true,
        frame: false,
        alwaysOnTop: true,
        hasShadow: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: false,
            webSecurity: false,
            allowRunningInsecureContent: true
        }
    });
    
    // Load the file directly
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
    mainWindow.setIgnoreMouseEvents(false);
    mainWindow.setVisibleOnAllWorkspaces(true);
    
    mainWindow.on('closed', () => {
        mainWindow = null;
        if (controlWindow) {
            controlWindow.close();
        }
    });
}

function createControlWindow() {
    controlWindow = new BrowserWindow({
        width: 500,
        height: 1980,
        x: 50,
        y: 50,
        frame: true,
        resizable: true,
        minWidth: 450,
        minHeight: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false,
            nodeIntegration: false,
            webSecurity: false
        }
    });
    
    controlWindow.loadFile(path.join(__dirname, 'control.html'));
    
    controlWindow.on('closed', () => {
        controlWindow = null;
    });
}

app.whenReady().then(() => {
    createMainWindow();
    createControlWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createMainWindow();
    }
    if (controlWindow === null) {
        createControlWindow();
    }
});

// IPC handlers for communication between windows
ipcMain.on('perform-action', (event, action) => {
    if (mainWindow) {
        mainWindow.webContents.send('perform-action', action);
    }
});

ipcMain.on('move-avatar', (event, direction) => {
    if (mainWindow) {
        mainWindow.webContents.send('move-avatar', direction);
    }
});

ipcMain.on('rotate-avatar', (event, direction) => {
    if (mainWindow) {
        mainWindow.webContents.send('rotate-avatar', direction);
    }
});

ipcMain.on('show-typing', (event) => {
    if (mainWindow) {
        mainWindow.webContents.send('show-typing');
    }
});

ipcMain.on('chat-response', (event, message) => {
    if (mainWindow) {
        mainWindow.webContents.send('chat-response', message);
    }
});

// Handle window movement
ipcMain.on('move-window', (event, deltaX, deltaY) => {
    if (mainWindow) {
        const currentBounds = mainWindow.getBounds();
        mainWindow.setBounds({
            x: currentBounds.x + deltaX,
            y: currentBounds.y + deltaY,
            width: currentBounds.width,
            height: currentBounds.height
        });
    }
});

// Handle serving GLB files
ipcMain.handle('load-glb-file', async (event, fileName) => {
    try {
        const filePath = path.join(__dirname, fileName);
        if (!fs.existsSync(filePath)) {
            const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.glb'));
            return { success: false, error: `File not found: ${fileName}`, availableFiles: files };
        }
        const data = fs.readFileSync(filePath);
        return { 
            success: true, 
            data: data.toString('base64'),
            fileName: fileName,
            size: data.length
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

// Handle listing GLB files
ipcMain.handle('list-glb-files', async (event) => {
    try {
        const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.glb'));
        return files;
    } catch (error) {
        console.error('Error listing GLB files:', error);
        return [];
    }
});