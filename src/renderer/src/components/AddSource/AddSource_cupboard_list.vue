<template>
  <v-card class="mx-auto"
          elevation="0"
          rounded="0">
    <v-card-text>
      <v-card width="100%" height="auto">
        <v-container class="bg-grey-lighten-3">
          <v-row no-gutters>
            <v-col cols="5">
              <div v-for="(cupBoxIndex) in Array.from({length: 6}, (_val, i) => i+1)" :key="cupBoxIndex"
                   style="margin: 10px">
                <add-source_cupboard_list_box :cupBoxIndex="cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')"></add-source_cupboard_list_box>
              </div>
            </v-col>
            <v-col cols="2">
              <v-container class="fill-height" style="padding: 0">
                <v-layout align-center align-content-center>
                  <v-container style="padding: 0">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <v-card elevation="0"
                                flat
                                class="bg-grey-lighten-3">
                          <template v-slot:title>
                            <h4 class="text-h4 align-content-center">{{ `柜 ` + cupBoardIndex.toString() }}</h4>
                          </template>
                        </v-card>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="cupBoardIndex"
                          :items="Array.from({length: 20}, (_val, i) => i+1)"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-layout>
              </v-container>
            </v-col>
            <v-col cols="5">
              <div v-for="(cupBoxIndex) in Array.from({length: 6}, (_val, i) => i+7)" :key="cupBoxIndex"
                   style="margin: 10px">
                <add-source_cupboard_list_box :cupBoxIndex="cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')"></add-source_cupboard_list_box>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-card-text>
    <v-divider></v-divider>

    <v-card-actions>
      <v-btn variant="text" :loading="CloseLoading" @click="Close">{{ CloseTips }}</v-btn>
      <v-spacer></v-spacer>
      <v-btn :loading="loading" :disabled="useAddSourceStore().cupbox_id ==''" :color="color" variant="flat" @click="Submit">{{ BtnTips }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref} from 'vue'
import { useAddSourceStore } from '../../store/useAddSourceStore'
import { useSourceArrayStore } from '../../store/useSourceArrayStore'
import { useBoardTCPStore } from '../../store/useBoardTCPStore'
import AddSource_cupboard_list_box from './AddSource_cupboard_list_box.vue'

const cupBoardIndex = ref(1)
const loading = ref(false)
const color = ref('primary')
const BtnTips = ref('下一步')
const CloseLoading = ref(false)
const CloseTips = ref("关闭")

function Submit() {
  loading.value = true
  setTimeout(()=>{
    useAddSourceStore().Add_cupboard_list().then((resolve)=>{
      if (resolve[0].affectedRows==1){
        useAddSourceStore().step = 4
      }else {
        color.value = "red"
        BtnTips.value = "failed"
        setTimeout(()=>{
          BtnTips.value = "Next"
          color.value = "primary"
        },2000)
      }
      loading.value = false
    })
  },1000)
}

function Close() {
  useBoardTCPStore().CreatSocket(0, useAddSourceStore().device_list_data.wiz_ip as string, useAddSourceStore().device_list_data.wiz_port as number)
  CloseLoading.value = true
  useBoardTCPStore().FormatBoard(0).then((resolve)=>{
    if(resolve){
      const Callback = useAddSourceStore().Remove_sources_list()
      Callback.then((resolve) => {
        if (resolve[0].affectedRows == 1) {
          useAddSourceStore().Remove_device_list().then((resolve)=>{
            if(resolve[0].affectedRows==1){
              CloseLoading.value = false
              useSourceArrayStore().UpdateSourceArray()
              useAddSourceStore().$reset()
            }else {
              CloseLoading.value = false
            }
          })
        }else {
          CloseLoading.value = false
        }
      })
    }
    else {
      CloseTips.value = "解除绑定失败,请重试"
      CloseLoading.value = false
      setTimeout(()=>{
        CloseTips.value = "关闭"
      },1000)
    }
  })
}
</script>

<style scoped>

</style>
