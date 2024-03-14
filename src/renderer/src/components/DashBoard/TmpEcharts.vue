<template>
  <v-chart style="height: 400px;" :option="option" @click=""></v-chart>
  <v-btn @click="EChart()">
    加载
  </v-btn>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue'
import { useTCPConnectStore } from '../../store/useTCPConnectStore'
const moment = require('moment')

function EchartsOption(data,type?:'CountRate'|'ADCPulse'){
  const Empty = {}
  const CountRate = {
    title: {
      text: '计数率',
      left: '1%'
    },
    grid: {
      left: '5%',
      right: '15%',
      bottom: '10%'
    },
    xAxis: {
      type: 'time',
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {},
    toolbox: {
      right: 10,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        restore: {},
        saveAsImage: {}
      }
    },
    dataZoom: [
      {
        type: 'inside'
      },
      {
        handleIcon:
          'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5M36.9,35.8h-1.3z M27.8,35.8 h-1.3H27L27.8,35.8L27.8,35.8z'
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    visualMap: {
      top: 50,
      right: 10,
      pieces: [
        {
          gt: 0,
          lte: 50,
          color: '#93CE07'
        },
        {
          gt: 50,
          lte: 100,
          color: '#FBDB0F'
        },
        {
          gt: 100,
          lte: 150,
          color: '#FC7D02'
        },
        {
          gt: 150,
          lte: 200,
          color: '#FD0100'
        },
        {
          gt: 200,
          lte: 300,
          color: '#AA069F'
        },
        {
          gt: 300,
          color: '#AC3B2A'
        }
      ],
      outOfRange: {
        color: '#999'
      }
    },
    series: {
      name: '实时计数率',
      type: 'line',
      data: data,
      markLine: {
        silent: true,
        lineStyle: {
          color: '#333'
        },
        data: [
          {
            yAxis: 50
          },
          {
            yAxis: 100
          },
          {
            yAxis: 150
          },
          {
            yAxis: 200
          },
          {
            yAxis: 300
          }
        ]
      }
    }
  }
  const ADCPulse = {
    xAxis: {
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'line',
        smooth: true
      }
    ]
  }

  switch (type){
    case 'ADCPulse':
      return ADCPulse
    case 'CountRate':
      return CountRate
    default :
      return Empty
  }
}

let data: Ref<any[]> = ref([])
let option = ref(EchartsOption(data.value))

function EChart(){
  useTCPConnectStore().TCPConnect('192.168.132.55', 5000, '1')
  useTCPConnectStore().TCPConnect('192.168.132.2', 1347, '2')
  useTCPConnectStore().TCPListenCMD('1')
  useTCPConnectStore().TCPListen('2')
  useTCPConnectStore().TCPSendCMD('1', [
    '12 34 EB 0E 00 89 00 01 00 00 AB CD',
    '12 34 00 00 00 00 00 00 00 00 AB CD',
    '12 34 01 01 01 00 00 00 00 00 AB CD',
    '12 34 02 01 01 00 00 00 00 00 AB CD',
    '12 34 07 02 01 00 00 00 00 00 AB CD'
  ])
  useTCPConnectStore().TCPSend('2', ['hello\n', 'world\n'])
  useTCPConnectStore().$subscribe((_arg, _state) => {
    if (useTCPConnectStore().TCPGetResultCMD('1').CountRateStatus) {
      data.value.push([moment.unix(useTCPConnectStore().TCPGetResultCMD('1').TimeStamp).format('YYYY-MM-DD hh:mm:ss').toString(), useTCPConnectStore().TCPGetResultCMD('1').CountRate])
      option.value = EchartsOption(data.value,'CountRate')
    }
    if (useTCPConnectStore().TCPGetResultCMD('1').ADCPulseStatus) {
      data.value.push([useTCPConnectStore().TCPGetResultCMD('1').Index, useTCPConnectStore().TCPGetResultCMD('1').Ch])
      option.value = EchartsOption(data.value,'ADCPulse')
    }
  })
}

</script>

<style scoped>

</style>
