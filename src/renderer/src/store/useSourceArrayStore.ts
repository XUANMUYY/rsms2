// Utilities
import { defineStore } from 'pinia'
import { SourceBind, SourcesArray, SQLJson } from '../type'
import SourceArrayStoreSQL from '../sql/SourceArrayStore.sql?raw'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useSourceArrayStore = defineStore('SourceArray', {
  state: () => ({
    SourceArray: [] as SourcesArray[],
    GetSourceArray:[]  as SourcesArray[],
  }),
  actions: {
    async UpdateSourceArray() {
      try {
        const SourceArray = await SQLPool.execute(SourceArrayStoreSQL as string, [])
        this.SourceArray = SourceArray[0] as SourcesArray[]
      } catch (error) {
        console.error(error)
      }
    },
    getBind(SSID:any){
      return new Promise<SourceBind>((resolve, _reject) => {
        SQLPool.execute("select dl.*,cl.* from device_list dl join cupboard_list cl on dl.device_id=cl.device_id where dl.SSID=?",[SSID])
          .then((res:any)=>{
            resolve (res[0][0] as SourceBind)
          })
      })
    },
    GetSourceArray(_SSID:string){
    }
  },
})
