// Utilities
import { defineStore } from 'pinia'
import { SourcesArray, SQLJson } from '../type'
import SourceArrayStoreSQL from '../sql/SourceArrayStore.sql'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useSourceArrayStore = defineStore('SourceArray', {
  state: () => ({
    SourceArray: [] as SourcesArray[],
  }),
  actions: {
    async UpdateSourceArray() {
      try {
        const SourceArray = await SQLPool.execute(SourceArrayStoreSQL as string, [])
        //noinspection JSUnresolvedVariable
        this.SourceArray = SourceArray[0] as SourcesArray[]
      } catch (error) {
        console.error(error)
      }
    },
    GetSourceArray(SSID:string){
      //noinspection JSUnresolvedVariable
      this.SourceArray.forEach((Source)=>{
        if(Source.SSID == SSID){
          return Source
        }else {
          return {
            nuclide_index: '',
            nuclide: '',
            nuclide_name: '',
            nuclide_quality: '',
            nuclide_rate: '',
            nuclide_type: '',
            nuclide_energy: [[]],
            SSID: '0000',
            SourceStatus: '',
          }
        }
      })
    }
  },
})
