<template>
  <v-btn :loading="loading" @click="openDev">调试</v-btn>
  <v-btn :loading="loading" @click="tmp">跳转</v-btn>
  <v-btn :loading="loading" @click="code=useTmpSafeCodeStore().GetCode()">随机Code:{{ code }}</v-btn>
  <v-btn :loading="loading" @click="tmpB">启动下位机{{ back == '' ? '' : back ? '成功' : '失败' }}</v-btn>
  <v-btn :loading="loading" @click="tmpC">
    获取计数{{ moment.unix(CallBack[0]).format('hh:mm:ss') }},计数率{{ CallBack[1] }}CPS
  </v-btn>
  <v-btn :loading="loading" @click="tmpD">调度器状态</v-btn>
  <v-btn :loading="loading" @click="tmpE">调度器启动</v-btn>
  <v-btn :loading="loading" @click="tmpF">添加调度</v-btn>
  <v-btn :loading="loading" @click="tmpG">轮询</v-btn>
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
import { useSchedulerStore } from '../../store/useSchedulerStore'

const loading = ref(false)
const ip = ref('192.168.0.100')
const back = ref('')
const CallBack = ref([0, 0])
const moment = require('moment')

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
    .then(() => {
      useBoardTCPStore().DropSocket(0)
    })
}

function tmpC() {
  useBoardTCPStore().CreatSocket(0, ip.value, 5000)
  useBoardTCPStore().GetCount(0)
    .then((res: any) => {
      try {
        console.log(res)
        CallBack.value[0] = res[0]
        CallBack.value[1] = res[1]
        return res
      } catch (err) {
        console.log(err)
        return [0, 0]
      }
    })
    .then((_res) => {
      useBoardTCPStore().DropSocket(0)
      return _res
    })
    .finally(() => {
      setTimeout(() => {
        tmpC()
      }, 20)
    })
}

function tmpD() {
  useSchedulerStore().queue0enable[3]=false
  console.log(useSchedulerStore().queue0)
  console.log(useSchedulerStore().queue0count)
}

function tmpE() {
  console.log(useSchedulerStore().queue0)
  console.log(useSchedulerStore().queue0count)
  useSchedulerStore().start()
  console.log(useSchedulerStore().queue0)
  console.log(useSchedulerStore().queue0count)
}

function tmpF() {
  const Function = async (Value:any) => {
    return new Promise(resolve => {
      setTimeout(()=>{
        resolve(Value.ip)
      },Math.random()*1000)
    })
  }


  for (let i = 0; i < 1200; i++) {
    const res = useSchedulerStore().add(
      Function,
      {
        ip: Math.random()*100,
        port: 5000
      },
      {
        delay: 1000,
        id: i
      })
    res.then((r) => {
      console.log(r)
    })
  }

}

function tmpG() {
  for (let i = 0; i < 120; i++) {
    setTimeout(() => {
      useBoardTCPStore().CreatSocket(2, '192.168.0.101', 5000)
      useBoardTCPStore().GetCount(2)
        .then((res: any) => {
          try {
            if (res != null) {
              CallBack.value[0] = res[0]
              CallBack.value[1] = res[1]
            }
            console.log(res)
            return res
          } catch (err) {
            console.log(err)
            return [0, 0]
          }
        })
        .then((_res) => {
          useBoardTCPStore().DropSocket(2)
          return _res
        })
    }, 110 * (1 + i))
  }

}

</script>

<style scoped>

</style>
