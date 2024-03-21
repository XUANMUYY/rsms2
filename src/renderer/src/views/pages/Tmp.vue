<template>
  <v-btn :loading="loading" @click="tmp">跳转</v-btn>
  <v-btn :loading="loading" @click="tmpB">测试</v-btn>
  <v-btn :loading="loading" @click="tmpC">测试2</v-btn>
  <v-btn :loading="loading" @click="tmpD">测试3</v-btn>
  <v-container class="fill-height background">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="400" src="@/assets/scdx.svg" />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">


import router from '../../router'
import { useBoardTCPStore } from '../../store/useBoardTCPStore'

const loading = ref(false)

function tmp() {
  router.replace('/UserListManage')
}

function tmpB() {
  useBoardTCPStore().CreatSocket(0, '192.168.0.100', 5000)
  useBoardTCPStore().StartBoard(0)
  useBoardTCPStore().GetCount(0).then((resolve) => {
    console.log(resolve)
  })
}

function tmpC() {
  useBoardTCPStore().GetCount(0).then((resolve) => {
    console.log(resolve)
  })
}
function tmpD() {
  useBoardTCPStore().DropSocket(0)
}
</script>

<style scoped>

</style>
