// Module to control application life.
// Module to create native browser window.
const {app, BrowserWindow, dialog, ipcMain, Menu} = require('electron');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  const {dialog} = require('electron') // 加载electron

  // Create the browser window.
  mainWindow = new BrowserWindow({
    // width: 540, 
    // height: 400,
    // resizable: false
  })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })

  // Menu.setApplicationMenu(null); // 取消掉菜单显示


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

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
