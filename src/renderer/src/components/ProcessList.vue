<template>
  <v-card style="margin: 10px; padding: 10px;">
    <v-data-iterator :items="apply" :items-per-page=ShowPerPage :search="search">
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
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <perfect-scrollbar>
          <v-container class="pa-2" fluid>
            <v-row dense >
              <v-col
                v-for="apply_item in items"
                :key="apply_item.raw.SSID"
                cols="2"
              >
                <ProcessCard :apply_item="apply_item.raw"></ProcessCard>
              </v-col>
            </v-row>
          </v-container >
        </perfect-scrollbar>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script setup lang="ts">
import { ApplyArray } from '../type'
import ProcessCard from './ProcessCard.vue'

let search = ref('')

defineProps<{
  ShowPerPage: number,
  apply: ApplyArray[]
}>()
</script>

<style scoped>
.ps {
  height: 880px;
}
</style>
