<template>
  <v-navigation-drawer expand-on-hover rail location="left">
    <UserInfoCard></UserInfoCard>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-list-item v-for="(button,key) in useSystemSettingStore().Router_Array[useUserDataStore().UserData.authority]" :key="key" :title="button.title" @click="click(button)">
        <template v-slot:prepend>
          <v-icon :icon="button.icon" :color="router.currentRoute.value.fullPath==button.to?'#EF5350':button.color"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useUserDataStore } from '../../store/useUserDataStore'
import UserInfoCard from '../../components/UserInfoCard.vue'
import { useSystemSettingStore } from '../../store/useSystemSettingStore'
import router from '../../router'
import { RouterArray } from '../../type'

function click(object:RouterArray){
  if (object.type == 'function'){
    const _function = new Function(object.to)
    _function()
  }
  if(object.type == 'web'){
    router.replace({ path: object.to })
  }
}

</script>

<style scoped>
</style>
