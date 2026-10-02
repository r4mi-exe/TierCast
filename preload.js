const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    switchToPlayer: () => ipcRenderer.send('switch-to-player')
});