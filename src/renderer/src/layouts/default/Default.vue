<template>
  <v-app>
    <default-bar :title = title />
    <default-drawer />
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
const title = "源库管理系统"
import DefaultBar from './AppBar.vue'
import DefaultDrawer from './LeftDrawer.vue'
import DefaultView from './View.vue'
</script>

<style lang="scss">
</style>
