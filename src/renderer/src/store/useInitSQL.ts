// Utilities
import { defineStore } from 'pinia'
import init_sql from '../sql/init-sql.sql'
import init_user from '../sql/init-user.sql'

const path = await window.api.getPath()
const pathAPP = await window.api.getAppPath()
const PoolOptions = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const InitSQLPool = await require('mysql2/promise').createPool(PoolOptions.INIT_SQL)
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
let MYSQL = init_sql as string
let MYSQL_User = init_user as string

export const useInitSQLStore = defineStore('InitSQL', {
  state: () => ({
    callback:[] as object[]
  }),
  actions: {
    async InitSQL(sql_version){
      this.callback.push(pathAPP)
      try{
        let SQLCallback = await InitSQLPool.query(MYSQL,[sql_version,sql_version])
        this.callback.push(SQLCallback)
      }catch(_error)
      {
        console.log(_error)
      }
    },
    async InitUser(){
      try{
        let SQLCallback = await SQLPool.query(MYSQL_User,['10001', '12345678', 'root', '管理员',''])
        this.callback.push(SQLCallback)
      }catch(_error)
      {
        console.log(_error)
      }
    },
    Clear() {
    }
  }
})
