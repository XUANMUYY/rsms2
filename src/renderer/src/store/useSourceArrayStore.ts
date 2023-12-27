// Utilities
import { defineStore } from 'pinia'
import { SourcesArray } from '../type'

const SQLPool = await require('mysql2/promise').createPool({
  host: '192.1681.132.3',
  user: 'xuanmuyy',
  database: 'demo_source',
  password: '23912345',
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 5,
  enableKeepAlive: false,
  keepAliveInitialDelay: 0
})

export const useSourceArrayStore = defineStore('SourceArray', {
  state: () => ({
    SourceArray: [] as SourcesArray[],
  }),
  actions: {
    async UpdateSourceArray() {
      try {
        const [_SourceArray, _fields] = await SQLPool.execute('SELECT *,status AS SourceStatus FROM `source_list`', [])
        //noinspection JSUnresolvedVariable
        this.SourceArray = _SourceArray
      } catch (error) {
        console.error(error)
      }
    },
  },
})
