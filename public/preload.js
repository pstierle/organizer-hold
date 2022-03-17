const { contextBridge } = require('electron');
const { shell, dialog, app, getCurrentWindow } = require('@electron/remote');
const currentWindow = getCurrentWindow();
const path = require("path")
const fs = require("fs");
var PDFDocument = require('pdfkit');

contextBridge.exposeInMainWorld(
  'WIN',
  {
    close: () => {
      currentWindow.close();
    },
    minimize: () => {
      currentWindow.minimize();
    },
    maximize: () => {
      if (!currentWindow.isMaximized()) {
        currentWindow.maximize();
      } else {
        currentWindow.unmaximize();
      }
    },
    reload: () => {
      currentWindow.reload();
    },
    openDevTools: () => {
      currentWindow.webContents.openDevTools();
    }
  }
)

contextBridge.exposeInMainWorld(
  'shell',
  {
    openPath: (path) => {
      shell.openPath(path);
    }
  }
)

contextBridge.exposeInMainWorld(
  'pdf',
  {
    create: async (pathArray, destinationPath) => {
      var doc = new PDFDocument();

      for (let i = 0; i < pathArray.length; i++) {
        const stats = fs.statSync(pathArray[i])
        const width = stats.size.width;
        const height = stats.size.height;

        doc.image(pathArray[i], {
          fit: [width, height],
          x: 0,
          y: 0
        });

        doc.page.width = width;
        doc.page.height = height;

        if (pathArray.length - i > 1) doc.addPage();
      }

      doc.pipe(fs.createWriteStream(destinationPath));
      doc.end();

      return true;
    }
  }
)

contextBridge.exposeInMainWorld(
  'dialog',
  {
    getSelectedFilePath: async (options) => {
      let filePath = "";
      await dialog.showOpenDialog(options).then(async (response) => {
        if (!response.canceled) {
          filePath = response.filePaths[0];
        }
      });

      return filePath;
    },
    minimize: () => {
      currentWindow.minimize();
    },
    maximize: () => {
      currentWindow.maximize();
    }
  }
)

contextBridge.exposeInMainWorld(
  'path',
  {
    join: (...args) => {
      return path.join(...args);
    },
  }
)

contextBridge.exposeInMainWorld(
  'app',
  {
    getPath: () => {
      // need to go back one dir  
      return app.getPath("userData");
    },
    getVersion: () => {
      return app.getVersion()
    },
  }
)

contextBridge.exposeInMainWorld(
  'fs',
  {
    existsSync: (path) => {
      return fs.existsSync(path);
    },
    mkdirSync: (path) => {
      return fs.mkdirSync(path);
    },
    writeFileSync: (path, data) => {
      return fs.writeFileSync(path, data);
    },
    readFileSync: (path) => {
      return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' });
    },
    rmdir: (path) => {
      fs.rmdir(path, { recursive: true });
    },
    rename: (oldPath, newPath) => {
      fs.rename(oldPath, newPath);
    },
    deleteFile: (path) => {
      fs.unlink(path);
    },
    copyFile: (filePath, destinationPath) => {
      fs.copyFile(filePath, destinationPath);
    },
    getFileSize: (path) => {
      const stats = fs.statSync(path);
      const { size } = stats;
      const i = Math.floor(Math.log(size) / Math.log(1024));
      return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    },
  }
)
