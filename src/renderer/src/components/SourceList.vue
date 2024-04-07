<template>
  <v-card style="margin: 10px; padding: 10px;height: 1000px">
    <v-data-iterator :items="sources"
                     :items-per-page=30
                     search="true"
                     :custom-filter="customFilter"
                     :no-filter="filter">
      <template v-slot:header>
        <v-card class="px-2" style="height: 80px;padding-top: 20px" color="miniBG">
          <v-row no-gutters>
            <v-col cols="2">
              <v-text-field
                v-model="search"
                clearable
                density="comfortable"
                hide-details
                placeholder="搜索"
                label="搜索"
                prepend-inner-icon="mdi-magnify"
                style="max-width: 300px;"
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn
                class="mx-4"
                variant="outlined"
                @click="useAddSourceStore().OpenAddSource = true;useAddSourceStore().RefreshSSID()">
                测试
              </v-btn>
            </v-col>
            <v-col cols="1">
              <v-btn
                class="mx-4"
                variant="outlined"
                @click="filter=!filter">
                筛选
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>

      <template v-slot:default="{ items }">
        <el-scrollbar height="860px" style="padding-left: 50px;" >
          <v-container class="pa-2" fluid>
            <v-row dense >
              <v-col
                v-for="source_item in items"
                :key="source_item.raw.SSID"
                cols="auto"
                md="4"
              >
                <SourceCard :source_item="source_item.raw"></SourceCard>
              </v-col>
            </v-row>
          </v-container >
        </el-scrollbar>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            density="comfortable"
            icon="mdi-arrow-left"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            density="comfortable"
            icon="mdi-arrow-right"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script setup lang="ts">
import { SourcesArray, SourcesFilterArray } from '../type'
import SourceCard from './SourceCard.vue'
// import {useAddSourceStore} from '../store/useAddSourceStore'
import { ref } from 'vue'
import { useAddSourceStore } from '../store/useAddSourceStore'

const search = ref(null)
const filter = ref(true)
defineProps<{
  sources: SourcesArray[]
}>()
let CustomFilter:SourcesFilterArray = {
  nuclide_type: 'EC'
}

const customFilter = (_value: string, _query: string, _item?: any)=>{
  let Correct = 1
  let keys = Object.entries(CustomFilter)
  for (let i = 0;i<keys.length;i++){
    if(typeof _item.raw[keys[i][0]] == typeof keys[i][1] && _item.raw[keys[i][0]]==keys[i][1]){Correct*=1}
    else {Correct*=0}
  }
  if(search.value!=null){
    const str:string = search.value
    if(str.length>0) {
      if(search.value!=_value){
        Correct*=0
      }
    }
  }
  return Correct==1
}
</script>

<style scoped>
</style>
