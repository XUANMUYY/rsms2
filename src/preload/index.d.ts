import { ElectronAPI } from '@electron-toolkit/preload'
import { PoolOptions } from 'mysql2/index'
import { SQLJson } from '../renderer/src/type'

interface IElectronAPI{
  getPath: () => Promise<any>,
  getAppPath: () => Promise<any>,
  openDev: () => Promise<any>,
  readJSON: (path:string) => Promise<SQLJson>,
  readTxt: (path:string) => Promise<string>,
  windows_close: () => Promise<any>,
  showMain: () => Promise<any>,
  initMain: () => Promise<any>,
  onReadyToShowMain: (callback) => Promise<any>,
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
