<template>
  <v-card style="margin: 10px; padding: 10px">
    <v-data-iterator :items="sources" :items-per-page="12" :search="search">
      <template v-slot:header>
        <v-toolbar class="px-2">
          <v-text-field
            v-model="search"
            clearable
            density="comfortable"
            hide-details
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="solo"
          ></v-text-field>
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
              <v-card
                class="pb-3 SourceCard"
                :ripple="false"
                border
                max-width="400px"
                v-on:click="console.log(source_item.raw.SSID)"
              >
                <v-card-item>
                  <template v-slot:subtitle>
                    <div class="d-flex py-3 justify-space-between">
                      <h4 class="text-h5">{{source_item.raw.SSID}}</h4>
                      <h4 :class="`text-h6 font-weight-bold ${statusSubtitleColor[source_item.raw.SourceStatus]}`">
                        {{statusSubtitle[source_item.raw.SourceStatus]}}
                      </h4>
                    </div>
                    <h4 class="text-h4">
                      <v-icon
                        icon="mdi-radioactive"
                        size="32"
                        color="black"
                        class="me-1 pb-1"
                      ></v-icon
                      >{{source_item.raw.nuclide_name}}
                    </h4>
                  </template>
                </v-card-item>

                <v-card-text class="py-0">
                  <v-row align="center" no-gutters>
                    <v-col class="text-h2" cols="8">
                      {{source_item.raw.nuclide}}
                      {{source_item.raw.nuclide_quality}}
                    </v-col>
                    <v-col cols="2" class="text-right">
                      <svg
                        class="icon"
                        viewBox="0 0 1142 1024"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100"
                        height="100"
                      >
                        <path
                          d="M854.16216514 302.23764697c0-27.93277059-17.77539973-46.97784132-19.04507074-48.24751229l-106.65239555-106.65239554c15.23605771-6.34835783 26.66309961-21.5844127 26.66309677-39.35981248v-100.30403772c0-22.85408377-19.04507074-41.8991545-41.89915446-41.89915727h-283.13671613c-22.85408377 0-41.8991545 19.04507074-41.89915449 41.89915727v100.30403772c0 17.77539973 10.15737088 33.01145461 26.66309677 38.09014144l-106.6523927 106.65239555c-1.26967099 1.26967099-19.04507074 19.04507074-19.04507074 46.97784134v675.46516985c0 31.74178361 26.66309961 58.40488322 58.4048832 58.4048832h449.46366589c31.74178361 0 58.40488322-26.66309961 58.4048832-58.4048832l-1.26967102-672.92582787z m-206.95643608 524.37427784h-307.26047084v-366.93502794h307.26047084v366.93502794z"
                          :fill=status[source_item.raw.SourceStatus]
                        ></path>
                      </svg>
                    </v-col>
                  </v-row>
                </v-card-text>

                <div class="d-flex py-3 justify-space-between">
                  <v-list-item density="compact" prepend-icon="mdi-nuke">
                    <v-list-item-subtitle class="text-h6"
                    >{{source_item.raw.nuclide_type}}</v-list-item-subtitle
                    >
                  </v-list-item>

                  <v-list-item
                    density="compact"
                    prepend-icon="mdi-speedometer-medium"
                  >
                    <v-list-item-subtitle class="text-h6"
                    >{{source_item.raw.nuclide_rate}} Bq</v-list-item-subtitle
                    >
                  </v-list-item>
                </div>

                <v-expand-transition>
                  <div v-if="expand === source_item.raw.SSID">
                    <v-list class="bg-transparent">
                      <v-list-item
                        v-for="energy_item in source_item.raw.nuclide_energy"
                        :key="energy_item[0]"
                        :title="`${energy_item[1]}kev`"
                        :subtitle="`${energy_item[2]}%`"
                      >
                      </v-list-item>
                    </v-list>
                  </div>
                </v-expand-transition>
                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn
                    variant="plain"
                    elevation="4"
                    @click="()=>{if(expand !== source_item.raw.SSID){expand = source_item.raw.SSID}else{expand = ''}}"
                  >
                    {{ expand!== source_item.raw.SSID ? 'Full Report' :
                    'HideReport' }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            icon="mdi-arrow-left"
            density="comfortable"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            icon="mdi-arrow-right"
            density="comfortable"
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
import { SourcesArray } from '../type'

const status = {
  'READY': '#77ff8e',
  'ALARM': '#ff4d4d',
  'PROCESS': '#81bfff',
  'PROCESS-PASS': '#81bfff',
  'OUT': '#6a6a6a',
}
const statusSubtitle = {
  'READY': '在库',
  'ALARM': '异常',
  'PROCESS': '审核',
  'PROCESS-PASS': '待取',
  'OUT': '借出',
}
const statusSubtitleColor = {
  'READY': 'text-light-green',
  'ALARM': 'text-red',
  'PROCESS': 'text-light-blue',
  'PROCESS-PASS': 'text-light-blue',
  'OUT': '',
}
let search = ref('')
let expand = ref('')
defineProps<{
  sources: SourcesArray[]
}>()
</script>

<style scoped>
*{
  user-select:none;
}
.SourceCard{
  transition: all 120ms;
  box-shadow: 6px 6px 9px #a4a4a4, -6px -6px 9px #ffffff;
}
.SourceCard:hover::after {
  bottom: 0;
  opacity: 1;
}

.SourceCard:hover {
  border: 1px solid black;
  transform: scale(1.05);
}

.SourceCard:active {
  transform: scale(0.98);
}

</style>
