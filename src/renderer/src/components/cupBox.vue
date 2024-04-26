<template>
  <v-card v-if="useUserDataStore().UserStatus=='Login'&&UserInfo.user==useUserDataStore().UserData.user&&UserInfo.event_status=='wait'" variant="outlined" style="border-width: 5px;border-color:#76FF03" class="mx-auto" width="auto" height="100px">
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="mx-auto" width="auto" height="100px" prepend-icon="mdi-box" flat
                elevation="0">
          <template v-slot:title>
            {{ cupBoxIndex }}
          </template>
          <v-card-text v-if="SourcesInfo.nuclide_quality!=0&&SourcesInfo.nuclide_quality!=undefined">{{SourcesInfo.nuclide_name +` `+SourcesInfo.nuclide+` `+SourcesInfo.nuclide_quality+` `+`No.`+SourcesInfo.nuclide_id }}
          </v-card-text>
          <v-card-text v-else-if="SourcesInfo.device_id!='0000'">{{`设备ID:`+` `+SourcesInfo.device_id }}
          </v-card-text>
          <v-card-text v-else>{{`未绑定` }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mx-auto" width="auto" height="100px" flat
                elevation="0">
          <v-btn
            style="margin: 10px;width: 130px;height: 70px;"
            variant="outlined"
          @click="OpenBox(UserInfo.apply_id,UserInfo.SSID)">
            打开
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-card>

  <v-card v-else-if="useUserDataStore().UserStatus=='Login'&&UserInfo.user==useUserDataStore().UserData.user&&UserInfo.event_status=='out'" variant="outlined" style="border-width: 5px;border-color:#1E88E5" class="mx-auto" width="auto" height="100px">
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="mx-auto" width="auto" height="100px" prepend-icon="mdi-box" flat
                elevation="0">
          <template v-slot:title>
            {{ cupBoxIndex }}
          </template>
          <v-card-text v-if="SourcesInfo.nuclide_quality!=0&&SourcesInfo.nuclide_quality!=undefined">{{SourcesInfo.nuclide_name +` `+SourcesInfo.nuclide+` `+SourcesInfo.nuclide_quality+` `+`No.`+SourcesInfo.nuclide_id }}
          </v-card-text>
          <v-card-text v-else-if="SourcesInfo.device_id!='0000'">{{`设备ID:`+` `+SourcesInfo.device_id }}
          </v-card-text>
          <v-card-text v-else>{{`未绑定` }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mx-auto" width="auto" height="100px" flat
                elevation="0">
          <v-btn
            style="margin: 10px;width: 130px;height: 70px;"
            variant="outlined"
            @click="BackOpenBox(UserInfo.apply_id,UserInfo.SSID)">
            打开
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-card>

  <v-card v-else :loading = "BoxLoading" variant="outlined" style="border-width: 2px;" v-bind:style="{borderColor:Color[SourcesInfo.SourceStatus]}" class="mx-auto" width="auto" height="100px">
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="mx-auto" flat width="auto" height="100px" prepend-icon="mdi-box"
                elevation="0">
          <template v-slot:title>
            {{ cupBoxIndex }}
          </template>
          <v-card-text v-if="SourcesInfo.nuclide_quality!=0&&SourcesInfo.nuclide_quality!=undefined">{{SourcesInfo.nuclide_name +` `+SourcesInfo.nuclide+` `+SourcesInfo.nuclide_quality+` `+`No.`+SourcesInfo.nuclide_id }}
          </v-card-text>
          <v-card-text v-else-if="SourcesInfo.device_id!='0000'">{{`设备ID:`+` `+SourcesInfo.device_id }}
          </v-card-text>
          <v-card-text v-else>{{`未绑定` }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card class="mx-auto" width="auto" height="100px" flat
                elevation="0">
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { CupBoxSource, CupBoxUserInfo } from '../type'
import { useAsyncUpdateCupBoardStore } from '../store/useAsyncUpdateCupBoardStore'
import { useCupBoardStore } from '../store/useCupBoardStore'
import { useUserDataStore } from '../store/useUserDataStore'
import { useSystemInfoStore } from '../store/useSystemInfoStore'
const moment = require('moment')
const Props = defineProps<{
  cupBoxIndex:string,
}>()
const empty:CupBoxSource = {
  SourceStatus: 'OUT',
  nuclide_energy: [],
  nuclide_index: 0,
  nuclide_name: '',
  nuclide_quality: 0,
  nuclide_id:0,
  nuclide_rate: '',
  nuclide_type: '',
  cupbox_id:'0',
  device_id: "0000",
  SSID:'0',
  nuclide:'empty'
}
const Color:{ [KEY:string]: string} = {
  'READY': '#00E676',
  'ALARM': '#FF3D00',
  'PROCESS': '#00B0FF',
  'PROCESS-PASS': '#00B0FF',
  'OUT': '#546E7A',
}

const SourcesInfo:Ref<CupBoxSource> = ref(empty)
const UserInfo:Ref<CupBoxUserInfo> = ref({} as CupBoxUserInfo)
const BoxLoading = ref(true)

useAsyncUpdateCupBoardStore().CupboardUpdateBox(Props.cupBoxIndex).then((resolve)=>{
  if(resolve.Status){
    SourcesInfo.value = resolve.CallBack
    useAsyncUpdateCupBoardStore().CupboardUpdateBoxUserInfo(Props.cupBoxIndex).then((resolve)=>{
      if(resolve.Status){
        BoxLoading.value = false
        UserInfo.value = resolve.CallBack
      }
    })
  }
})

useUserDataStore().$subscribe((_args,_state)=>{
  useAsyncUpdateCupBoardStore().CupboardUpdateBox(Props.cupBoxIndex).then((resolve)=>{
    if(resolve.Status){
      SourcesInfo.value = resolve.CallBack
      useAsyncUpdateCupBoardStore().CupboardUpdateBoxUserInfo(Props.cupBoxIndex).then((resolve)=>{
        if(resolve.Status){
          BoxLoading.value = false
          UserInfo.value = resolve.CallBack
        }
      })
    }
  })
})

function OpenBox(apply_id:string,SSID:string){
  const open_time = moment().format("YYYY-MM-DD hh:mm:ss")
  useCupBoardStore().dialog = true
  useCupBoardStore().dialogTips = "更新系统信息中..."
  useSystemInfoStore().GetSystemInfo().then((resolve)=>{
    const SysInfo = resolve
    useCupBoardStore().dialogTips = "写入源柜信息中..."
    setTimeout(()=>{
      useCupBoardStore().AsyncOpen(open_time,apply_id,SSID).then((resolve)=>{
        if(resolve[0].affectedRows==1){
          useCupBoardStore().dialogTips = "更新源柜信息中..."
          useAsyncUpdateCupBoardStore().CupboardUpdateBox(Props.cupBoxIndex).then((resolve)=>{
            if(resolve.Status){
              SourcesInfo.value = resolve.CallBack
              useCupBoardStore().dialogTips = "初始化源柜连接中..."
              useCupBoardStore().AsyncCupBoardsInit(SysInfo.cupboard_num).then((_resolve)=>{
                if(_resolve){
                  useCupBoardStore().dialogTips = "打开源柜中..."
                  useCupBoardStore().AsyncOpenBox(Props.cupBoxIndex).then((_resolve)=>{
                    if(_resolve){
                      useCupBoardStore().dialogTips = "刷新源柜中..."
                      useAsyncUpdateCupBoardStore().CupboardUpdateBoxUserInfo(Props.cupBoxIndex).then((resolve)=>{
                        if(resolve.Status){
                          useCupBoardStore().dialogTips = "完成..."
                          useCupBoardStore().dialog = false
                          BoxLoading.value = false
                          UserInfo.value = resolve.CallBack
                        }
                        else {
                          useCupBoardStore().dialogTips = "刷新源柜出现错误..."
                          setTimeout(()=>{
                            useCupBoardStore().dialog = false
                          },1000)
                        }
                      })
                    }
                    else {
                      useCupBoardStore().dialogTips = "打开源柜出现错误..."
                      setTimeout(()=>{
                        useCupBoardStore().dialog = false
                      },1000)
                    }
                  })
                }else {
                  useCupBoardStore().dialogTips = "初始化源柜连接出现错误..."
                  setTimeout(()=>{
                    useCupBoardStore().dialog = false
                  },1000)
                }
              })
            }
            else {
              useCupBoardStore().dialogTips = "更新源柜信息出现错误..."
              setTimeout(()=>{
                useCupBoardStore().dialog = false
              },1000)
            }
          })
        }
        else {
          useCupBoardStore().dialogTips = "写入源柜信息出现错误..."
          setTimeout(()=>{
            useCupBoardStore().dialog = false
          },1000)
        }
      })
    },500)
  })
}

function BackOpenBox(apply_id:string,SSID:string){
  const back_time = moment().format("YYYY-MM-DD hh:mm:ss")
  useCupBoardStore().dialog = true
  useCupBoardStore().dialogTips = "更新系统信息中..."
  useSystemInfoStore().GetSystemInfo().then((resolve)=>{
    const SysInfo = resolve
    useCupBoardStore().dialogTips = "写入源柜信息中..."
    setTimeout(()=>{
      useCupBoardStore().AsyncBackOpen(back_time,apply_id,SSID).then((resolve)=>{
        if(resolve[0].affectedRows==1){
          useCupBoardStore().dialogTips = "更新源柜信息中..."
          useAsyncUpdateCupBoardStore().CupboardUpdateBox(Props.cupBoxIndex).then((resolve)=>{
            if(resolve.Status){
              SourcesInfo.value = resolve.CallBack
              useCupBoardStore().dialogTips = "初始化源柜连接中..."
              useCupBoardStore().AsyncCupBoardsInit(SysInfo.cupboard_num).then((_resolve)=>{
                if(_resolve){
                  useCupBoardStore().dialogTips = "打开源柜中..."
                  useCupBoardStore().AsyncOpenBox(Props.cupBoxIndex).then((_resolve)=>{
                    if(_resolve){
                      useCupBoardStore().dialogTips = "刷新源柜中..."
                      useAsyncUpdateCupBoardStore().CupboardUpdateBoxUserInfo(Props.cupBoxIndex).then((resolve)=>{
                        if(resolve.Status){
                          useCupBoardStore().dialogTips = "完成..."
                          useCupBoardStore().dialog = false
                          BoxLoading.value = false
                          UserInfo.value = resolve.CallBack
                        }
                        else {
                          useCupBoardStore().dialogTips = "刷新源柜出现错误..."
                          setTimeout(()=>{
                            useCupBoardStore().dialog = false
                          },1000)
                        }
                      })
                    }
                    else {
                      useCupBoardStore().dialogTips = "打开源柜出现错误..."
                      setTimeout(()=>{
                        useCupBoardStore().dialog = false
                      },1000)
                    }
                  })
                }else {
                  useCupBoardStore().dialogTips = "初始化源柜连接出现错误..."
                  setTimeout(()=>{
                    useCupBoardStore().dialog = false
                  },1000)
                }
              })
            }
            else {
              useCupBoardStore().dialogTips = "更新源柜信息出现错误..."
              setTimeout(()=>{
                useCupBoardStore().dialog = false
              },1000)
            }
          })
        }
        else {
          useCupBoardStore().dialogTips = "写入源柜信息出现错误..."
          setTimeout(()=>{
            useCupBoardStore().dialog = false
          },1000)
        }
      })
    },500)
  })
}
</script>

<style>

</style>
