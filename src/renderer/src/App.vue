<template>
  <v-app>
    <component :is="currentLayout" v-if="isRouterLoaded">
      <router-view> </router-view>
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import initLayout from '@/layouts/init/Default.vue'
import defaultLayout from '@/layouts/default/Default.vue'
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
