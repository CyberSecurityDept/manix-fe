import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { autoUpdater } from 'electron-updater'

// Deklarasikan mainWindow secara global
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    frame: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      webviewTag: true, // Mengizinkan penggunaan webview
      webSecurity: false,
      fullscreen: true
    }
  })

  // Set Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: http:;",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: http:;",
          "frame-src 'self' https: http:;",
          "img-src 'self' data: https: http:;",
          "style-src 'self' 'unsafe-inline' https: http:;"
        ].join(' ')
      }
    })
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.on('get-asset-path', (event) => {
  event.returnValue =
    process.env.NODE_ENV === 'development'
      ? join(__dirname, '../../src/renderer/src/assets')
      : join(process.resourcesPath, 'assets')
})

// This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
app.whenReady().then(() => {
  // Set app user model id for Windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

//   // Konfigurasi autoUpdater
//   autoUpdater.checkForUpdatesAndNotify()

//   autoUpdater.on('checking-for-update', () => {
//     console.log('Memeriksa pembaruan...')
//     if (mainWindow) {
//       mainWindow.webContents.send('update-status', 'Memeriksa pembaruan...')
//     }
//   })

//   autoUpdater.on('update-available', () => {
//     console.log('Pembaruan tersedia.')
//     if (mainWindow) {
//       mainWindow.webContents.send('update-status', 'Pembaruan tersedia. Mengunduh...')
//     }
//   })

//   autoUpdater.on('update-not-available', () => {
//     console.log('Tidak ada pembaruan tersedia.')
//     if (mainWindow) {
//       mainWindow.webContents.send('update-status', 'Tidak ada pembaruan tersedia.')
//     }
//   })

//   autoUpdater.on('download-progress', (progress) => {
//     console.log(`Progres unduhan: ${progress.percent}%`)
//     if (mainWindow) {
//       mainWindow.webContents.send('update-progress', progress.percent)
//     }
//   })

//   autoUpdater.on('update-downloaded', () => {
//     console.log('Pembaruan telah diunduh.')
//     if (mainWindow) {
//       mainWindow.webContents.send(
//         'update-status',
//         'Pembaruan telah diunduh. Mulai ulang aplikasi untuk menerapkan.'
//       )
//     }
//   })

//   autoUpdater.on('error', (error) => {
//     console.error('Kesalahan selama pembaruan:', error)
//     if (mainWindow) {
//       mainWindow.webContents.send('update-error', error.message)
//     }
//   })
// })

// Restart aplikasi untuk menerapkan pembaruan
ipcMain.on('restart-app', () => {
  autoUpdater.quitAndInstall()
})

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
