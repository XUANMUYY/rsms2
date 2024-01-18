// Utilities
import { defineStore } from 'pinia'
import { CupBoardCallback } from '../type'
//Plugins
let edge = require('electron-edge-js')

export const useCupBoardStore = defineStore('CupBoard', {
  state: () => ({
    CallBack : "none",
  }),
  actions: {
    OpenBox(this:any,_CupBoardIndex,_CupBoxIndex){
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
        console.log(CallBack)
        this.CallBack = CallBack
      })
    },
    CupBoardsInit(this:any,_CupBoard_num){
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
        console.log(CallBack)
        this.CallBack = CallBack.Callback
      })
    },
    Clear(){
      this.CallBack = "none"
    }
  },
})
