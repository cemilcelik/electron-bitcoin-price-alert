const electron = require('electron');
const path = require('path');
const url = require('url');

const { app, BrowserWindow, Menu, shell, ipcMain } = electron;

let indexWindow;

app.on('ready', function() {
    indexWindow = new BrowserWindow({
        width: 1024,
        height: 768
    });

    indexWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file',
        slashes: true
    }));

    indexWindow.toggleDevTools();

    indexWindow.on('close', function() {
        app.quit();
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

const menuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Exit',
                accelerator: 'Ctrl+W',
                click() {
                    app.quit();
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Help',
                accelerator: 'F1',
                click() {
                    shell.openExternal('http://google.com');
                }
            }
        ]
    } 
];

ipcMain.on('alarm:set', function(e, arg) {
    indexWindow.webContents.send('alarm:set', arg);
});