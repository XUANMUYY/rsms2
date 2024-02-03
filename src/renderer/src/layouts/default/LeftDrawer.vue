<template>
  <v-navigation-drawer expand-on-hover rail location="left">
    <v-list>
      <v-list-item >
        <template v-slot:prepend>
          <v-icon :style="{ color: useUserDataStore().UserStatus=='Login' ? '#EF5350' : '#546E7A' }">mdi-account</v-icon>
        </template>
        <v-card
          class="mx-auto"
          max-width="344"
          :title="useUserDataStore().UserData.name==''?'未登入':useUserDataStore().UserData.name"
          :subtitle="authority_text[useUserDataStore().UserData.authority]"
        >
          <template v-slot:actions>
            <v-btn v-if="useUserDataStore().UserStatus=='Login'" @click="useUserDataStore().Clear()">登出</v-btn>
            <v-btn v-else @click="useUserDataStore().Login = true">登入</v-btn>
          </template>
        </v-card>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-data-iterator :items="Button" :search="useUserDataStore().UserData.authority" :items-per-page="Button.length">
        <template v-slot:default="{ items }">
          <v-list-item v-for="(button,key) in items" :key="key" link :title="button.raw.title" :to="button.raw.to" @click="windows_close(button.raw.to)">
            <template v-slot:prepend>
              <v-icon :icon="button.raw.icon" :color="button.raw.color"></v-icon>
            </template>
          </v-list-item>
        </template>
      </v-data-iterator>
    </v-list>
  </v-navigation-drawer>
  <v-dialog
    v-model="useUserDataStore().Register"
    width="auto"
  >
    <Register></Register>
  </v-dialog>
  <v-dialog
    v-model="useUserDataStore().Login"
    width="auto"
  >
    <Login></Login>
  </v-dialog>
</template>

<script setup lang="ts">
import { useUserDataStore } from '../../store/useUserDataStore'
import Login from '../../components/Login.vue'
import Register from '../../components/Register/Register.vue'

const Button = ref([
  {
    title:"控制板",
    to:"/DashBoard",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal guest"
  },
  {
    title:"源库",
    to:"/SourceList",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal guest"
  },
  {
    title:"源库管理测试",
    to:"/ManageDemo",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root"
  },
  {
    title:"读卡测试",
    to:"/CardDemo",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root"
  },
  {
    title:"初始化",
    to:"/Init",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root"
  },
  {
    title:"源柜",
    to:"/CupBoard",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal"
  },
  {
    title:"源柜测试",
    to:"/CupBoard",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root"
  },
  {
    title:"探测器初始化",
    to:"/CupBoard",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root"
  },
  {
    title:"退出",
    to:"windows_close",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root"
  },
])
const authority_text = {
  default:"访客",
  root:"管理员",
  normal: "普通用户",
  guest:"访客"
}


function windows_close(to:string){
  if(to=='windows_close') {
    window.api.windows_close()
  }
}
</script>

<style scoped>
</style>
