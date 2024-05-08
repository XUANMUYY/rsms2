<template>
  <v-btn :loading="loading" @click="openDev">调试</v-btn>
  <v-btn :loading="loading" @click="tmp">跳转</v-btn>
  <v-btn :loading="loading" @click="code=useTmpSafeCodeStore().GetCode()">随机Code:{{ code }}</v-btn>
  <v-btn :loading="loading" @click="tmpB">启动下位机{{ back == '' ? '' : back ? '成功' : '失败' }}</v-btn>
  <v-btn :loading="loading" @click="tmpC">
    获取计数{{ moment.unix(CallBack[0]).format('hh:mm:ss') }},计数率{{ CallBack[1] }}CPS
  </v-btn>
  <v-btn :loading="loading" @click="tmpD">测试D</v-btn>
  <v-btn :loading="loading" @click="tmpE">测试E</v-btn>
  <v-btn :loading="loading" @click="tmpF">调度器</v-btn>
  <v-btn :loading="loading" @click="tmpG">调度器抢占</v-btn>
  <v-btn @click=" $i18n.locale=$i18n.locale=='en'?'zhHans':'en' ">
    切换语言 {{ $t('tmp.hello') }}
  </v-btn>
  <v-btn :loading="loading" @click="()=>{useAddDeviceStore().OpenAddDevice=true;useAddDeviceStore().RefreshDeviceID()}">
    添加设备
  </v-btn>
  <v-text-field v-model="ip" variant="outlined" style="width: 150px"></v-text-field>
  <AddDevice></AddDevice>
  <v-container class="fill-height background">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="400" src="@/assets/scdx.svg" />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">


import router from '../../router'
import { useBoardTCPStore } from '../../store/useBoardTCPStore'
import { useTmpSafeCodeStore } from '../../store/useTmpSafeCodeStore'
import { useAddDeviceStore } from '../../store/useAddDeviceStore'

const shell = require('shelljs')
const loading = ref(false)
const ip = ref('192.168.0.100')
const back = ref('')
const CallBack = ref([0,0])
const moment = require('moment')

class Scheduler {
  status:boolean
  max: number
  count: number
  queue0: any[][]
  queue0count: number[]

  constructor(max: number) {
    this.status = false
    this.max = max
    this.count = 0
    this.queue0 = Array.from({length: max}, () => [])
    this.queue0count = Array.from({length: max}, () => 0)
  }

  async add(Value: any, Option: OPTION) {
    let executeID = this.queue0count.findIndex((count)=>count==Math.min(...this.queue0count))

    this.queue0count[executeID]++
    await new Promise(resolve => this.queue0[executeID].push({ resolve: resolve, id: Option.id }))

    return await this.executeTask(Value,executeID, Option)
  }

  async start(){
    let executeID
    while (this.count<this.max) {
      executeID=0
      for(;executeID<12;executeID++){
        this.queue0[executeID].length && this.queue0count[executeID]--
        this.queue0[executeID].length && this.queue0[executeID].shift().resolve()
      }
    }
  }

  async executeTask(Value: any,_executeID, _Option: OPTION) {
    this.count++

    const res = await new Promise(resolve => {
      setTimeout(()=>{
        resolve(Value.ip)
      },500)
    })

    this.count--
    return res
  }
}

declare interface OPTION {
  level: number,
  id: number
}

const Function = async (Value) => {

  return new Promise(resolve => {

    useBoardTCPStore().CreatSocket(0, Value.ip, Value.port)
    useBoardTCPStore().GetCount(0)
      .then((res: any) => {
        try{
          CallBack.value[0] = res[0]
          CallBack.value[1] = res[1]
          resolve(res)
        }catch(err){
          resolve (err)
        }
      })
      .then((_res) => {
        useBoardTCPStore().DropSocket(0)
      })

  })

}
const scheduler = new Scheduler(12)

const code = ref('')

function openDev() {
  window.api.openDev()
}

function tmp() {
  router.replace('/UserListManage')
}

function tmpB() {
  useBoardTCPStore().CreatSocket(0, ip.value, 5000)
  useBoardTCPStore().StartBoard(0)
    .then((resolve: any) => {
      back.value = resolve
    })
    .then(()=>{
      useBoardTCPStore().DropSocket(0)
    })
}

function tmpC() {
  useBoardTCPStore().CreatSocket(0, ip.value, 5000)
  useBoardTCPStore().GetCount(0)
    .then((res: any) => {
      try{
        console.log(res)
        CallBack.value[0] = res[0]
        CallBack.value[1] = res[1]
        return res
      }catch(err){
        console.log(err)
        return [0,0]
      }
    })
    .then((_res) => {
      useBoardTCPStore().DropSocket(0)
      return _res
    })
    .finally(()=>{
    setTimeout(()=>{
      tmpC()
    },20)
  })
}

function tmpD() {
  scheduler.status = true
}

function tmpE() {
  scheduler.start()
  console.log(scheduler.queue0)
  console.log(scheduler.queue0count)
}

function tmpF() {

  for (let i = 0; i < 12; i++) {
    const res = scheduler.add({
      ip: i as unknown as string,
      port: 5000
    }, {
      level: 0,
      id: i
    })
    res.then((r)=>{
      console.log(r)
    })
  }

}

function tmpG() {
  for (let i = 0; i < 120; i++) {
    setTimeout(()=>{
      useBoardTCPStore().CreatSocket(2, "192.168.0.101", 5000)
      useBoardTCPStore().GetCount(2)
        .then((res: any) => {
          try{
            if(res!=null){
              CallBack.value[0] = res[0]
              CallBack.value[1] = res[1]
            }
            console.log(res)
            return res
          }catch(err){
            console.log(err)
            return [0,0]
          }
        })
        .then((_res) => {
          useBoardTCPStore().DropSocket(2)
          return _res
        })
    },110*(1+i))
  }

}

</script>

<style scoped>

</style>
