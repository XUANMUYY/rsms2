<template>
  <v-dialog
    v-model="useSourceListStatusStore().OpenAddSource"
    :persistent = "!useAddSourceStore().CanClose"
    width="auto"
  >
    <v-card
      class="mx-auto"
      width="800"
    >
      <v-card-title class="text-h6 font-weight-regular justify-space-between">
        <span>{{ currentTitle }}</span>
      </v-card-title>

      <v-window v-model="useAddSourceStore().step">
        <v-window-item :value="1">
          <AddSource_sources_list></AddSource_sources_list>
        </v-window-item>

        <v-window-item :value="2">
          <AddSource_device_list></AddSource_device_list>
        </v-window-item>

        <v-window-item :value="3">
          <AddSource_cupboard_list></AddSource_cupboard_list>
        </v-window-item>

        <v-window-item :value="4">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light mb-2">
              Welcome to Vuetify
            </h3>
            <span class="text-caption text-grey">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed} from "vue";
import AddSource_sources_list from "../../components/AddSource/AddSource_sources_list.vue";
import { useSourceListStatusStore } from '../../store/useSourceListStatusStore'
import AddSource_cupboard_list from './AddSource_cupboard_list.vue'
import AddSource_device_list from './AddSource_device_list.vue'
import { useAddSourceStore } from '../../store/useAddSourceStore'

let currentTitle = computed(()=>{
  switch (useAddSourceStore().step) {
    case 1: return '源信息'
    case 2: return '源设备'
    case 3: return '源位置'
    default: return 'Account created'
  }
})
</script>

<style>

</style>
