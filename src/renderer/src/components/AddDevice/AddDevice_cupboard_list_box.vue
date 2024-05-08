<template>
  <v-card v-if="useAddDeviceStore().cupbox_id!=cupBoxIndex" :loading="UpdateLoading" class="mx-auto bg-grey-lighten-4" width="auto" height="100px" @click="ChooseBox()">
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-box"
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
    </v-row>
  </v-card>
  <v-card v-else :loading="UpdateLoading" variant="outlined" style="border-width: 3px;border-color:#76FF03" class="mx-auto bg-grey-lighten-4" width="auto" height="100px">
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-box"
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
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { useAsyncUpdateCupBoardStore } from '../../store/useAsyncUpdateCupBoardStore'
import { useAddDeviceStore } from '../../store/useAddDeviceStore'
import { CupBoxSource } from '../../type'
import { Ref } from 'vue'

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
  wiz_ip:"",
  wiz_port:0,
  nuclide_type: '',
  cupbox_id:'0',
  device_id: "0000",
  SSID:'0',
  nuclide:'empty'
}

const UpdateLoading = ref(true)
const SourcesInfo:Ref<CupBoxSource> = ref(empty)

useAsyncUpdateCupBoardStore().CupboardUpdateBox(Props.cupBoxIndex).then((resolve)=>{
  if(resolve.Status){
    UpdateLoading.value = false
    SourcesInfo.value = resolve.CallBack
  }
})
watch(Props, (_new, _old) => {
  UpdateLoading.value = true
  useAsyncUpdateCupBoardStore().CupboardUpdateBox(Props.cupBoxIndex).then((resolve)=>{
    if(resolve.Status){
      UpdateLoading.value = false
      SourcesInfo.value = resolve.CallBack
    }
  })
})

function ChooseBox() {
  if (SourcesInfo.value.nuclide == 'empty') {
    useAddDeviceStore().cupbox_id = Props.cupBoxIndex
  } else {
  }
}
</script>

<style scoped>

</style>
