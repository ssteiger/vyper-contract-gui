// https://github.com/electron-userland/electron-compile#how-does-it-work-slightly-harder-way
path = require('path')

let appRoot = path.join(__dirname, '../')
require('electron-compile').init(appRoot, require.resolve('./main'))

const { app, BrowserWindow } = require('electron')

app.on('window-all-closed', function () {
  app.quit()
})

app.on('ready', function () {
  let gui = new BrowserWindow({ height: 700, width: 1000, resizable: true })
  gui.loadURL('file://' + __dirname + '/index.html')

  gui.on('closed', function () {
    app.quit()
  })
})
