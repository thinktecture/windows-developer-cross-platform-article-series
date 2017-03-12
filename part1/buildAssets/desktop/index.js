const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'web/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  globalShortcut.register('CmdOrCtrl+Shift+i', () => {
    win.webContents.toggleDevTools();
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  globalShortcut.unregisterAll();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
