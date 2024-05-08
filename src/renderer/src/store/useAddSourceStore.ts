// 修改 store.js
import { defineStore } from 'pinia'
import { Cupboard_List_Data, Device_List_Data, Source_List_Data, SQLCallback, SQLJson } from '../type'
import AddSourceStoreSQL from '../sql/AddSourceStore.sql?raw'
import AddDeviceStoreSQL from '../sql/AddDeviceStore.sql?raw'
import { useSystemInfoStore } from './useSystemInfoStore'

const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const AddSourceStore = AddSourceStoreSQL as string
const AddDeviceStore = AddDeviceStoreSQL as string

export const useAddSourceStore = defineStore('AddSource', {
  state: () => ({
    OpenAddSource: false as boolean,
    step: 0,
    CanClose: false,
    SSID: '0' as string,
    device_id: '' as string,
    cupbox_id: '' as string,
    sources_list_data: {} as Source_List_Data,
    device_list_data: {} as Device_List_Data,
    cupboard_list_data: {} as Cupboard_List_Data,
    BandDevice:false as boolean,
    BandOldDevice:false as boolean,
  }),
  getters: {},
  actions: {
    async RefreshSSID() {
      await SQLPool.query(AddSourceStore)
      await SQLPool.query(AddDeviceStore)
      const _SSID = await SQLPool.execute('SELECT SSID  FROM `sources_list` WHERE nuclide_name = \'tmp\'', [])
      const _device_id = await SQLPool.execute('SELECT device_id  FROM `device_list` WHERE wiz_ip = \'tmp\'', [])
      this.SSID = _SSID[0][0]['SSID']
      this.device_id = _device_id[0][0]['device_id']
    },
    async Add_sources_list() {
      //noinspection JSUnresolvedVariable
      await SQLPool.execute('update sources_list set nuclide = ?, nuclide_id = ?, nuclide_name = ?, nuclide_index = ?, nuclide_quality = ?, nuclide_rate = ?, nuclide_type = ?, nuclide_energy = NULL, SourceStatus = \'READY\' where SSID = ?',
        [this.sources_list_data.nuclide,
          this.sources_list_data.nuclide_id,
          this.sources_list_data.nuclide_name,
          this.sources_list_data.nuclide_index,
          this.sources_list_data.nuclide_quality,
          this.sources_list_data.nuclide_rate,
          this.sources_list_data.nuclide_type, this.SSID])
    },
    async Add_device_list() {
      //noinspection JSUnresolvedVariable
      return await SQLPool.execute('update device_list set wiz_ip = ?, wiz_port = ?, SSID = ? where device_id = ?',
        [this.device_list_data.wiz_ip,
          this.device_list_data.wiz_port,
          this.SSID,
          this.device_id]) as Promise<[SQLCallback, any]>
    },
    async Update_device_list() {
      //noinspection JSUnresolvedVariable
      return await SQLPool.execute('update device_list set  SSID = ? where device_id = ?',
        [this.SSID,
          this.device_id]) as Promise<[SQLCallback, any]>
    },
    async Add_cupboard_list() {
      return await SQLPool.execute('INSERT INTO cupboard_list (cupbox_id, device_id) VALUES (?,?)', [this.cupbox_id,  this.device_id]) as Promise<[SQLCallback, any]>
    },
    async Remove_sources_list() {
      return await SQLPool.execute('DELETE FROM sources_list WHERE SSID=? and nuclide = ?', [this.SSID, this.sources_list_data.nuclide]) as Promise<[SQLCallback, any]>
    },
    async Remove_device_list() {
      await useSystemInfoStore().UpdateSystemInfoIpRange(-1)
      return await SQLPool.execute('DELETE FROM device_list WHERE SSID=? and device_id = ?', [this.SSID, this.device_id]) as Promise<[SQLCallback, any]>
    }
  }
})
