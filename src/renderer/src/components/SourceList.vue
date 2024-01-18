<template>
  <v-card style="margin: 10px; padding: 10px;height: 98%">
    <v-data-iterator :items="sources" :items-per-page=ShowPerPage :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            clearable
            density="comfortable"
            hide-details
            placeholder="搜索"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="solo"
          ></v-text-field>
          <v-btn
            class="mx-4"
            variant="outlined"
            @click="useSourceListStatusStore().OpenAddSource = true;useAddSourceStore().RefreshSSID()">
            测试
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col
              v-for="source_item in items"
              :key="source_item.raw.SSID"
              cols="auto"
              md="4"
            >
              <SourceCard :source_item="source_item.raw"></SourceCard>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-iterator>
  </v-card>
  <apply-source></apply-source>
  <AddSource></AddSource>
</template>

<script setup lang="ts">
import { SourcesArray, SourcesFilterArray } from '../type'
import SourceCard from './SourceCard.vue'
import ApplySource from './ApplySource.vue'
// import {useAddSourceStore} from '../store/useAddSourceStore'
import AddSource from './AddSource/AddSource.vue'
import { ref } from 'vue'
import { useSourceListStatusStore } from '../store/useSourceListStatusStore'
import { useAddSourceStore } from '../store/useAddSourceStore'

let search = ref('')
let CustomFilter:SourcesFilterArray = {
  nuclide_rate: '2.7E12',
  nuclide_type: 'EC-K'
}

const Props = defineProps<{
  ShowPerPage: number,
  sources: SourcesArray[]
}>()

console.log( Props.sources.find(_source=>{
  let Correct = 1
  let keys = Object.entries(CustomFilter)
  if(keys.length==0){
    return false
  }
  for (let i = 0;i<keys.length;i++){
    if(typeof _source[keys[i][0]] == typeof keys[i][1] && _source[keys[i][0]]==keys[i][1]){Correct*=1}
    else {Correct*=0}
  }
  return Correct == 1
}))
</script>

<style scoped>
*{
  user-select:none;
}
</style>
