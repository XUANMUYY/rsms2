<template>
  <ProcessList :ShowPerPage=12 :apply="apply" class="main-source-list"></ProcessList>
</template>

<script setup lang="ts">

import { useUserProcessStore } from '../../store/useUserProcessStore'
import ProcessList from '../../components/ProcessList.vue'
import { Ref, ref } from 'vue'

const apply:Ref<any[]> = ref([])

useUserProcessStore().GetApply()
useUserProcessStore().$subscribe((_arg,state)=>{
  apply.value = state.ApplyList
})
</script>

<style scoped>

</style>
