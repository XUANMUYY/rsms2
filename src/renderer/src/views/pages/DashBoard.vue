<template>
  <v-card style="padding:40px;width:1200px;height:980px">
    <v-card style="width:800px;height:900px;" elevation="0">
      <perfect-scrollbar>
        <FullCalendar :options="calendarOptions">
        </FullCalendar>
      </perfect-scrollbar>
    </v-card>
    <v-btn @click="AddEvent">添加事件</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import momentPlugin from '@fullcalendar/moment'
import zhCnLocale from '@fullcalendar/core/locales/zh-cn'
import { ref } from 'vue'

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, momentPlugin],
  droppable: true,
  height: 800,
  titleFormat: 'MM-DD',
  weekNumbers:false,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'timeGridDay,timeGridWeek,dayGridMonth',
  },
  nowIndicator: true,
  locale: zhCnLocale,
  events: [] as any[],
  views: {
    dayGrid: {
      displayEventTime:false,
    },
    timeGrid: {
    },
    week: {
      displayEventTime:false,
      displayEventEnd:false,
      eventMaxStack:4
    },
    day: {
      displayEventTime:true,
      displayEventEnd:true,
      eventMaxStack:6
    }
  }
})

function AddEvent(){
  calendarOptions.value.events.push(
    {
      title: 'The Title',
      SSID: '8021',
      start: '2024-03-07 15:30',
      end: '2024-03-07 19:30',
    }
  )
}
</script>

<style scoped>
.ps {
  height: 900px;
}
</style>
