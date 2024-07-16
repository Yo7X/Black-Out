const { app, BrowserWindow, ipcMain, Menu, Tray, dialog} = require('electron')
const path = require('path');
const { preload } = require('react-dom');

let window;
function createBrowserWindow() {
    window = new BrowserWindow({
        title: 'smth',
        width: 500,
        height: 700,
        icon: path.join(__dirname, 'renderer/img/icon.ico'),

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        }
    });

    window.loadFile(path.join(__dirname, 'renderer/index.html'));
};

let coverWindowX;
let coverWindowWidth;
let coverWindow;
function createCoverWindows() {
    coverWindow = new BrowserWindow({
        title: 'smth',
        width: coverWindowWidth,
        height: 10000,
        resizable: false,
        frame: false,
        x: coverWindowX,
        y: 0,
        alwaysOnTop: true,
        icon: path.join(__dirname, 'renderer/img/icon.ico'),
    });

    console.log(`Start: ${coverWindowX}\nwidth: ${coverWindowWidth}`);

    coverWindow.loadFile(path.join(__dirname, 'renderer/cover.html'));
}

ipcMain.on('openCoverWindows', (thing, one, two, three, four, five) => {
    coverWindowX = parseInt(one);
    coverWindowWidth = parseInt(two);
    createCoverWindows()

    if (three == true) {
        console.log('x')
        coverWindowX = parseInt(four);
        coverWindowWidth = parseInt(five);
        createCoverWindows();
    };
});

let menuTemplate = [];

let trayTemplate = [
    {
        label: "Close windows",
        click: () => {
            let windows = BrowserWindow.getAllWindows();
            windows.forEach(instance => {
                if (instance !== window) {
                    instance.close();
                }
            });
        }
    },
    {
        label: "Open settings",
        click: () => {
            createBrowserWindow()
        }
    },
    {
        label: "Quit app",
        click: () => {
            app.quit();
        }
    }
];

app.whenReady().then(() => {
    createBrowserWindow();
    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate));

    const tray = new Tray(path.join(__dirname, 'renderer', 'img', 'trayIcon.ico'));
    tray.setToolTip('Black out');
    tray.setContextMenu(Menu.buildFromTemplate(trayTemplate));
});

app.on("window-all-closed", () => { });