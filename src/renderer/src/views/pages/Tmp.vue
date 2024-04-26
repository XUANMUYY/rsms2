<template>
  <v-btn :loading="loading" @click="openDev">调试</v-btn>
  <v-btn :loading="loading" @click="tmp">跳转</v-btn>
  <v-btn :loading="loading" @click="code=useTmpSafeCodeStore().GetCode()">随机Code:{{ code }}</v-btn>
  <v-btn :loading="loading" @click="tmpB">启动下位机{{back==''?'':back?'成功':'失败'}}</v-btn>
  <v-btn :loading="loading" @click="tmpC">获取计数{{ moment.unix(CallBack[0]).format("hh:mm:ss")}},计数率{{CallBack[1]}}CPS</v-btn>
  <v-btn :loading="loading" @click="tmpD">测试D</v-btn>
  <v-btn :loading="loading" @click="tmpE">测试E</v-btn>
  <v-btn :loading="loading" @click="tmpF">调度器</v-btn>
  <v-btn :loading="loading" @click="tmpG">调度器抢占</v-btn>
  <v-btn @click=" $i18n.locale=$i18n.locale=='en'?'zhHans':'en' ">
    切换语言 {{ $t("tmp.hello") }}
  </v-btn>
  <v-btn :loading="loading" @click="()=>{useAddDeviceStore().OpenAddDevice=true;useAddDeviceStore().RefreshDeviceID()}">添加设备</v-btn>
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
const CallBack = ref('')
const moment = require('moment')

class Scheduler {
  max: number
  count: number
  queue0: any[]
  queue1: any[]

  constructor(max: number) {
    this.max = max
    this.count = 0
    this.queue0 = []
    this.queue1 = []
  }

  async add(Function: Function, Value: any, Option: OPTION) {
    if (Option.level == 0 && this.count >= this.max) {
      await new Promise(resolve => this.queue0.push({ resolve: resolve, id: Option.id }))
    }
    if (Option.level == 1 && this.count >= this.max) {
      await new Promise(resolve => this.queue1.push({ resolve: resolve, id: Option.id }))
    }
    return await this.executeTask(Function, Value, Option)
  }

  async executeTask(Function: Function, Value: any, _Option: OPTION) {
    this.count++
    const res = await Function(Value)
    this.count--
    this.queue1.length && this.queue1.shift().resolve() || this.queue0.length && this.queue0.shift().resolve()
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
    useBoardTCPStore().GetCount(0).then((res:any) => {
      CallBack.value = res
      console.log(res)
      resolve(res)
    })
      .then(()=>{useBoardTCPStore().DropSocket(0)})
  })
}
const scheduler = new Scheduler(2)
const code = ref("")

function openDev(){
  window.api.openDev()
}

function tmp() {
  router.replace('/UserListManage')
}

function tmpB() {
  useBoardTCPStore().CreatSocket(0, '192.168.0.100', 5000)
  useBoardTCPStore().StartBoard(0)
    .then((resolve:any)=>{
      back.value = resolve
      useBoardTCPStore().DropSocket(0)})
}

function tmpC() {
  useBoardTCPStore().CreatSocket(0, ip.value, 5000)
  useBoardTCPStore().GetCount(0).then((resolve:any) => {
    CallBack.value = resolve
    console.log(resolve)
  })
    .then(()=>{useBoardTCPStore().DropSocket(0)})
}

function tmpD() {
  useBoardTCPStore().DropSocket(0)
}

function tmpE() {
  shell.exec(`D:\\APP\\STM32tools\\tools\\OpenOCD-20211118-0.11.0\\bin\\openocd.exe -s D:\\APP\\STM32tools\\tools\\OpenOCD-20211118-0.11.0\\share\\openocd\\scripts -f board/DAP_L476RG.cfg -c "tcl_port disabled" -c "gdb_port disabled" -c "tcl_port disabled" -c "program \\"C:/Users/Asterley/Documents/STM32/ARM_L476_DEMO2/cmake-build-openocd/ARM_L476_DEMO2.elf\\"" -c reset -c shutdown`, {
    silent: false,
    encoding: 'GBK'
  }, function(_code, stdout, _stderr) {
    console.log('Program output:', new TextDecoder('GBK').decode(stdout))
  })
}

function tmpF() {
  for(let i=0;i<120;i++){
    setTimeout(()=>{
      tmpC()
    },i*500)
  }
}

function tmpG() {
}

</script>

<style scoped>

</style>
