<template>
  <v-textarea label="" variant="outlined" v-model="TCP1" row-height="15">
  </v-textarea>
  <v-textarea label="" variant="outlined" v-model="TCP2" row-height="15">
  </v-textarea>
</template>

<script setup lang="ts">
import { useTCPConnectStore } from '../../store/useTCPConnectStore'

const TCP1 = ref("")
const TCP2 = ref("")

useTCPConnectStore().$subscribe((_arg,_state)=>{
  TCP1.value = useTCPConnectStore().TCPGet('1').Result
  TCP2.value = useTCPConnectStore().TCPGet('2').Result

})

</script>

<style scoped>

</style>
