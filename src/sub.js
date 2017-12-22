const electron = require('electron');

const { ipcRenderer, remote } = electron;

document
    .querySelector('form')
    .addEventListener('submit', function (e) {
        e.preventDefault();

        const price = document.getElementById('input-price');
        ipcRenderer.send('alarm:set', price.value);

        const window = remote.getCurrentWindow();
        window.close();
    });