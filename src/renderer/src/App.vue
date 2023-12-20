<template>
  <v-app>
    <component :is="currentLayout" v-if="isRouterLoaded">
      <router-view> </router-view>
    </component>
  </v-app>
</template>

<script lang="ts" setup>
import initLayout from '@/layouts/init/Default.vue'

const route = useRoute()
const isRouterLoaded = computed(() => {
  return route.name !== null
})

const layouts = {
  default: initLayout,
  init: initLayout
}

type LayoutName = 'default' | 'init'

const currentLayout = computed(() => {
  const layoutName = route.meta.layout as LayoutName
  if (!layoutName) {
    return layouts['default']
  }
  return layouts[layoutName]
})
</script>
