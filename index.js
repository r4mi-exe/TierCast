const { app, BrowserWindow } = require('electron/main')

var playerWindow;
var menuWindow;

const createMainWindow = () => {
  menuWindow = new BrowserWindow({
    width: 1200,
    height: 800,
  })
  menuWindow.loadFile('menu.html')
}

const createPlayerWindow = () => {
  playerWindow = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true,
  })
  playerWindow.loadFile('player.html')
}

app.whenReady().then(() => {
  createMainWindow()
  //createPlayerWindow()

  // MacOS continues running apps even without any windows open.
  // Activating the app when no windows are open should open a new one.
  
  // Windows cannot be created before the "ready" event, so we should only listen for
  // "activate" events after the app is initialized
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})
// Closes the app for Windows and Linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})