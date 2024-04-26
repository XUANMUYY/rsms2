// Utilities
import { defineStore } from 'pinia'
import {SQLJson, FindUserSource } from '../type'
import UseFindWhoUsingSourceStoreSQL from '../sql/UseFindWhoUsingSourceStore.sql?raw'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const FindWhoUsingSourceStore = UseFindWhoUsingSourceStoreSQL as string

export const UseFindWhoUsingSourceStore = defineStore('FindWhoUsingSource', {
  state: () => ({
    open:false,
    UserDara:{
      apply_id: "",
      SSID: "",
      user:  "",
      name:  "",
      reason: "",
      apply_status: 'process-forbid',
      event_status: 'out',
      user_status: 'normal',
      first_time:  "",
      last_time:  "",
      process_time:  "",
      out_time:  "",
      back_time:  "",
    } as FindUserSource
  }),
  actions: {
    async Find(SSID:string){
      return new Promise((resolve:any)=>{
        SQLPool.execute(FindWhoUsingSourceStore,[SSID]).then((res:any)=>{
          this.UserDara = res[0][0] as FindUserSource
          resolve (res[0][0] as FindUserSource)
        })
      })
    }
  },
})
