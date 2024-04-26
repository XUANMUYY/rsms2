// 修改 store.js
import { defineStore } from 'pinia'
import { Cupboard_List_Data, Device_List_Data, SQLCallback, SQLJson } from '../type'
import { useSystemInfoStore } from './useSystemInfoStore'
import AddDeviceStoreSQL from '../sql/AddDeviceStore.sql?raw'

const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const AddDeviceStore = AddDeviceStoreSQL as string

export const useAddDeviceStore = defineStore('AddDevice', {
  state: () => ({
    OpenAddDevice: false as boolean,
    step: 0,
    CanClose: true,
    SSID:0,
    device_id: '' as string,
    cupbox_id: '' as string,
    device_list_data: {} as Device_List_Data,
    cupboard_list_data: {} as Cupboard_List_Data
  }),
  getters: {},
  actions: {
    async RefreshDeviceID() {
      await SQLPool.query(AddDeviceStore)
      const _device_id = await SQLPool.execute('SELECT device_id  FROM `device_list` WHERE wiz_ip = \'tmp\'', [])
      this.device_id = _device_id[0][0]['device_id']
    },
    async Add_device_list() {
      //noinspection JSUnresolvedVariable
      return await SQLPool.execute('update device_list set wiz_ip = ?, wiz_port = ?, SSID = ? where device_id = ?',
        [this.device_list_data.wiz_ip,
          this.device_list_data.wiz_port,
          this.SSID,
          this.device_id]) as Promise<[SQLCallback, any]>
    },
    async Add_cupboard_list() {
      return await SQLPool.execute('INSERT INTO cupboard_list (cupbox_id, device_id) VALUES (?,?)', [this.cupbox_id, this.device_id]) as Promise<[SQLCallback, any]>
    },
    async Remove_device_list() {
      await useSystemInfoStore().UpdateSystemInfoIpRange(-1)
      return await SQLPool.execute('DELETE FROM device_list WHERE SSID=? and device_id = ?', [this.SSID, this.device_id]) as Promise<[SQLCallback, any]>
    }
  }
})
