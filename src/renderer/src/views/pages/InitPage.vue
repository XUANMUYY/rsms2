<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="250" src="@/assets/logo.svg" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">RSMS</h1>
      <Loading></Loading>
      <div class="text-body-2 font-weight-light mb-n1"></div>
      <div class="py-4" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            @click="Init"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-view-dashboard" size="large" start />

            初始化
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            @click="Show"
            min-width="228"
            rel="noopener noreferrer"
            size="x-large"
            target="_blank"
            variant="flat"
          >
            <v-icon icon="mdi-speedometer" size="large" start />

            启动
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            @click="User"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-account-group" size="large" start />

            注册
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script lang="ts" setup>
import Loading from "@/components/Loading.vue";

import {useInitSQLStore} from '../../store/useInitSQL'

useInitSQLStore().InitSQL()

window.api.onReadyToShowMain((_value) => {
  console.log("OK")
})
function Init(){
  window.api.initMain()
}
function Show(){
  window.api.showMain()
}
function User(){
  useInitSQLStore().InitUser()
}
</script>
