<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-card title="回调" :text=CallBack></v-card>
        </v-sheet>
      </v-col>
      <v-col>
        <v-select
          :items="[1]"
          v-model = "CupBoxIndex"
          density="compact"
          label="柜"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
          v-model = "CupBoardIndex"
          density="comfortable"
          label="箱"
        ></v-select>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-btn @click = "CupBoardsInit">
            初始化源柜
          </v-btn>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <v-btn @click = "OpenBox">
            打开柜门
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
import { Ref } from 'vue'
import { useCupBoardStore } from '../../store/useCupBoardStore'

let CallBack:Ref<string> = ref("None")
let CupBoxIndex = ref(1)
let CupBoardIndex = ref(1)

useCupBoardStore().$subscribe((_args,state)=>{
  CallBack.value = state.CallBack
})

function CupBoardsInit(){
  useCupBoardStore().CupBoardsInit(CupBoxIndex.value)
}

function OpenBox(){
  useCupBoardStore().OpenBox(CupBoxIndex.value.toString(),CupBoardIndex.value.toString())
}

function Clear(){
  useCupBoardStore().Clear()
  CallBack.value = ""
}
</script>
<style>

</style>
