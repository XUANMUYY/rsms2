import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getPath: () => ipcRenderer.invoke('fs:getPath'),
  getAppPath: () => ipcRenderer.invoke('fs:getAppPath'),
  openDev: () => ipcRenderer.invoke('fs:openDev'),
  readJSON: (path:string) => ipcRenderer.invoke('fs:readJSON',path),
  writeJSON: (path:string,JSONData:any) => ipcRenderer.invoke('fs:writeJSON',path,JSONData),
  readTxt: (path:string) => ipcRenderer.invoke('fs:readTxt',path),
  windows_close:()=>ipcRenderer.invoke('windows:close'),
  showMain: () => ipcRenderer.invoke('mw:showMain'),
  initMain: () => ipcRenderer.invoke('mw:initMain'),
  onReadyToShowMain: (callback) => ipcRenderer.on('ms:ready-to-show', (_event, value:number) => callback(value))
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}

window.ontouchstart = (Window: { preventDefault: () => void }) => {
  Window.preventDefault()
}
