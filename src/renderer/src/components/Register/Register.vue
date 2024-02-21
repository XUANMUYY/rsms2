<template>
  <v-card class="mx-auto pa-12 pb-8"
          elevation="8"
          width="448"
          rounded="lg">
    <v-card-title class="text-h6 font-weight-regular justify-space-between">
      <span>{{ currentTitle }}</span>
    </v-card-title>

    <v-window v-model="useUserDataStore().Register_step">
      <v-window-item :value="1">
        <AuthorityWindows></AuthorityWindows>
      </v-window-item>

      <v-window-item :value="2">
        <CardWindows></CardWindows>
      </v-window-item>

      <v-window-item :value="3">
        <UserWindows></UserWindows>
      </v-window-item>

      <v-window-item :value="4">
        <PasswordWindows></PasswordWindows>
      </v-window-item>

      <v-window-item :value="5">
        <div class="pa-4 text-center">
          <v-img
            class="mb-4"
            contain
            height="128"
            src="https://cdn.vuetifyjs.com/images/logos/v.svg"
          ></v-img>
          <h3 class="text-h6 font-weight-light mb-2">Welcome to Vuetify</h3>
          <span class="text-caption text-grey">Thanks for signing up!</span>
        </div>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import {  computed } from 'vue'
import { useUserDataStore } from '../../store/useUserDataStore'
import AuthorityWindows from './AuthorityWindows.vue'
import CardWindows from './CardWindows.vue'
import UserWindows from './UserWindows.vue'
import PasswordWindows from './PasswordWindows.vue'

useUserDataStore().Register_step = 1
useUserDataStore().UserRegister = {
  UserResult: false,
  CardResult: false,
  authority: 'guest',
  Card: '',
  User: '',
  name: '',
  password: '',
  Result:0}
useUserDataStore().RefreshRegister()

const currentTitle = computed(() => {
  switch (useUserDataStore().Register_step) {
    case 1:
      return '注册权限'
    case 2:
      return '卡片信息'
    case 3:
      return '账号信息'
    case 4:
      return '设置密码'
    default:
      return '注册成功'
  }
})
</script>

<style>

</style>
