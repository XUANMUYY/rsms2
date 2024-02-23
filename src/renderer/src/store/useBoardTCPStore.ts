// Utilities
import { defineStore } from 'pinia'
//Plugins
let edge = require('electron-edge-js')

export const useBoardTCPStore = defineStore('BoardTCP', {
  state: () => ({
    CallBack : "none",
  }),
  actions: {
    CreatSocket(this:any,index:number,ipAddress:string,port:number){
      let CallBack:boolean = false
      window.api.getPath().then((_path)=>{
        let CreatSocket = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'CreatSocket'
        })
        CreatSocket({index:index,ipAddress:ipAddress,port:port}, function (_error,_CallBack) {
          CallBack = _CallBack
        })
        console.log(CallBack)
      })
      return CallBack
    },
    async CheckBoard(this:any,index:number){
      try {
        const _path = await window.api.getPath();
        let CheckBoard = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'CheckBoard'
        })
        return new Promise((resolve, reject) => {
          CheckBoard({ index: index, Address: "192.168.0.101:5000" }, function(_error, _CallBack) {
            if (_error) {
              reject(_error);
            } else {
              resolve(_CallBack);
            }
          })
        })
      } catch (error) {
        console.error('Error:', error);
        return new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve('error')
          }, 1000);
        })
      }
    },
    async InitBoard(this:any,index:number,Address:string,timeStamp:number){
      try {
        const _path = await window.api.getPath();
        let InitBoard = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'InitBoard'
        })
        return new Promise((resolve, reject) => {
          InitBoard({ index: index, Address: Address,TimeStamp:timeStamp }, function(_error, _CallBack) {
            if (_error) {
              reject(_error);
            } else {
              resolve(_CallBack);
            }
          })
        })
      } catch (error) {
        console.error('Error:', error);
        return new Promise((resolve, _reject) => {
          setTimeout(() => {
            resolve('error')
          }, 1000);
        })
      }
    },
    Clear(){
      this.CallBack = "none"
    }
  },
})
