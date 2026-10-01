const { app, BrowserWindow } = require('electron/main')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // MacOS continues running apps even without any windows open.
  // Activating the app when no windows are open should open a new one.
  
  // Windows cannot be created before the "ready" event, so we should only listen for
  // "activate" events after the app is initialized

  // 
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})
// Closes the app for Windows and Linux
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})