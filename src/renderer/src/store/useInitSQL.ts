// Utilities
import { defineStore } from 'pinia'
import init_sql from '../sql/init-sql.sql?raw'
import init_user from '../sql/init-user.sql?raw'

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
    async InitSQL(sql_version,ip_field,ip_base,ip_range,port,cupboard_num){
      this.callback.push(pathAPP)
      try{
        let SQLCallback = await InitSQLPool.query(MYSQL,[sql_version,sql_version,ip_field,ip_base as number,ip_range as number,port as number,cupboard_num as number])
        this.callback.push(SQLCallback)
      }catch(_error)
      {
        console.error(_error)
      }
    },
    async InitUser(){
      try{
        let SQLCallback = await SQLPool.query(MYSQL_User,['10001', '12345678', 'root', '管理员',''])
        this.callback.push(SQLCallback)
      }catch(_error)
      {
        console.error(_error)
      }
    },
    Clear() {
    }
  }
})
