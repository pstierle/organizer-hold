"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
import path from "path";

const isDevelopment = process.env.NODE_ENV !== "production";
declare const __static: string;

import { initialize, enable } from "@electron/remote/main";

initialize();

const preload =
  process.env.NODE_ENV === "development"
    ? path.resolve(__static, "..", "public", "preload.js")
    : path.resolve(__static, "preload.js");

const icon =
  process.env.NODE_ENV === "development"
    ? path.resolve(__static, "..", "public", "icon.png")
    : path.resolve(__static, "icon.png");

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 600,
    frame: false,
    transparent: true,
    webPreferences: {
      preload: preload,
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  win.setIcon(icon);

  enable(win.webContents);

  win.webContents.openDevTools();

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e: any) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
