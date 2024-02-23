<template>
  <v-navigation-drawer expand-on-hover rail location="left">
    <UserInfoCard></UserInfoCard>
    <v-divider></v-divider>
    <v-list density="compact" nav>
      <v-data-iterator :items="Button" :search="useUserDataStore().UserData.authority" :items-per-page="Button.length">
        <template v-slot:default="{ items }">
          <v-list-item v-for="(button,key) in items" :key="key" :title="button.raw.title" :to="button.raw.type=='web'?button.raw.to:null" @click="click(button.raw)">
            <template v-slot:prepend>
              <v-icon :icon="button.raw.icon" :color="button.raw.color"></v-icon>
            </template>
          </v-list-item>
        </template>
      </v-data-iterator>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useUserDataStore } from '../../store/useUserDataStore'
import UserInfoCard from '../../components/UserInfoCard.vue'

const Button = ref([
  {
    title:"控制板",
    to:"/DashBoard",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal guest",
    type:"web"
  },
  {
    title:"源库",
    to:"/SourceList",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal guest",
    type:"web"
  },
  {
    title:"源库管理测试",
    to:"/ManageDemo",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root",
    type:"web"
  },
  {
    title:"审核",
    to:"/ProcessApply",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root guest",
    type:"web"
  },
  {
    title:"读卡测试",
    to:"/CardDemo",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root",
    type:"web"
  },
  {
    title:"初始化",
    to:"/Init",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root",
    type:"web"
  },
  {
    title:"源柜",
    to:"/CupBoard",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal",
    type:"web"
  },
  {
    title:"源柜测试",
    to:"/CupBoardDemo",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root",
    type:"web"
  },
  {
    title:"探测器初始化",
    to:"/DetectorInit",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root",
    type:"web"
  },
  {
    title:"测试",
    to:"/Tmp",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root normal guest",
    type:"web"
  },
  {
    title:"退出",
    to:"window.api.windows_close()",
    icon:"mdi-star",
    color:"#546E7A",
    authority:"root",
    type:"function"
  },
])

function click(object:any){
  if (object.type == 'function'){
    const _function = new Function(object.to)
    _function()
    console.log("ok")
  }
}

</script>

<style scoped>
</style>
