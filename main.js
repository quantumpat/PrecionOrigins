
const path = require("path");
const { app, BrowserWindow } = require("electron");

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1280,
        height: 720,
        autoHideMenuBar: true,
        icon: "logo.png",
        frame: false,
        resizable: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            nodeIntegration: true
        }
    });

    window.loadFile("index.html");

    //window.webContents.openDevTools();
};

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
