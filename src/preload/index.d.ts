import { ElectronAPI } from '@electron-toolkit/preload'

interface IElectronAPI{
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: IElectronAPI
  }
}
