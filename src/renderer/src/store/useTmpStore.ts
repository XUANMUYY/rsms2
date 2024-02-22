// Utilities
import { defineStore } from 'pinia'
//Plugins
let edge = require('electron-edge-js')

export const useTmpStore = defineStore('Tmp', {
  state: () => ({
    CallBack : "none",
  }),
  actions: {
    CreatSocket(this:any){
      let CallBack:string = "none"
      window.api.getPath().then((_path)=>{
        let CreatSocket = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'CreatSocket'
        })
        CreatSocket({index:0,ipAddress:"192.168.0.100",port:5000}, function (_error,_CallBack) {
          CallBack = _CallBack
        })
        console.log(CallBack)
        this.CallBack = CallBack
      })
    },
    async CheckBoard(this:any){
      let CallBack:string = "none"
      try {
        const _path = await window.api.getPath();
        let CheckBoard = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'CheckBoard'
        })
        CallBack = await new Promise((resolve, reject) => {
          CheckBoard({index:0}, function (_error, _CallBack) {
            if (_error) {
              reject(_error);
            } else {
              resolve(_CallBack);
            }
          })
        });
        console.log(CallBack)
        this.CallBack = CallBack;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async InitBoard(this:any){
      let CallBack:string = "none"
      try {
        const _path = await window.api.getPath();
        let InitBoard = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'InitBoard'
        })
        CallBack = await new Promise((resolve, reject) => {
          InitBoard({index:0,Address:"192.168.0.101:5000"}, function (_error, _CallBack) {
            if (_error) {
              reject(_error);
            } else {
              resolve(_CallBack);
            }
          })
        });
        console.log(CallBack)
        this.CallBack = CallBack;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    Clear(){
      this.CallBack = "none"
    }
  },
})
