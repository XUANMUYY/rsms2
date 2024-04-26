<template>
  <v-dialog
    v-model="UseFindWhoUsingSourceStore().open"
    width="auto"
  >
    <v-card
      max-width="400"
      prepend-icon="mdi-update"
    >
      <v-card-text>
        {{UseFindWhoUsingSourceStore().UserDara.name+`正在使用，预计`+UseFindWhoUsingSourceStore().UserDara.last_time+`归还`}}
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

import { UseFindWhoUsingSourceStore } from '../store/UseFindWhoUsingSourceStore'
</script>

<style scoped>

</style>
