<template>
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
          <v-btn v-if="useUserDataStore().UserStatus=='Login'" @click="()=>{useUserDataStore().Clear();router.replace({ path:useSystemSettingStore().SystemSetting['源柜通讯设置']['仅启用源柜页面'].value? '/CupBoard':'/DashBoard' })}">登出</v-btn>
          <v-btn v-else @click="useUserDataStore().Login = true">登入</v-btn>
        </template>
      </v-card>
    </v-list-item>
  </v-list>
  <v-dialog
    v-model="useUserDataStore().Login"
    width="auto"
  >
    <Login></Login>
  </v-dialog>
  <v-dialog
    v-model="useUserDataStore().Register"
    width="auto"
  >
    <Register></Register>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useUserDataStore } from '../store/useUserDataStore'
import Login from './Login.vue'
import Register from './Register/Register.vue'
import router from '../router'
import { useSystemSettingStore } from '../store/useSystemSettingStore'

const authority_text = {
  default:"访客",
  root:"管理员",
  normal: "普通用户",
  guest:"访客"
}

</script>
