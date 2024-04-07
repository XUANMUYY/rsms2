<template>
  <v-btn :loading="loading" @click="openDev">调试</v-btn>
  <v-btn :loading="loading" @click="tmp">跳转</v-btn>
  <v-btn :loading="loading" @click="tmpB">测试B</v-btn>
  <v-btn :loading="loading" @click="tmpC">测试C</v-btn>
  <v-btn :loading="loading" @click="tmpD">测试D</v-btn>
  <v-btn :loading="loading" @click="tmpE">测试E</v-btn>
  <v-btn :loading="loading" @click="tmpF">调度器</v-btn>
  <v-btn :loading="loading" @click="tmpG">调度器抢占</v-btn>
  <v-btn @click=" $i18n.locale=$i18n.locale=='en'?'zhHans':'en' ">
    切换语言 {{ $t("tmp.hello") }}
  </v-btn>
  <v-container class="fill-height background">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="400" src="@/assets/scdx.svg" />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">


import router from '../../router'
import { useBoardTCPStore } from '../../store/useBoardTCPStore'

const shell = require('shelljs')
const loading = ref(false)

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
  return new Promise(resolve => setTimeout(resolve, Value.time)).then(() => console.log(Value.val))
}
const scheduler = new Scheduler(2)

function openDev(){
  window.api.openDev()
}

function tmp() {
  router.replace('/UserListManage')
}

function tmpB() {
  useBoardTCPStore().CreatSocket(0, '192.168.0.100', 5000)
  useBoardTCPStore().StartBoard(0)
    .then(()=>{useBoardTCPStore().DropSocket(0)})
}

function tmpC() {
  useBoardTCPStore().CreatSocket(0, '192.168.0.100', 5000)
  useBoardTCPStore().GetCount(0).then((resolve) => {
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
  scheduler.add(Function,
    {
      time: 10000,
      val: '1'
    },
    {
      level: 0,
      id: 1
    })
  scheduler.add(Function,
    {
      time: 5000,
      val: '2'
    },
    {
      level: 0,
      id: 2
    })
  scheduler.add(Function,
    {
      time: 3000,
      val: '3'
    },
    {
      level: 0,
      id: 3
    })
  scheduler.add(Function,
    {
      time: 4000,
      val: '4'
    },
    {
      level: 0,
      id: 4
    })
}

function tmpG() {
}

</script>

<style scoped>

</style>
