// Utilities
import { defineStore } from 'pinia'
import { CupBoardCallback, SQLCallback, SQLJson } from '../type'
//Plugins
let edge = require('electron-edge-js')
const path = await window.api.getPath()
const PoolOptions:SQLJson = await window.api.readJSON(path + '/plugins/SQLSetting.json')
const SQLPool = await require('mysql2/promise').createPool(PoolOptions.SQL)

export const useCupBoardStore = defineStore('CupBoard', {
  state: () => ({
    CallBack : "none",
    dialog:false,
    dialogTips:""
  }),
  actions: {
    OpenBox(this:any,_CupBoardIndex:string,_CupBoxIndex:string){
      let CallBack:string = "none"
      window.api.getPath().then((_path)=>{
        let OpenBox = edge.func({
          assemblyFile: _path + '/plugins/SCUCupBoardHandle4.8.dll',
          typeName: 'SCUCupBoardHandle4._8.SCUCupBoardHandle',
          methodName: 'OpenBoxInvoke'
        })
        OpenBox({CupBoardIndex:_CupBoardIndex,CupBoxIndex:_CupBoxIndex}, function (_error,_CallBack) {
          CallBack = _CallBack
        })
        this.CallBack = CallBack
      })
    },
    async AsyncOpenBox(this:any,CupBoxIndex:string){
      try {
        const _CupBoardIndex = CupBoxIndex.substring(0,2);
        const _CupBoxIndex = CupBoxIndex.substring(2,4);
        const _path = await window.api.getPath();
        let OpenBox = edge.func({
          assemblyFile: _path + '/plugins/SCUCupBoardHandle4.8.dll',
          typeName: 'SCUCupBoardHandle4._8.SCUCupBoardHandle',
          methodName: 'OpenBoxInvoke'
        })
        return new Promise((resolve, reject) => {
          OpenBox({CupBoardIndex:_CupBoardIndex,CupBoxIndex:_CupBoxIndex}, function(_error, _CallBack:string) {
            if (_error) {
              reject(_error);
            } else {
              resolve(true);
            }
          })
        })
      } catch (error) {
        console.error('Error:', error);
        return new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve(false)
          }, 1000);
        })
      }
    },
    async AsyncOpen(out_time:string,apply_id:string,SSID:string){
      return SQLPool.execute("update apply_list set out_time=?,event_status= 'out' where apply_id=?", [out_time,apply_id]).then((resolve:Promise<[SQLCallback, any]>)=>{
        if(resolve[0].affectedRows==1){
          return SQLPool.execute("update sources_list set SourceStatus='OUT' where SSID=?", [SSID]) as Promise<[SQLCallback, any]>
        }
        return new Promise((resolve,_reject)=>{
          setTimeout(()=>{
            resolve([{affectedRows:0},{}])
          },500)
        })
      })
    },
    async AsyncBackOpen(back_time:string,apply_id:string,SSID:string){
      return SQLPool.execute("update apply_list set back_time=?,event_status= 'back',item_status='end' where apply_id=?", [back_time,apply_id]).then((resolve:Promise<[SQLCallback, any]>)=>{
        if(resolve[0].affectedRows==1){
          return SQLPool.execute("update sources_list set SourceStatus='READY' where SSID=?", [SSID]) as Promise<[SQLCallback, any]>
        }
        return new Promise((resolve,_reject)=>{
          setTimeout(()=>{
            resolve([{affectedRows:0},{}])
          },500)
        })
      })
    },
    CupBoardsInit(this:any,_CupBoard_num:number){
      window.api.getPath().then((_path)=>{
        let CallBack:CupBoardCallback = {} as CupBoardCallback
        let CupBoardsInit = edge.func({
          assemblyFile: _path + '/plugins/SCUCupBoardHandle4.8.dll',
          typeName: 'SCUCupBoardHandle4._8.SCUCupBoardHandle',
          methodName: 'CupBoards_InitInvoke'
        })
        CupBoardsInit({CupBoard_num:_CupBoard_num}, function (_error,_CallBack) {
          CallBack = _CallBack
        })
        this.CallBack = CallBack.Callback
      })
    },
    async AsyncCupBoardsInit(this:any,_CupBoard_num:number){
      try {
        const _path = await window.api.getPath();
        let CupBoardsInit = edge.func({
          assemblyFile: _path + '/plugins/SCUCupBoardHandle4.8.dll',
          typeName: 'SCUCupBoardHandle4._8.SCUCupBoardHandle',
          methodName: 'CupBoards_InitInvoke'
        })
        return new Promise((resolve, reject) => {
          CupBoardsInit({CupBoard_num:_CupBoard_num}, function(_error, _CallBack:string) {
            if (_error) {
              reject(_error);
            } else {
              resolve(true);
            }
          })
        })
      } catch (error) {
        console.error('Error:', error);
        return new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve(false)
          }, 1000);
        })
      }
    },

    Clear(){
      this.CallBack = "none"
    }
  },
})
