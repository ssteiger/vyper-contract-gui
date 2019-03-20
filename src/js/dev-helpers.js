const remote = require('electron').remote

// open dev tools on window load
document.addEventListener('DOMContentLoaded', function () {
  remote.BrowserWindow.getFocusedWindow().webContents.openDevTools()
})
