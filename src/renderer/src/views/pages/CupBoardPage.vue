<template>
  <v-card>
    <v-data-iterator
      :items="cupBoardArray"
      :items-per-page="2"
      :search="search"
      show-select
    >
      <template v-slot:header>
        <v-toolbar class="px-2" >
          <v-text-field
            v-model="search"
            clearable
            density="comfortable"
            hide-details
            placeholder="Search"
            prepend-inner-icon="mdi-magnify"
            style="max-width: 300px;"
            variant="outlined"
          ></v-text-field>
          <v-toolbar-items style="height: 100%">
            <v-select
              chips
              label="Select"
              :items=UserPass
              style="max-width: 300px;"
              variant="outlined"
              v-model="search"
            ></v-select>
          </v-toolbar-items>
          <v-toolbar-items style="height: 100%">
            <v-select
              chips
              label="Select"
              :items=UserOut
              style="max-width: 300px;"
              variant="outlined"
              v-model="search"
            ></v-select>
          </v-toolbar-items>
          <v-btn variant="outlined" @click="LoadCardNo">
            刷卡
          </v-btn>
        </v-toolbar>
      </template>

      <template v-slot:default="{ items }">
        <v-container class="cupBoard pa-2" fluid>
          <v-row no-gutters>
            <v-col cols="6"
                   v-for="item in items"
                   :key="item.raw.cupBoardIndex">
              <cup-board :cupBoardArray="item.raw" :UserPass=UserPass :UserOut=UserOut style="margin-right: 10px"></cup-board>
            </v-col>
          </v-row>
        </v-container>
      </template>

      <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            :disabled="page === 1"
            icon="mdi-arrow-left"
            density="comfortable"
            variant="tonal"
            rounded
            @click="prevPage"
          ></v-btn>

          <div class="mx-2 text-caption">
            Page {{ page }} of {{ pageCount }}
          </div>

          <v-btn
            :disabled="page >= pageCount"
            icon="mdi-arrow-right"
            density="comfortable"
            variant="tonal"
            rounded
            @click="nextPage"
          ></v-btn>
        </div>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<script lang="ts" setup>
import CupBoard from "@/components/cupBoard.vue";
import { CupBoardArray } from '../../type'
import { Ref } from 'vue'
import { useUserDataStore } from '../../store/useUserDataStore'
import { useLotusCardDriverStore } from '../../store/useLotusCardDriverStore'

const props = defineProps({
  CupBoardNumber: {
    type:Number,
    default:6,
  },
})

let search = ref("")
let UserPass:Ref<string[]> = ref([""])
let UserOut:Ref<string[]> = ref([""])
let cupBoardArray:Ref<CupBoardArray[]> = ref([])
let Interval:any;

for (let i = 1;i<=props.CupBoardNumber;i++){
  let cupBoxLeftArray:string[] = []
  let cupBoxRightArray:string[] = []
  for (let j=1;j<=12;j++){
    if(j<=6){
      cupBoxLeftArray.push(i.toString().padStart(2, '0')+j.toString().padStart(2, '0'))
    }else {
      cupBoxRightArray.push(i.toString().padStart(2, '0')+j.toString().padStart(2, '0'))
    }
  }
  cupBoardArray.value.push(
    {
      cupBoardIndex:"柜"+i.toString(),
      cupBoxLeftArray: cupBoxLeftArray,
      cupBoxRightArray: cupBoxRightArray
    }
  )
}

useUserDataStore().$subscribe((_args,state)=>{
  UserPass.value = state.UserPass.CupBoard
  UserOut.value = state.UserOut.CupBoard
})

useLotusCardDriverStore().$subscribe((_args,state)=>{
  if(state.CardNo!="-1"){
    useUserDataStore().GetUserData("","",state.CardNo)
    console.log(state.CardNo)
  }
  if(state.CardNo=="-1"&&Interval!=null){
    clearInterval(Interval)
    Interval = null
    useLotusCardDriverStore().Clear()
    useUserDataStore().Clear()
    useLotusCardDriverStore().Beep(200)
  }
})

function LoadCardNo(){
  useLotusCardDriverStore().Clear()
  useUserDataStore().Clear()
  setTimeout(()=>{
    useLotusCardDriverStore().UpdateCardNo()
  },200)
  Interval = setInterval(()=>{
    useLotusCardDriverStore().UpdateCardNoSilence()
  },5000)
}
</script>

<style scoped>
.cupBoard {
  max-width: 100%;
}
</style>
