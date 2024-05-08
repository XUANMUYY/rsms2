// 修改 store.js
import { defineStore } from 'pinia'
import { CupBoxSource, CupBoxUserInfo, SQLJson } from '../type'
import AsyncUpdateCupBoardStoreSQL from '../sql/AsyncUpdateCupBoardStore.sql?raw'


const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const empty: CupBoxSource = {
  SourceStatus: 'OUT',
  nuclide_energy: [],
  wiz_ip:"",
  wiz_port:0,
  nuclide_index: 0,
  nuclide_name: '',
  nuclide_quality: 0,
  nuclide_id: 0,
  nuclide_rate: '',
  nuclide_type: '',
  cupbox_id: '0',
  device_id: '0000',
  SSID: '0',
  nuclide: 'empty'
}
const AsyncUpdateCupBoardStore = AsyncUpdateCupBoardStoreSQL as string

export const useAsyncUpdateCupBoardStore = defineStore('AsyncUpdateCupBoard', {
  state: () => ({}),
  getters: {},
  actions: {
    async CupboardUpdateBox(CupBoxIndex: string) {
      let Callback = empty

      return new Promise<{CallBack:CupBoxSource,Status:boolean}>((resolve, _reject) => {
        SQLPool.execute('select cl.cupbox_id,cl.device_id,dl.* from cupboard_list cl join device_list dl on dl.device_id=cl.device_id where cl.cupbox_id=?', [CupBoxIndex])
          .then((res:any) => {
          if (res[0].length != 0) {
            Callback = res[0][0] as CupBoxSource
            return Callback
          } else {
            return empty
          }
        })
          .then((Callback:CupBoxSource) => {
            SQLPool.execute('select sl.* from sources_list sl where sl.SSID=?', [Callback.SSID]).then((res2) => {
              if (res2[0].length != 0) {
                Callback.nuclide = res2[0][0]['nuclide']
                Callback.nuclide_id = res2[0][0]['nuclide_id']
                Callback.SourceStatus = res2[0][0]['SourceStatus']
                Callback.nuclide_energy = res2[0][0]['nuclide_energy']
                Callback.nuclide_index = res2[0][0]['nuclide_index']
                Callback.nuclide_name = res2[0][0]['nuclide_name']
                Callback.nuclide_quality = res2[0][0]['nuclide_quality']
                Callback.nuclide_rate = res2[0][0]['nuclide_rate']
                Callback.nuclide_type = res2[0][0]['nuclide_type']
              } else {
                Callback.nuclide = empty['nuclide']
                Callback.nuclide_id = empty['nuclide_id']
                Callback.SourceStatus = empty['SourceStatus']
                Callback.nuclide_energy = empty['nuclide_energy']
                Callback.nuclide_index = empty['nuclide_index']
                Callback.nuclide_name = empty['nuclide_name']
                Callback.nuclide_quality = empty['nuclide_quality']
                Callback.nuclide_rate = empty['nuclide_rate']
                Callback.nuclide_type = empty['nuclide_type']
              }
              resolve(
                {
                  CallBack:Callback,
                  Status:true
                })
            })
          })
      })
    },
    async CupboardUpdateBoxUserInfo(CupBoxIndex: string):Promise<{CallBack:CupBoxUserInfo, Status:boolean}> {
      return SQLPool.execute(AsyncUpdateCupBoardStore, [CupBoxIndex])
        .then((res) => {
        if (res[0].length != 0) {
          return {
            CallBack:res[0][0] as CupBoxUserInfo,
            Status:true
          }
        } else {
          return {
            CallBack:empty,
            Status:true
          }
        }
      })
    }
  }
})
