<template>
<v-card height="80%" class="ma-lg-16">
  <v-container>
    <v-row>
      <v-col>
        <v-btn
          class="mx-4"
          variant="outlined"
          @click="useSourceListStatusStore().OpenAddSource = true;useAddSourceStore().RefreshSSID()">
          添加源
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</v-card>
  <AddSource></AddSource>
</template>

<script setup lang="ts">

import { useSourceListStatusStore } from '../../store/useSourceListStatusStore'
import { useAddSourceStore } from '../../store/useAddSourceStore'
import AddSource from '../../components/AddSource/AddSource.vue'
</script>

<style>

</style>
