// 修改 store.js
import { defineStore } from 'pinia'
import { Source_List_Data, SQLJson } from '../type'
import AddSourceStoreSQL from '../sql/AddSourceStore.sql'

const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const AddSourceStore = AddSourceStoreSQL as string

export const useAddSourceStore = defineStore('AddSource', {
  state: () => ({
    result:'' as string,
    SSID: '' as string,
    sources_list_data: {} as Source_List_Data
  }),
  getters: {},
  actions: {
    async RefreshSSID() {
      await SQLPool.query(AddSourceStore)
      const _SSID = await SQLPool.execute('SELECT SSID  FROM `sources_list` WHERE nuclide = \'tmp\'', [])
      this.SSID = _SSID[0][0]['SSID']

    },
    async Add_sources_list() {
      //noinspection JSUnresolvedVariable
      const result = await SQLPool.execute('update sources_list set nuclide = ?, nuclide_id = ?, nuclide_name = ?, nuclide_index = ?, nuclide_quality = ?, nuclide_rate = ?, nuclide_type = ?, nuclide_energy = NULL, status = \'READY\' where SSID = ?',
        [this.sources_list_data.nuclide,
          this.sources_list_data.nuclide_id,
          this.sources_list_data.nuclide_name,
          this.sources_list_data.nuclide_index,
          this.sources_list_data.nuclide_quality,
          this.sources_list_data.nuclide_rate,
          this.sources_list_data.nuclide_type,this.SSID])
      this.result = result
      console.log(result)
    }
  }
})
