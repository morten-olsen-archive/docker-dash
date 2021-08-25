import { app, BrowserWindow } from 'electron';

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    height: 480,
    width: 800,
    fullscreen: true,
    kiosk: true,
  });

  mainWindow.loadFile('../frontend/index.html')
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
