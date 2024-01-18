<template>
  <v-navigation-drawer location="left">
    <v-list-item title="RSMS" :subtitle="useUserDataStore().UserData.name"></v-list-item>
    <v-list-item title="登录" :subtitle="useUserDataStore().UserData.name" @click="useUserDataStore().Login = true"></v-list-item>
    <UserInfoCard></UserInfoCard>
    <v-divider></v-divider>
    <v-list-item link title="源库" to="/SourceList"></v-list-item>
    <v-list-item link title="源库管理测试" to="/ManageDemo"></v-list-item>
    <v-list-item link title="读卡测试" to="/CardDemo"></v-list-item>
    <v-list-item link title="初始化" to="/Init"></v-list-item>
    <v-list-item link title="源柜" to="/CupBoard"></v-list-item>
    <v-list-item link title="源柜测试" to="/CupBoardDemo"></v-list-item>
    <v-list-item link title="探测器初始化" to="/DetectorInit"></v-list-item>
    <v-list-item link title="退出" @click="windows_close"></v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useUserDataStore } from '../../store/useUserDataStore'
import UserInfoCard from '../../components/UserInfoCard.vue'

function windows_close(){
  window.api.windows_close()
}
</script>

<style scoped></style>
