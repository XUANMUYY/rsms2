<template>
<v-container>
  <v-row>
    <v-col cols="12">
      <TmpEcharts></TmpEcharts>
    </v-col>
    <v-col cols="6">
      <TmpTCP></TmpTCP>
    </v-col>
  </v-row>
</v-container>
</template>

<script setup lang="ts">
import TmpTCP from '../../components/DashBoard/TmpTCP.vue'
import TmpEcharts from '../../components/DashBoard/TmpEcharts.vue'
</script>

<style scoped>

</style>
