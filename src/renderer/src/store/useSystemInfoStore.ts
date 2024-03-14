// 修改 store.js
import { defineStore } from 'pinia'
import { SQLCallback, SQLJson, system_info } from '../type'

const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useSystemInfoStore = defineStore('SystemInfo', {
  state: () => ({
    SystemInfo:{} as system_info
  }),
  getters: {},
  actions: {
    async GetSystemInfo(){
      return SQLPool.execute('select * from system_info',[]).then((resolve)=>{
        this.SystemInfo = resolve[0][0] as system_info
        return resolve[0][0] as system_info
      })
    },
    async UpdateSystemInfoIpRange(change:number){
      await this.GetSystemInfo()
      return  SQLPool.execute('update system_info set ip_range = ?',[this.SystemInfo.ip_range + change]) as Promise<[SQLCallback,any]>
    },
  }
})
