const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) { app.quit(); }

const createWindow = () => {
  let factor = screen.getPrimaryDisplay().scaleFactor;
  const mainWindow = new BrowserWindow({
    width: screen.getPrimaryDisplay().workArea.width / factor,
    height: screen.getPrimaryDisplay().workArea.height / factor,
    // frame: false,
    webPreferences: {
      // preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      zoomFactor: 1.0 / factor,
    },
  });

  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadFile(path.join(__dirname, "../build/index.html"));

  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// On OS X it's common to re-create a window in the app when the 
// dock icon is clicked and there are no other windows open.
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
