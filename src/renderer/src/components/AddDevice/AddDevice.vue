<template>
  <v-dialog
    v-model="useAddDeviceStore().OpenAddDevice"
    :persistent = "!useAddDeviceStore().CanClose"
    width="auto"
  >
    <v-card
      class="mx-auto"
      width="800"
    >
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
      </v-card-title>
      <v-window v-model="useAddDeviceStore().step">
        <v-window-item :value="0">
          <v-card
            class="mx-auto"
            elevation="0"
            rounded="0">
            <v-card-text>
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                ></v-img>
                <h3 class="text-h6 font-weight-light mb-2">
                  欢迎使用源添加向导
                </h3>
                <span class="text-caption text-grey">请提前将待绑定设备接入源柜,然后点击开始</span>
              </div>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" @click="useAddDeviceStore().step=1">Start</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>

        <v-window-item :value="1">
          <AddSource_device_list></AddSource_device_list>
        </v-window-item>

        <v-window-item :value="2">
          <AddSource_cupboard_list></AddSource_cupboard_list>
        </v-window-item>

        <v-window-item :value="3">
          <v-card
            class="mx-auto"
            elevation="0"
            rounded="0">
            <v-card-text>
              <div class="pa-4 text-center">
                <v-img
                  class="mb-4"
                  contain
                  height="128"
                  src="https://cdn.vuetifyjs.com/images/logos/v.svg"
                ></v-img>
                <h3 class="text-h6 font-weight-light mb-2">
                  源信息添加完成
                </h3>
              </div>
            </v-card-text>
            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="flat" @click="Close">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed} from "vue";
import AddSource_cupboard_list from './AddDevice_cupboard_list.vue'
import AddSource_device_list from './AddDevice_device_list.vue'
import { useAddDeviceStore } from '../../store/useAddDeviceStore'

let currentTitle = computed(()=>{
  switch (useAddDeviceStore().step) {
    case 0:return '设备添加向导'
    case 1: return '设备信息'
    case 2: return '设备位置'
    default: return '添加完成'
  }
})
function Close(){
  useAddDeviceStore().$reset()
}
</script>

<style>

</style>
