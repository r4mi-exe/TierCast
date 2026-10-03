const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('path');

var playerWindow;
var menuWindow;

const createMainWindow = () => {
  menuWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });
  menuWindow.loadFile('menu.html');
}

const createPlayerWindow = () => {
  playerWindow = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    frame: false,
    alwaysOnTop: true,
    show: false
  }) 
  playerWindow.loadFile('player.html');
}

app.whenReady().then(() => {
  ipcMain.on('switch-to-player', () => {
    menuWindow.hide();
    playerWindow.show();
  });

  createMainWindow();
  createPlayerWindow();



  // MacOS continues running apps even without any windows open.
  // Activating the app when no windows are open should open a new one.
  
  // Windows cannot be created before the "ready" event, so we should only listen for
  // "activate" events after the app is initialized
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
      createPlayerWindow();
    }
  });
})
// Closes the app for Windows and Linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});