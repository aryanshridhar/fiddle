import * as path from 'path';

import { contextBridge } from 'electron';
import extract, { Options } from 'extract-zip';
import * as fs from 'fs-extra';

import { setupFiddleGlobal } from './setup-fiddle';

// Exposes few commonly used Node APIs to renderer
contextBridge.exposeInMainWorld('NodeAPI', {
  joinPaths: (...paths: Array<string>) => {
    return path.join(...paths);
  },
  existsSync: (path: fs.PathLike) => {
    return fs.existsSync(path);
  },
  ensureDir: (path: string) => {
    return fs.ensureDir(path);
  },
  removeDir: (path: string) => {
    return fs.remove(path);
  },
  writeFile: (file: fs.PathLike, data: any) => {
    return fs.writeFile(file, data), { encoding: 'utf8' };
  },
  // TODO(aryanshridhar): Probably extract the rest apis within
  // new context name
  extractZip: (zipPath: string, opts: Options) => {
    return extract(zipPath, opts);
  },
});

async function preload() {
  await setupFiddleGlobal();
}

preload();
