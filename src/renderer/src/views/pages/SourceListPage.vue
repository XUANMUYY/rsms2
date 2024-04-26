<template>
  <main-source-list :ShowPerPage=ShowPerPage :sources="sources" class="main-source-list"></main-source-list>
  <apply-source></apply-source>
  <AddSource></AddSource>
  <FindWhoUsingSource></FindWhoUsingSource>
</template>

<script setup lang="ts">
import { Ref } from 'vue'
import MainSourceList from '../../components/SourceList.vue'
import { useSourceArrayStore } from '../../store/useSourceArrayStore'
import { SourcesArray } from '../../type'
import AddSource from '../../components/AddSource/AddSource.vue'
import ApplySource from '../../components/ApplySource.vue'

let sources:Ref<SourcesArray[]> = ref([])
let ShowPerPage:Ref<number> = ref(12)

useSourceArrayStore().$subscribe((_args, state) => {
  sources.value = state.SourceArray
})

onMounted(async () => {
  await useSourceArrayStore().UpdateSourceArray()
})

</script>

<style>

</style>
