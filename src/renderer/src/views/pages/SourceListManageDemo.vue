<template>
  <v-card height="80%" class="ma-lg-16">
    <v-container>
      <v-row>
        <v-col>
          <v-btn
            class="mx-4"
            variant="outlined"
            @click="useAddSourceStore().OpenAddSource = true;useAddSourceStore().RefreshSSID();">
            添加源与设备
          </v-btn>
          <v-btn
            class="mx-4"
            variant="outlined"
            @click="()=>{useAddDeviceStore().OpenAddDevice=true;useAddDeviceStore().RefreshDeviceID()}">
            添加设备
          </v-btn>
          <v-btn
            class="mx-4"
            variant="outlined"
            @click="router.replace('/SourcesListManage')">
            放射源数据库管理
          </v-btn>
          <v-btn
            class="mx-4"
            variant="outlined"
            @click="router.replace('/DeviceListManage')">
            下位机设备数据库管理
          </v-btn>
          <v-btn
            class="mx-4"
            variant="outlined"
            @click="router.replace('/CupboardListManage')">
            源柜设备数据库管理
          </v-btn>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <AddSource></AddSource>
  <AddDevice></AddDevice>
</template>

<script setup lang="ts">
import { useAddSourceStore } from '../../store/useAddSourceStore'
import AddSource from '../../components/AddSource/AddSource.vue'
import { useAddDeviceStore } from '../../store/useAddDeviceStore'
import router from '../../router'
</script>

<style>

</style>
