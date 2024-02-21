// 修改 store.js
import { defineStore } from 'pinia'
import { CupBoxSource, SQLJson } from '../type'

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

export const useAsyncUpdateCupBoardStore = defineStore('AsyncUpdateCupBoard', {
  state: () => ({
    cupBoardUpdate:false as boolean,
    cupBoxSources:new Array(12).fill(empty) as CupBoxSource[]
  }),
  getters: {},
  actions: {
    async updateBox(cupBoard:number){
      this.cupBoardUpdate = false
      this.cupBoxSources =  new Array(12).fill(empty);
      let cupBoxArray:any[] = []
      let cupBoxSourceArray:any[] = []
      for (let i=0;i<12;i++){
        let cupBox = cupBoard.toString().padStart(2, '0') + (i+1).toString().padStart(2, '0')
        const _result = await SQLPool.execute("select cl.cupbox_id,cl.SSID,sl.* from cupboard_list cl join sources_list sl on sl.SSID=cl.SSID where cl.cupbox_id=?",[cupBox])
        if (_result[0].length!=0){
          cupBoxArray.push(_result[0][0])
        }else {
          cupBoxArray.push(empty)
        }
      }
      cupBoxArray.forEach((_result,index)=>{
        if(_result.cupbox_id == cupBoard.toString().padStart(2, '0') + (index+1).toString().padStart(2, '0')){
          cupBoxSourceArray[index] = _result
        }else {
          cupBoxSourceArray[index] = empty
        }
      })
      this.cupBoxSources = cupBoxSourceArray
      this.cupBoardUpdate = true
    }
  }
})
