// Utilities
import { defineStore } from 'pinia'
import { ApplyArray, SQLJson } from '../type'
import GetApplySQL from '../sql/GetApply.sql?raw'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const GetApply = GetApplySQL as string

export const useUserProcessStore = defineStore('UserProcess', {
  state: () => ({
    ApplyList:[] as ApplyArray[]
  }),
  getters:{
  },
  actions: {
    async GetApply(){
      const _result = await SQLPool.execute(GetApply,[])
      this.ApplyList = Array.from(_result[0])
      console.log(_result[0])
    },
    async ApplyProcess(apply_status:'process-pass'|'process-forbid',process_time:string,event_status:string,apply_id:string){
      const _result = await SQLPool.execute("update apply_list set `apply_status`=?,`process_time`=?,`event_status`=? where apply_id=?",[apply_status,process_time,event_status,apply_id])
      console.log(_result)
    }
  }
})
