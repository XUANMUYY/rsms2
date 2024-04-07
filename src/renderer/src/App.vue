<template>
  <v-app :theme="useSystemSettingStore().SystemSetting['系统设置']['主题设置'].value">
    <component :is="currentLayout" v-if="isRouterLoaded">
      <router-view> </router-view>
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import initLayout from './layouts/init/Default.vue'
import defaultLayout from './layouts/default/Default.vue'
import { useSystemSettingStore } from './store/useSystemSettingStore'
const route = useRoute()
const isRouterLoaded = computed(() => {
  return route.name !== null
})
const layouts = {
  default: defaultLayout,
  SourceList:defaultLayout,
  Init: initLayout,
  CardDemo:defaultLayout
}
type LayoutName = 'default' | 'init'|'SourceList'|'CardDemo'
const currentLayout = computed(() => {
  const layoutName = route.meta.layout as LayoutName
  if (!layoutName||!layouts[layoutName]) {
    return layouts['default']
  }
  return layouts[layoutName]
})
</script>

<style>
</style>
