<template>
  <v-card
    class="pb-3 SourceCard"
    :ripple="false"
    border
    max-width="500px"
    v-on:click="useSourceListStatusStore().ChooseSource = source_item"
  >
    <v-card-item>
      <template v-slot:subtitle>
        <div class="d-flex py-3 justify-space-between">
          <h4 class="text-h5">{{source_item.SSID}}</h4>
          <h4 :class="`text-h6 font-weight-bold ${statusSubtitleColor[source_item.SourceStatus]}`">
            {{statusSubtitle[source_item.SourceStatus]}}
          </h4>
        </div>
        <h4 class="text-h4">
          <v-row no-gutters justify="space-between">
            <v-col cols="2">
              <v-icon
                icon="mdi-radioactive"
                size="32"
                color="black"
                class="me-1 pb-1"
              ></v-icon
              >{{source_item.nuclide_name}}
            </v-col>
            <v-col cols="2">
              No.{{source_item.nuclide_id}}
            </v-col>
          </v-row>
        </h4>
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="8">
          {{source_item.nuclide}}
          {{source_item.nuclide_quality}}
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
              :fill=status[source_item.SourceStatus]
            ></path>
          </svg>
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 justify-space-between">
      <v-list-item density="compact" prepend-icon="mdi-nuke">
        <v-list-item-subtitle class="text-h6"
        >{{source_item.nuclide_type}}</v-list-item-subtitle
        >
      </v-list-item>

      <v-list-item
        density="compact"
        prepend-icon="mdi-speedometer-medium"
      >
        <v-list-item-subtitle class="text-h6"
        >{{source_item.nuclide_rate}} Bq</v-list-item-subtitle
        >
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="useSourceListStatusStore().expand === source_item.SSID+'info'">
        <v-list class="bg-transparent">
          <v-list-item
            v-for="energy_item in source_item.nuclide_energy"
            :key="energy_item[0]"
            :title="`${energy_item[1]}kev`"
            :subtitle="`${energy_item[2]}%`"
          >
          </v-list-item>
        </v-list>
      </div>
      <div v-if="useSourceListStatusStore().expand === source_item.SSID+'bind'">
        <v-card elevation="0">
          <v-expansion-panels variant="accordion">
            <v-expansion-panel v-for="(value, key) in bindItems" :key="key" :title="key as unknown as string">
              <template v-slot:text>
                <v-card elevation="0" >
                  <v-card-text>
                    <v-card color="miniBG" elevation="0">
                      <v-row no-gutters>
                        <v-col
                          v-for="(subValue, subKey) in value"
                          :key="subKey"
                          cols="12">
                          <div class="d-flex py-3 justify-space-between" style="height: 60px">
                            <v-list-item density="compact" class="text-h7">
                              <v-list-item-title >
                                {{ subKey }}
                              </v-list-item-title>
                            </v-list-item>

                            <v-list-item density="compact">
                              <v-list-item-title >
                                {{ subValue }}
                              </v-list-item-title>
                            </v-list-item>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-card-text>
                </v-card>
              </template>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </div>
    </v-expand-transition>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        variant="plain"
        elevation="4"
        @click="()=>{if(useSourceListStatusStore().expand !== source_item.SSID+'info'){useSourceListStatusStore().expand = source_item.SSID+'info'}else{useSourceListStatusStore().expand = ''}}"
      >
        {{ useSourceListStatusStore().expand!== source_item.SSID+'info' ? '更多信息' :
        '隐藏信息' }}
      </v-btn>
      <v-btn
        variant="plain"
        :loading="bindLoading"
        elevation="4"
        @click="getBindItem(source_item)">
        {{ useSourceListStatusStore().expand!== source_item.SSID+'bind' ? '绑定信息' :
        '隐藏信息' }}
      </v-btn>
      <v-btn
        variant="plain"
        elevation="4"
        v-if="source_item.SourceStatus=='READY'&&(useUserDataStore().UserData.authority === 'root'||useUserDataStore().UserData.authority === 'normal')"
        @click="useSourceListStatusStore().OpenApplySheet = true;useUserDataStore().RefreshApply();"
      >
        预约
      </v-btn>
      <v-btn
        variant="plain"
        elevation="4"
        v-if="source_item.SourceStatus!='READY'&&(useUserDataStore().UserData.authority === 'root'||useUserDataStore().UserData.authority === 'normal')"
        @click="UseFindWhoUsingSourceStore().open=true;UseFindWhoUsingSourceStore().Find(source_item.SSID)"
      >
        查询
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import {SourcesArray } from '../type'
import { useSourceListStatusStore } from '../store/useSourceListStatusStore'
import { useUserDataStore } from '../store/useUserDataStore'
import { useSourceArrayStore } from '../store/useSourceArrayStore'
import { UseFindWhoUsingSourceStore } from '../store/UseFindWhoUsingSourceStore'

defineProps<{
  source_item:SourcesArray,
}>()
const bindLoading = ref(false)
const status:{ [KEY:string]: string} = {
  'READY': '#77ff8e',
  'ALARM': '#ff4d4d',
  'PROCESS': '#81bfff',
  'PROCESS-PASS': '#81bfff',
  'OUT': '#6a6a6a',
}
const statusSubtitle:{ [KEY:string]: string} = {
  'READY': '在库',
  'ALARM': '异常',
  'PROCESS': '审核',
  'PROCESS-PASS': '待取',
  'OUT': '借出',
}
const statusSubtitleColor:{ [KEY:string]: string} = {
  'READY': 'text-light-green',
  'ALARM': 'text-red',
  'PROCESS': 'text-light-blue',
  'PROCESS-PASS': 'text-light-blue',
  'OUT': '',
}
const bindItems = ref({
  "设备":{
    "设备编号":"",
    "IP":"",
    "端口":""
  },
  "源柜":{
    "编号":""
  }
})

const getBindItem = (source_item) => {
  if (useSourceListStatusStore().expand !== source_item.SSID + 'bind') {
    bindLoading.value = true
    setTimeout(()=>{
      useSourceArrayStore().getBind(source_item.SSID).then((callBack)=>{
        const object:object = callBack
        if (object.hasOwnProperty('device_id')) {
          bindItems.value = {
            '设备': {
              '设备编号': callBack.device_id,
              'IP': callBack.wiz_ip,
              '端口': callBack.wiz_port
            },
            '源柜': {
              '编号': callBack.cupbox_id
            }
          }
          bindLoading.value = false
          useSourceListStatusStore().expand = source_item.SSID + 'bind'
        }else{
          bindLoading.value = false
          useSourceListStatusStore().expand = ''
        }
      })
    },100)
  }
  else {
    useSourceListStatusStore().expand = ''
  }
}
</script>

<style scoped>
.SourceCard{
  box-shadow: 6px 6px 9px #a4a4a4, -6px -6px 9px #ffffff;
}


</style>
