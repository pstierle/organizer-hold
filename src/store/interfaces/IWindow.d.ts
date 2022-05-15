export declare global {
  interface Window {
    fs: {
      existsSync: (path: string) => boolean;
      mkdirSync: (path: string) => void;
      writeFileSync: (path: string, data: any) => void;
      readFileSync: (path: string) => string;
      rmdir: (path: string) => void;
      rename: (oldPath: string, newPath: string) => void;
      deleteFile: (path: string) => void;
      copyFile: (filePath: string, destinationPath: string) => void;
      getFileSize: (path: string) => string;
    };
    app: {
      getPath: () => string;
      getVersion: () => string;
    };
    path: {
      join: (...paths) => string;
    };
    shell: {
      openPath: (path: string) => void;
    };
    browserWindow: {
      close: () => void;
      minimize: () => void;
      maximize: () => void;
      reload: () => void;
      openDevTools: () => void;
    };
    axios: {
      get: <T>(req: string, data?: any) => T;
      post: <T>(req: string, data?: any) => T;
    };
    dialog: {
      getSelectedFilePath: (options: any) => Promise<string>;
    };
  }
}
