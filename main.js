
const path = require("path");
const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        icon: "icons/logo.png",
        frame: false,
        resizable: false,
        fullscreen: false,
        fullscreenable: true,
        webPreferences: {
            preload: path.join(__dirname, "./preload.js"),
            nodeIntegration: true
        }
    });

    win.setBackgroundColor("black");

    win.loadFile("./index.html");

    win.webContents.openDevTools();


    win.webContents.on("console-message", function(event, type, message) {

        if (message === "fullscreen-on") {
            win.fullScreen = true;
        }else if (message === "fullscreen-off") {
            win.fullScreen = false;
        }

    });
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});