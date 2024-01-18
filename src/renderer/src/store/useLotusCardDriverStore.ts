// Utilities
import { defineStore } from 'pinia'
//Plugins
let edge = require('electron-edge-js')

export const useLotusCardDriverStore = defineStore('LotusCard', {
  state: () => ({
    CardNo : "-1",
    Result : "none",
  }),
  actions: {
    UpdateCardNo(this:any){
      window.api.getPath().then((_path)=>{
        let CardNo:string = "-1"
        let LotusCardGetCardNo = edge.func({
          assemblyFile: _path + '/plugins/LotusCardDriverHandle4.8.dll',
          typeName: 'LotusCardDriverHandle.MainHandle',
          methodName: 'LotusCardGetCardNoInvoke'
        })
        LotusCardGetCardNo({}, function (_error,_CardNo) {
          CardNo = _CardNo
        })
        this.CardNo = CardNo=="寻卡失败!"?"-1":CardNo
      })
    },
    OpenDriver(this:any){
      window.api.getPath().then((_path)=>{
        let Result:string = "-1"
        let LotusCardOpenDevice = edge.func({
          assemblyFile: _path + '/plugins/LotusCardDriverHandle4.8.dll',
          typeName: 'LotusCardDriverHandle.MainHandle',
          methodName: 'LotusCardOpenDeviceInvoke'
        })
        LotusCardOpenDevice({}, function (_error,_Result) {
          Result = _Result
        })
        this.Result = Result
      })
    },
    UpdateCardNoSilence(this:any){
      window.api.getPath().then((_path)=>{
        let CardNo:string = "-1"
        let LotusCardGetCardNoSilence = edge.func({
          assemblyFile: _path + '/plugins/LotusCardDriverHandle4.8.dll',
          typeName: 'LotusCardDriverHandle.MainHandle',
          methodName: 'LotusCardGetCardNoSilenceInvoke'
        })
        LotusCardGetCardNoSilence({}, function (_error,_CardNo) {
          CardNo = _CardNo
        })
        this.CardNo = CardNo=="寻卡失败!"?"-1":CardNo
      })
    },
    Beep(this:any,_Time:number){
      window.api.getPath().then((_path)=>{
        let Result:string = "-1"
        let LotusCardBeep = edge.func({
          assemblyFile: _path + '/plugins/LotusCardDriverHandle4.8.dll',
          typeName: 'LotusCardDriverHandle.MainHandle',
          methodName: 'LotusCardBeepInvoke'
        })
        LotusCardBeep({Time:_Time}, function (_error,_Result) {
          Result = _Result
        })
        this.Result = Result
      })
    },
    Clear(){
      this.Result = "none"
      this.CardNo = "-1"
    }
  },
})
