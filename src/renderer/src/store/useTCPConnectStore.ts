// Utilities
import { defineStore } from 'pinia'
import { ADCPulse, CountRate, SocketInfo } from '../type'

const {connect} = require("@arrowood.dev/socket")

let SocketArray = [{ Socket: '' as any, ID: "0"}] as { Socket:any, ID:string}[]
function SocketInfo(this:SocketInfo,ip:string,port:number,ID:string) {
  this.Address={ hostname: ip, port: port }
  this.ID=ID
  this.Result=""
  this.ResultCMD={} as any
}

export const useTCPConnectStore = defineStore('TCPConnect', {
  state: () => ({
    SocketInfoArray:[] as SocketInfo[],
  }),
  actions: {
    HexFormat(HexString:string){
      return  HexString.split(' ').map(hex => parseInt(hex, 16))
    },
    TCPConnect(ip:string,port:number,ID:string){
      this.SocketInfoArray.push(new SocketInfo(ip,port,ID))
      SocketArray.push({
        Socket:connect({ hostname: ip, port: port }),
        ID:ID,
      })
      SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.socket.on('connect', () => {
        console.log(ip+':'+port+' 连接成功！');
      })
      SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.socket.on('close', err => {
        console.log(ip+':'+port+' 客户端链接断开！', err);
      })
      SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.socket.on('error', err => {
        console.log(ip+':'+port+' 服务器异常：', err);
      })
    },
    TCPGet(ID:string){
      if(this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!=undefined){
        return this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!
      }else {
        throw "ID error"
      }
    },
    TCPGetSocket(ID:string){
      if(SocketArray.find((_socket)=>_socket.ID==ID)!=undefined){
        return SocketArray.find((_socket)=>_socket.ID==ID)!.Socket
      }else {
        throw "ID error"
      }
    },
    TCPGetResult(ID:string){
      if(this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!=undefined){
        return this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.Result
      }else {
        throw "ID error"
      }
    },
    TCPGetResultCMD(ID:string){
      if(this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!=undefined){
        return this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.ResultCMD
      }else {
        throw "ID error"
      }
    },
    async TCPSend(ID:string,Data:string[]){
      const encoder = new TextEncoder();
      const writer = SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.writable.getWriter();
      Data.forEach((data)=>{
        setTimeout(()=>{
          writer.write(encoder.encode(data))
        },10)
      })
    },
    async TCPSendCMD(ID:string,CMD:string[]){
      const HexFormat = ((HexString:string)=>{
        return new Uint8Array(HexString.split(' ').map(hex => parseInt(hex, 16)))
      })
      const writer = SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.writable.getWriter();
      CMD.forEach((cmd)=>{
        setTimeout(()=>{
          writer.write(HexFormat(cmd))
        },10)
      })
    },
    async TCPListen(ID:string){
      if(this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!=undefined){
        const reader = SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          const decoder = new TextDecoder();
          this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.Result += decoder.decode(value);
        }
        reader.releaseLock();
      }else {
        throw "ID error"
      }
    },
    async TCPListenCMD(ID:string){
      if(this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!=undefined){
        const reader = SocketArray.find((_socket)=>_socket.ID==ID)!.Socket.readable.getReader();
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }
          const decoder = new TextDecoder();
          this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.Result += decoder.decode(value)

          if(FormatCountRate(decoder.decode(value))!=null){
            this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.ResultCMD = FormatCountRate(decoder.decode(value)) as CountRate
          }
          if(FormatADCPulse(decoder.decode(value))!=null){
            this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.ResultCMD = FormatADCPulse(decoder.decode(value)) as ADCPulse
          }
        }
        reader.releaseLock();
      }else {
        throw "ID error"
      }
    },
    ResultClear(ID:string){
      if(this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!=undefined){
        this.SocketInfoArray.find((_socket)=>_socket.ID==ID)!.Result ='';
      }else {
        throw "ID error"
      }
    }
  }
})

function FormatCountRate(inputString: string): CountRate|null {
  const regexTimeStamp = /The TimeStamp {2}is (\d+)/;
  const regexCount = /The Count is (\d+)/;
  const regexSampleCountTotal = /The Sample Count Total is (\d+)/;
  const regexCountRate = /The CountRate is (\d+)/;

  const matchTimeStamp = inputString.match(regexTimeStamp);
  const matchCount = inputString.match(regexCount);
  const matchSampleCountTotal = inputString.match(regexSampleCountTotal);
  const matchCountRate = inputString.match(regexCountRate);

  if (matchTimeStamp&&matchCount&&matchSampleCountTotal&&matchCountRate) {
    return parseInt(matchSampleCountTotal[1])>=4000000000?{
      CountRateStatus:true,
      TimeStamp: parseInt(matchTimeStamp[1]),
      Count: parseInt(matchCount[1]) ,
      Sample_Count_Total: 0,
      CountRate: 0,
    }: {
      CountRateStatus:true,
      TimeStamp: parseInt(matchTimeStamp[1]),
      Count: parseInt(matchCount[1]) ,
      Sample_Count_Total: parseInt(matchSampleCountTotal[1]),
      CountRate: parseInt(matchCountRate[1]),
    }
  }
  return null;
}
function FormatADCPulse(inputString: string):ADCPulse|null{
  const regexADCPulse = /ADC_PULSE:(\d+),(\d+),(\d+)/;

  const matchADCPulse = inputString.match(regexADCPulse);

  if (matchADCPulse) {
    return {
      ADCPulseStatus:true,
      Index: parseInt(matchADCPulse[2]),
      Ch: parseInt(matchADCPulse[1]),
      Peak: parseInt(matchADCPulse[3]),
    }
  }
  return null;
}
