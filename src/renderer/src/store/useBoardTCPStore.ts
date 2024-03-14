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
      })
      return CallBack
    },
    DropSocket(this:any,index:number){
      let CallBack:boolean = false
      window.api.getPath().then((_path)=>{
        let DropSocket = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'DropSocket'
        })
        DropSocket({index:index}, function (_error,_CallBack) {
          CallBack = _CallBack
        })
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
          CheckBoard({ index: index }, function(_error, _CallBack) {
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
            resolve(false)
          }, 1000);
        })
      }
    },
    async InitBoard(this:any,index:number,Ip:string,Port:number,timeStamp:number){
      try {
        const _path = await window.api.getPath();
        let InitBoard = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'InitBoard'
        })
        return new Promise((resolve, reject) => {
          InitBoard({ index: index, Ip:Ip,Port:Port,TimeStamp:timeStamp }, function(_error, _CallBack) {
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
            resolve(false)
          }, 1000);
        })
      }
    },
    async FormatBoard(this:any,index:number){
      try {
        const _path = await window.api.getPath();
        let FormatBoard = edge.func({
          assemblyFile: _path + '/plugins/BoardTCPHandle4.8.dll',
          typeName: 'BoardTCPHandle4._8.TcpClientHandler',
          methodName: 'Format'
        })
        return new Promise((resolve, reject) => {
          FormatBoard({ index: index }, function(_error, _CallBack) {
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
