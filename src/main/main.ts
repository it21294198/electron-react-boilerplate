/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import fs from 'fs'
import { app, BrowserWindow, shell, ipcMain,dialog } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

// Getting Database functions from class
import Database from './db';
const db = new Database('./database.db');

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

ipcMain.handle('getauser', async (event, arg) => {
  try {
    const result = await db.getAUser(arg);
    return result
  } catch (error) {
    console.error('Error handling get-a-user:', error.message);
    // You might want to handle the error in an appropriate way
    return null;
  }
});

ipcMain.on('test', async (event,arg) => {
  console.log('Get all users')
  console.log(arg)
  db.getAllUsers((rows: any) => {
    event.reply('test', rows);
  });
});

ipcMain.on('save-file', (event, { fileName, content }) => {
  const uploadDir = path.join(__dirname, 'uploads');
  const filePath = path.join(uploadDir, fileName);

  // Check if the 'uploads' directory exists, create it if not
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  fs.writeFile(filePath, Buffer.from(content), (err) => {
    if (err) {
      console.error('Error writing file:', err);
    } else {
      console.log('######### File saved successfully:', filePath);
    }
  });
});

import fsPromises from 'fs/promises';

ipcMain.on('read-file', async (event, arg) => {
  const filePath = '/Users/rusira/Documents/codes/Electron/your-project-name/src/main/uploads/image.png';
  try {
    const imageBuffer = await fsPromises.readFile(filePath);
    const imageBase64 = imageBuffer.toString('base64');
    console.log(imageBase64)
    event.reply('read-file-response', { content: imageBase64 });
  } catch (error) {
    console.error('Error reading file:', error);
    event.reply('read-file-error', `Error reading file: ${error.message}`);
  }
});

ipcMain.on('deleteFile', (event, fileNumber) => {
  const filePath = path.join(__dirname, '..', 'main', 'uploads', `image${fileNumber}.png`);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      event.reply('deleteFileResponse', { success: false, error: err.message });
    } else {
      console.log('File deleted successfully');
      event.reply('deleteFileResponse', { success: true });
    }
  });
});

ipcMain.on('getFilesCount', (event) => {
  const absoluteFolderPath = path.join(__dirname, '..', 'main', 'uploads');

  fs.readdir(absoluteFolderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      event.reply('getFilesCountResponse', { success: false, error: err.message });
    } else {
      const fileCount = files.length;
      console.log(`Number of files in ${absoluteFolderPath}: ${fileCount}`);
      event.reply('getFilesCountResponse', { success: true, fileCount });
    }
  });
});

ipcMain.on('store-file', async (event,arg) => {
  console.log(arg)
  fs.writeFileSync('/Users/rusira/Documents/codes/Electron/your-project-name/file.txt','hello test')
});

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
  console.log('###############################');
  console.log(db);
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

  export default db;