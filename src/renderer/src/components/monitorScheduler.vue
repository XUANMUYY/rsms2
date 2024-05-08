<template>
  <v-navigation-drawer
    location="right"
    v-model="Scheduler.monitorDrawer"
    temporary
    permanent
    floating
    rail
    rail-width="0"
    style="height: 720px;width: 720px"
    color="transparent"
    elevation="0"
  >
    <v-row no-gutters>
      <v-col cols="1">
        <v-card style="padding-top: 20px;padding-bottom: 20px;margin-top: 10px;margin-bottom: 10px" color="transparent" elevation="0">
          <template v-slot:text>
            <v-icon
              icon="mdi-chevron-right"
              size="60"
              color="#6a6a6a"
              class="me-1 pb-1"
              @click.stop="Scheduler.monitorDrawer = !Scheduler.monitorDrawer"
            ></v-icon>
          </template>
        </v-card>
      </v-col>
      <v-col cols="11">
        <v-card style="padding: 20px;margin: 10px">
          <template v-slot:text>
            <v-row no-gutters>
              <v-col cols="2">
                状态
              </v-col>
              <v-col cols="10">
                <v-row no-gutters>
                  <v-col v-for="(channel,i) in Scheduler.queue0status" :key="i">
                    <v-status :bg-color="status[channel?'READY':'OUT']"></v-status>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                使能
              </v-col>
              <v-col cols="10">
                <v-row no-gutters>
                  <v-col v-for="(channel,i) in Scheduler.queue0enable" :key="i">
                    <v-status :bg-color="status[channel?'READY':'OUT']"></v-status>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2">
                队列
              </v-col>
              <v-col cols="10">
                <v-row no-gutters>
                  <v-col v-for="(channel,i) in Scheduler.queue0count" :key="i">
                    <v-tooltip
                      :text="channel as unknown as string+ ` `"
                      activator="parent"
                      location="bottom">
                      <template v-slot:activator="{ props }">
                        <v-status v-bind:props :bg-color="countStatus(channel)"></v-status>
                      </template>
                      </v-tooltip>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card style="padding: 20px;margin: 10px">
          <template v-slot:text>
            <tmp-echarts></tmp-echarts>
          </template>
        </v-card>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useSchedulerStore } from '../store/useSchedulerStore'
import { useSystemSettingStore } from '../store/useSystemSettingStore'

const Scheduler = useSchedulerStore()

const status:{ [KEY:string]: string} = {
  'READY': '#77ff8e',
  'ALARM': '#ff4d4d',
  'PROCESS': '#81bfff',
  'PROCESS-PASS': '#81bfff',
  'OUT': '#6a6a6a',
}

const countStatus = (count:number):string=> {
  const min = useSystemSettingStore().SystemSetting['源柜通讯设置']['调度器队列累计下限'].value
  const max = useSystemSettingStore().SystemSetting['源柜通讯设置']['调度器队列累计上限'].value
  if(count<=min) return "#77ff8e"
  if(min<count&&count<=Math.round(min+(max-min)/8)) return "#96f68e"
  if(Math.round(min+(max - min)/8)< count&&count<=Math.round(min+2*(max-min)/8)) return "#b6ed8e"
  if(Math.round(min+2*(max-min)/8)<count&&count<=Math.round(min+3*(max-min)/8)) return "#d5e48d"
  if(Math.round(min+3*(max-min)/8)<count&&count<=Math.round(min+4*(max-min)/8)) return "#f4db8d"
  if(Math.round(min+4*(max-min)/8)<count&&count<=Math.round(min+5*(max-min)/8)) return "#f5b78a"
  if(Math.round(min+5*(max-min)/8)<count&&count<=Math.round(min+6*(max-min)/8)) return "#f69387"
  if(Math.round(min+6*(max-min)/8)<count&&count<=Math.round(min+7*(max-min)/8)) return "#f86f84"
  if(Math.round(min+7*(max-min)/8)<count&&count<=Math.round(min+8*(max-min)/8)) return "#f94b81"
  if(count>min+8*(max-min)/8) return "#ff4d4d"
  else return "#6a6a6a"
}
</script>

<style scoped>

</style>
