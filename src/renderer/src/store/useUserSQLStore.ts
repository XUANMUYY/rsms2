// Utilities
import { defineStore } from 'pinia'
import { SQLJson } from '../type'

const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useUserSQLStore = defineStore('UserSQL', {
  state: () => ({
    UserStatus:"Logout" as "Logout"|"Login",
  }),
  actions: {
    Clear() {
    }
  }
})
