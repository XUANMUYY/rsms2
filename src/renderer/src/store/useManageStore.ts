// Utilities
import { defineStore } from 'pinia'
import { SQLCallback, SQLJson, UserData } from '../type'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useManageStore = defineStore('Manage', {
  state: () => ({

  }),
  actions: {
    async ManageGetUserList(){
      return SQLPool.execute("select ul.user,ul.name,ul.authority,ul.card,ul.state from user_list ul where name!='tmp'",[]).then((resolve:any)=>{
        return resolve[0] as unknown as UserData[]
      })
    },
    async ChangeAuthority(user:string,authority:"root"|"normal"|"guest"){
      return SQLPool.execute("update user_list set authority=? where user=?",[authority,user]) as Promise<[SQLCallback, any]>
    }
  },
})
