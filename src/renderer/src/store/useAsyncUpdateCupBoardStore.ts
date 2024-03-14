// 修改 store.js
import { defineStore } from 'pinia'
import { CupBoxSource, CupBoxUserInfo, SQLJson } from '../type'
import AsyncUpdateCupBoardStoreSQL from '../sql/AsyncUpdateCupBoardStore.sql?raw'


const path = await window.api.getPath()
const PoolOptions: SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)
const empty:CupBoxSource = {
  SourceStatus: 'OUT',
  nuclide_energy: [],
  nuclide_index: 0,
  nuclide_name: '',
  nuclide_quality: 0,
  nuclide_rate: '',
  nuclide_type: '',
  cupbox_id:'0',
  SSID:'0',
  nuclide:'empty'
}
const AsyncUpdateCupBoardStore = AsyncUpdateCupBoardStoreSQL as string

export const useAsyncUpdateCupBoardStore = defineStore('AsyncUpdateCupBoard', {
  state: () => ({
  }),
  getters: {},
  actions: {
    async CupboardUpdateBox(CupBoxIndex:string){
      return SQLPool.execute("select cl.cupbox_id,cl.SSID,sl.* from cupboard_list cl join sources_list sl on sl.SSID=cl.SSID where cl.cupbox_id=?", [CupBoxIndex]).then((res)=>{
        if (res[0].length != 0) {
          return [res[0][0] as CupBoxSource,true]
        }
        else {
          return [empty,true]
        }
      })
    },
    async CupboardUpdateBoxUserInfo(CupBoxIndex:string){
      return SQLPool.execute(AsyncUpdateCupBoardStore, [CupBoxIndex]).then((res)=>{
        if (res[0].length != 0) {
          return [res[0][0] as CupBoxUserInfo,true]
        }
        else {
          return [empty,true]
        }
      })
    }
  }
})
