import { Options } from 'extract-zip';
import * as MonacoType from 'monaco-editor';

import { App } from './renderer/app';

declare global {
  interface Window {
    ElectronFiddle: {
      app: App;
      appPaths: Record<string, string>;
      monaco: typeof MonacoType;
    };
    NodeAPI: {
      joinPaths: (...paths: Array<string>) => string;
      existsSync: (path: string) => boolean;
      ensureDir: (path: string) => Promise<void>;
      removeDir: (path: string) => Promise<void>;
      writeFile: (file: fs.PathLike, data: any) => Promise<void>;
      extractZip: (zipPath: string, opts: Options) => Promise<void>;
      readJSON: (file: string) => Promise<any>;
      readDir: (file: string) => Promise<string[]>;
    };
  }
}
