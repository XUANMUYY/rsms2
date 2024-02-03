<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-card title="回调" :text=Result></v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-card title="CardNo" :text=CardNo></v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-card title="Log" :text=Log></v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-btn @click = "OpenDriver">
            设备识别
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-btn @click = "UpdateCardNo">
            获取卡号
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-btn @click = "Clear">
            Clear
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup lang="ts">
import { useLotusCardDriverStore } from '../../store/useLotusCardDriverStore'
import { Ref } from 'vue'
import { useUserDataStore } from '../../store/useUserDataStore'

let Result:Ref<string> = ref("none")
let CardNo:Ref<string> = ref("-1")
let Log:Ref<string> = ref("")

useLotusCardDriverStore().$subscribe((_args,state)=>{
  CardNo.value = state.CardNo
  Result.value = state.Result
  useUserDataStore().GetUserData("","",CardNo.value)
})

useUserDataStore().$subscribe((_args,state)=>{
  Log.value = state.UserData.name
})

function UpdateCardNo(){
  useLotusCardDriverStore().UpdateCardNo()
}
function OpenDriver(){
  useLotusCardDriverStore().OpenDriver()
}
function Clear(){
  useLotusCardDriverStore().Clear()
  useUserDataStore().Clear()
  Log.value = ""
}
</script>
<style>

</style>
