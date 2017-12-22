const electron = require('electron');
const path = require('path');
const url = require('url');

const { ipcRenderer } = electron;
const { BrowserWindow, shell } = electron.remote;

let setAlarmWindow;

document
    .getElementById('link-set-alarm')
    .addEventListener('click', function() {
        setAlarmWindow = new BrowserWindow({
            width: 600,
            height: 400
        });

        setAlarmWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'sub.html'),
            protocol: 'file',
            slashes: true
        }));

        setAlarmWindow.on('close', function() {
            setAlarmWindow = null;
        });

        setAlarmWindow.toggleDevTools();
    });

ipcRenderer.on('alarm:set', function(e, arg) {
    const el = document.getElementById('alarm-price');
    el.innerText = Number(arg).toLocaleString('en');
});