// Utilities
import { defineStore } from 'pinia'
// import { SQLCallback, SQLJson } from '../type'
//
// const path = await window.api.getPath()
// const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
// const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useCounterSQLStore = defineStore('CounterSQL', {
  state: () => ({
    availableChannel:[] as any[],
    CupBoxCount:[] as {CupBoxID:string, CountBuff:(any)[]}[]
  }),
  actions: {

  },
})
