<template>
  <v-card
    class="mx-auto"
    elevation="0"
    rounded="0">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-btn
              @click="CheckBoard"
              :disabled="useBtn"
            >{{Tips}}</v-btn>
          </v-col>
          <v-col>

          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8">
            <v-text-field label="IP" :disabled="!InitDevice"></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field label="Port" :disabled="!InitDevice"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-btn @click=""></v-btn>
          </v-col>
          <v-col cols="9">
            <v-text-field disabled>{{timeStamp==0?"":moment.unix(timeStamp).format("YYYY-MM-DD hh:mm:ss")}}</v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" :color="color" variant="flat" @click="Submit">{{ BtnTips }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">

import { useBoardTCPStore } from '../../store/useBoardTCPStore'
import { ref } from 'vue'
import { useAddSourceStore } from '../../store/useAddSourceStore'
const moment = require("moment")

const useBtn = ref(false)
const InitDevice = ref(false)
const InitDeviceLoading = ref(false)
const Tips = ref("设备绑定检测")
const timeStamp = ref(0)
const loading = ref(false)
const color = ref("primary")
const BtnTips = ref("Next")

function CheckBoard(){
  Tips.value = "设备绑定检测中"
  useBtn.value = true
  InitDevice.value = false
  InitDeviceLoading.value = true
  useBoardTCPStore().CreatSocket(0, '192.168.0.100', 5000)
  const CheckCallback = useBoardTCPStore().CheckBoard(0)
  CheckCallback.then((resole)=>{
    console.log(resole)
    if(resole){
      Tips.value = "设备正常"
      InitDevice.value = true
      InitDeviceLoading.value = false
      timeStamp.value = moment().format("X") as number
    }
    else {
      Tips.value = "设备已被绑定"
      InitDeviceLoading.value = false
      setTimeout(()=>{
        useBtn.value = false
        Tips.value = "设备绑定检测"
      },1500)
    }
  })
}
function Submit(){
  useBoardTCPStore().CreatSocket(0, '192.168.0.100', 5000)
  loading.value = true
  const InitCallback = useBoardTCPStore().InitBoard(0,"192.168.0.100:5000",timeStamp.value)
  InitCallback.then((resolve)=>{
    if(resolve){
      loading.value = false
      useAddSourceStore().step = 3
    }
    else {
      BtnTips.value = "failed"
      loading.value = false
      color.value = "red"
    }
    setTimeout(()=>{
      color.value = "primary"
      BtnTips.value = "Next"
    },2000)
  })
}
</script>

<style scoped>

</style>
