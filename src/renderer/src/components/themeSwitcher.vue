<script setup lang="ts">
import { useSystemSettingStore } from '../store/useSystemSettingStore'

const toggleTheme = () => useSystemSettingStore().SystemSetting['系统设置']['主题设置'].value =  useSystemSettingStore().SystemSetting['系统设置']['主题设置'].value === 'light' ? 'dark' : 'light'
</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props" @click="toggleTheme">
        <v-icon color="primary">mdi-theme-light-dark</v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>
