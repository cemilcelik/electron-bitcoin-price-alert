const electron = require('electron');
const path = require('path');
const url = require('url');
const axios = require('axios');

const { ipcRenderer } = electron;
const { BrowserWindow, shell, app } = electron.remote;

let setAlarmWindow;

const notification = {
    title: 'Bitcoin Price Alert',
    body: 'Price limit exeeded. Please check in.',
    icon: path.join(__dirname, '../assets/images/icon-bitcoin.png')
}

document
    .getElementById('link-set-alarm')
    .addEventListener('click', function() {
        setAlarmWindow = new BrowserWindow({
            width: 600,
            height: 400,
            transparent: true,
            alwaysOnTop: true,
            frame: false
        });

        setAlarmWindow.loadURL(url.format({
            pathname: path.join(__dirname, 'sub.html'),
            protocol: 'file',
            slashes: true
        }));

        setAlarmWindow.on('close', function() {
            setAlarmWindow = null;
        });

        if (process.env.NODE_ENV == 'development') {
            setAlarmWindow.toggleDevTools();
        }
    });

document
    .getElementById('link-quit-program')
    .addEventListener('click', function() {
        app.quit();
    });

setInterval(updateCryptoCompare, 6000);
// setTimeout(updateCryptoCompare, 6000);

function updateCryptoCompare() {
    axios
        .get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,EUR')
        .then((response, reject) => {
            const usd = Number(response.data.USD).toLocaleString('en');
            const eur = Number(response.data.EUR).toLocaleString('en');
            
            document.getElementById('usd').innerText = usd;
            document.getElementById('eur').innerText = eur;

            const el = document.getElementById('alarm-price');
            if (usd > el.innerText) {
                const myNotification = new Notification(notification.title, notification);
            }
        });
}

ipcRenderer.on('alarm:set', function(e, arg) {
    const el = document.getElementById('alarm-price');
    el.innerText = Number(arg).toLocaleString('en');
});