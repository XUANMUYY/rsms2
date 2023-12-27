<template>
  <v-app-bar flat :order="1">
    <v-app-bar-title>
      <v-icon icon="mdi-circle-slice-6" />

      {{ title }}
    </v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts" setup>
defineProps({
  title: String
})
</script>
