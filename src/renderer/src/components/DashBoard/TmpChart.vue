<template>
  <v-card width="550" class="pa-5 align-center text-center fill-height">
    <div id="wrapper">
      <div id="chart-line2">
        <apexchart type="line" height="230" :options="chartOptions" :series="series"></apexchart>
      </div>
      <div id="chart-line">
        <apexchart type="area" height="130" :options="chartOptionsLine" :series="seriesLine"></apexchart>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import { useTCPConnectStore } from '../../store/useTCPConnectStore'
import { Ref, ref } from 'vue'
const moment = require('moment')

useTCPConnectStore().TCPConnect("192.168.132.55",5000,"1")
useTCPConnectStore().TCPConnect("192.168.132.2",1347,"2")
useTCPConnectStore().TCPListenCMD("1")
useTCPConnectStore().TCPListen("2")
useTCPConnectStore().TCPSendCMD('1',[
  "12 34 EB 0E 00 89 00 01 00 00 AB CD",
  "12 34 00 00 00 00 00 00 00 00 AB CD",
  "12 34 01 01 01 00 00 00 00 00 AB CD",
  "12 34 02 01 01 00 00 00 00 00 AB CD",
  "12 34 07 02 01 00 00 00 00 00 AB CD",
])
useTCPConnectStore().TCPSend('2',["hello\n","world\n"])

let data:Ref<any[]> = ref([])

useTCPConnectStore().$subscribe((_arg,_state)=>{
  data.value.push([moment.unix(useTCPConnectStore().TCPGetResultCMD('1').TimeStamp).format("YYYY-MM-DD hh-mm-ss").toString(),useTCPConnectStore().TCPGetResultCMD('1').Count])
  console.log(data.value)
})
declare interface CountRate {
  TimeStamp: number;
  Count: number;
  Sample_Count_Total: number;
  CountRate: number;
}

const series= [{
  data: data.value
}]
const chartOptions={
  chart: {
    id: 'chart2',
    type: 'line',
    height: 230,
    toolbar: {
      autoSelected: 'pan',
      show: false
    }
  },
  colors: ['#546E7A'],
  stroke: {
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    opacity: 1,
  },
  markers: {
    size: 0
  },
  xaxis: {
    type: 'datetime',
    labels: {
      datetimeFormatter: {
        year: 'yyyy',
        month: 'MMM \'yy',
        day: 'dd MMM',
        hour: 'HH:mm'
      }
    }
  }
}

const seriesLine= [{
  data: data.value
}]
const chartOptionsLine= {
  chart: {
    id: 'chart1',
      height: 130,
      type: 'area',
      brush:{
      target: 'chart2',
        enabled: true
    },
    selection: {
      enabled: true,
        xaxis: {
        min: new Date('19 Jun 2017').getTime(),
          max: new Date('14 Aug 2017').getTime()
      }
    },
  },
  colors: ['#008FFB'],
    fill: {
    type: 'gradient',
      gradient: {
      opacityFrom: 0.91,
        opacityTo: 0.1,
    }
  },
  xaxis: {
    type: 'datetime',
      tooltip: {
      enabled: false
    }
  },
  yaxis: {
    tickAmount: 2
  }
}
</script>

<style scoped>

</style>
