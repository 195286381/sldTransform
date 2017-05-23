const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron');
const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  const {dialog} = require('electron') // 加载electron

  mainWindow = new BrowserWindow({
    // width: 540,
    // height: 400,
    // resizable: false
  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {

    mainWindow = null
  })

  // 监听弹出文件夹输入框输入
  ipcMain.on('popDirInputDiaLog', function(event, args) {
    dialog.showOpenDialog({properties: ['openDirectory']}, function(fileDir) {
      event.sender.send('getDirPath', fileDir)
    })
  });

  // 监听弹出文件输入框输入
  ipcMain.on('popFileInputDiaLog', function(event, args) {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [
        {
          name: '输入要转换的CSV文件',
          extensions: ['csv']
        }
      ]
    }, function(filePath) {
      event.sender.send('getFilePath', filePath)
    })
  });
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {

  if (mainWindow === null) {
    createWindow()
  }
})

