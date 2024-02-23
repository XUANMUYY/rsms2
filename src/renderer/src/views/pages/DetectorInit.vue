<template>
  <perfect-scrollbar>
    <v-btn @click="useTmpStore().CreatSocket()">1</v-btn>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card title="IDDATA">
            <v-container>
              <v-row>
                <v-col v-for="key in Object.keys(IDDATA)" cols="6">
                  <v-text-field :label="key.toString()" v-model = "IDDATA[key]"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card title="Limit_Threshold">
            <v-container>
              <v-row>
                <v-col v-for="key in Object.keys(Limit_Threshold)" cols="6">
                  <v-text-field :label="key.toString()" v-model = "Limit_Threshold[key]"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card title="WIZ_NetInfo">
            <v-container>
              <v-row>
                <v-col v-for="key in Object.keys(WIZ_NetInfo)" cols="6">
                  <v-text-field :label="key.toString()" v-model = "WIZ_NetInfo[key]"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card title="DateTime">
            <v-container>
              <v-row>
                <v-col v-for="key in Object.keys(DateTime)" cols="6">
                  <v-text-field :label="key.toString()" v-model = "DateTime[key]"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </perfect-scrollbar>

</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { useTmpStore } from '../../store/useTmpStore'

let IDDATA:Ref<{
  Nuclide:number
  Nuclide_Num:number
  RadioActivity:string
  User:number
}> = ref(
  {
  Nuclide:137,
  Nuclide_Num:1,
  RadioActivity:"0x00010008",
  User:2021141220146,
})
let Limit_Threshold:Ref<{
  Limit_Volt_Low:number
  Limit_Count_SampleTime:number
  Limit_CountRate_A:number
  Limit_CountRate_B:number
  Limit_CountRate_C:number
}> = ref(
  {
  Limit_Volt_Low:4,
  Limit_Count_SampleTime:1000,
  Limit_CountRate_A:20,
  Limit_CountRate_B:30,
  Limit_CountRate_C:0xffff,
})
let WIZ_NetInfo:Ref<{
  mac:number[]
  ip:number[]
  sn:number[]
  gw:number[]
  dns:number[]
  dhcp:number,
  port:number
}> = ref(
  {
  mac:[0x00, 0xf1, 0xbe, 0xc4, 0xa1, 0x05],
  ip:[192, 168, 132, 43],
  sn:[255,255,255,0],
  gw:[192,168,132,1],
  dns:[112,112,112,112],
  dhcp:2,
  port:5000
})
let DateTime:Ref<{
  Y:number,
  M:number,
  D:number,
  h:number,
  m:number,
  s:number
}> =
  ref({
    Y:23,
    M:1,
    D:1,
    h:8,
    m:30,
    s:0
  })
</script>

<style>
.ps {
  height: 1000px;
}
</style>
