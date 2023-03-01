import { app, BrowserWindow, shell, ipcMain, dialog } from "electron";
import { release } from "node:os";
import { join } from "node:path";
import { download } from "electron-dl";

import * as fs from "fs";
import crawl from "./crawling/crawler";
import parseUrl from "./crawling/parser";

const Store = require("electron-store");

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.js    > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.DIST_ELECTRON = join(__dirname, "../");
process.env.DIST = join(process.env.DIST_ELECTRON, "../dist");
process.env.PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? join(process.env.DIST_ELECTRON, "../public")
  : process.env.DIST;

// Disable GPU Acceleration for Windows 7
if (release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

// Remove electron security warnings
// This warning only shows in development mode
// Read more on https://www.electronjs.org/docs/latest/tutorial/security
// process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null;
// Here, you can also use other preload
const preload = join(__dirname, "../preload/index.js");
const url = process.env.VITE_DEV_SERVER_URL;
const indexHtml = join(process.env.DIST, "index.html");
const store = new Store();

async function createWindow() {
  win = new BrowserWindow({
    title: "Godot Universal Project Manager",
    icon: join(process.env.PUBLIC, "favicon.ico"),
    width: 840,
    height: 600,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  win.removeMenu();

  if (process.env.VITE_DEV_SERVER_URL) {
    // electron-vite-vue#298
    win.loadURL(url);
    // Open devTool if the app is not packaged
    win.webContents.openDevTools();
  } else {
    win.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  // Make all links open with the browser, not with the application
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // setup ipc
  ipcMain.on("download", (event, info) => {
    console.log(app.getPath("appData"));
    download(BrowserWindow.getFocusedWindow(), info.url, info.properties).then(
      (dl) => event.reply("download complete", dl.getSavePath())
    );
  });

  // handle storing and getting settings
  let data: {
    key: string;
    value: any;
  };

  ipcMain.handle("store-setting", async (event, data) => {
    store.set(data.key, data.value);
  });

  ipcMain.handle("get-setting", async (event, key) => {
    if (store.has(key)) {
      return store.get(key);
    }
    return null;
  });
}

// handle requests to crawl the tuxfamily website
ipcMain.on("crawl-tuxfamily", async (event, args) => {
  win.webContents.send("set-statusbar-name", "Finding download links...");
  const possible_links = await crawl(true);

  let found_links = [];
  await possible_links.forEach(async (url, i) => {
    win.webContents.send(
      "set-statusbar-name",
      `Parsing link ${i + 1} of ${possible_links.length}...`
    );
    let link_data: Object | null = await parseUrl(url);

    if (link_data !== null) {
      found_links.push(link_data);
    }
  });

  console.log(found_links);
  win.webContents.send("set-statusbar-name", "Saving links as json file...");
  const setting = {
    date: new Date().toUTCString(),
    links: found_links,
  };

  store.set("crawl-results", setting);

  win.webContents.send("set-statusbar-name", "");

  return Promise.resolve();
});

// handle requests to have the user select a direcotry
ipcMain.handle("select-directory", async (event, args) => {
  const paths = await dialog.showOpenDialog(win, {
    title: "Select the directory",
    properties: ["openDirectory"],
  });

  console.log(paths);

  return Promise.resolve(paths.filePaths[0]);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (win) {
    // Focus on the main window if the user tried to open another
    if (win.isMinimized()) win.restore();
    win.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

// New window example arg: new windows url
ipcMain.handle("open-win", (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${url}#${arg}`);
  } else {
    childWindow.loadFile(indexHtml, { hash: arg });
  }
});
