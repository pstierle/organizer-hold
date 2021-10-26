const { contextBridge, remote } = require('electron');
const shell = remote.shell;
const dialog = remote.dialog;
const app = remote.app;
const currentWindow = remote.getCurrentWindow();
const path = require("path")
const fs = require("fs");

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
      // const doc = new PDFDocument();

      // pathArray.forEach(async (path) => {
      //    doc.image(path, 0, 0, {
      //      width: 100,
      //      height: 100, 
      //    }) 
      // })
        
      // doc.pipe(fs.createWriteStream(destinationPath));

      return false;
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
        return fs.mkdirSync(path)
      },
      writeFileSync: (path, data) => {
        return fs.writeFileSync(path, data);
      },
      readFileSync: (path) => {
        const data = fs.readFileSync(path, {encoding:'utf8', flag:'r'}, (err, data) => {
          if(err) throw err;
        })
        return data;
      },
      rmdir: (path) => {
        fs.rmdir(path, {recursive : true}, (err) => {
            if(err) throw err;
        })  
      },
      rename: (oldPath, newPath) => {
        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
        })
      },
      copyFile: (filePath, destinationPath) => {
        fs.copyFile(filePath, destinationPath, (err) => {
          if (err) throw err;
        });
      }
    }
)
