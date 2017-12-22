const electron = require('electron');

const { ipcRenderer, remote } = electron;

document
    .querySelector('form')
    .addEventListener('submit', function (e) {
        e.preventDefault();

        const price = document.getElementById('input-price');
        ipcRenderer.send('alarm:set', price.value);

        closeWindow();
    });

document
    .getElementById('link-close-window')
    .addEventListener('click', closeWindow);

function closeWindow() {
    remote.getCurrentWindow().close();
}