<template>
  <main-source-list :sources="sources"></main-source-list>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import MainSourceList from '@/components/SourceList.vue'
import { useSourceArrayStore} from '../../store/useSourceArrayStore'
import { SourcesArray } from '../../type'

let sources:Ref<SourcesArray[]> = ref([])
useSourceArrayStore().$subscribe((_args, state) => {
  sources.value = state.SourceArray
})

onMounted(async () => {
  await useSourceArrayStore().UpdateSourceArray()
})

</script>

<style scoped>

</style>
