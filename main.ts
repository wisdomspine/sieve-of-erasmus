const { app, BrowserWindow } = require('electron');

let mainWindow;
function createWindow() {
  mainWindow = new BrowserWindow({
    title: 'Merge Data',
    width: 1320,
    minWidth: 800,
    height: 800,
    minHeight: 740,
    autoHideMenuBar: true,
    enableLargerThanScreen: false,
    fullscreen: true,
  });

  mainWindow.loadFile('dist/sieve-of-erasmus/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
