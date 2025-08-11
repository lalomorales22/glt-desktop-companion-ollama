const { ipcRenderer } = require('electron');

console.log('Preload script loading...');

// Expose API directly to window object when contextIsolation is false
window.electronAPI = {
    // IPC Communication
    sendAction: (action) => ipcRenderer.send('perform-action', action),
    sendMove: (direction) => ipcRenderer.send('move-avatar', direction),
    sendRotate: (direction) => ipcRenderer.send('rotate-avatar', direction),
    sendTyping: () => ipcRenderer.send('show-typing'),
    sendChatResponse: (message) => ipcRenderer.send('chat-response', message),
    moveWindow: (deltaX, deltaY) => ipcRenderer.send('move-window', deltaX, deltaY),
    
    onAction: (callback) => ipcRenderer.on('perform-action', callback),
    onMove: (callback) => ipcRenderer.on('move-avatar', callback),
    onRotate: (callback) => ipcRenderer.on('rotate-avatar', callback),
    onTyping: (callback) => ipcRenderer.on('show-typing', callback),
    onChatResponse: (callback) => ipcRenderer.on('chat-response', callback),
    
    // File operations - delegate to main process
    getGLBPath: () => 'app-directory',
    
    loadGLBFile: async (fileName) => {
        return await ipcRenderer.invoke('load-glb-file', fileName);
    },
    
    // List available GLB files - delegate to main process
    listGLBFiles: async () => {
        return await ipcRenderer.invoke('list-glb-files');
    }
};

console.log('Preload script loaded successfully');