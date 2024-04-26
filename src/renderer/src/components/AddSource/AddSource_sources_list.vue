<template>
  <form @submit.prevent="submit" class="pa-3">
    <v-card class="mx-auto"
            elevation="0"
            rounded="0">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="useAddSourceStore().SSID"
                :counter="10"
                label="SSID(提交后自动获取)"
                variant="outlined"
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="nuclide.value.value"
                :counter="5"
                :error-messages="nuclide.errorMessage.value"
                variant="outlined"
                placeholder="Cs"
                spellcheck ="false"
                label="核素"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="nuclide_index.value.value"
                :counter="5"
                spellcheck ="false"
                :error-messages="nuclide_index.errorMessage.value"
                placeholder="67"
                variant="outlined"
                label="序数"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="nuclide_name.value.value"
                :counter="5"
                spellcheck ="false"
                :error-messages="nuclide_name.errorMessage.value"
                variant="outlined"
                placeholder="铯"
                label="中文名"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="nuclide_quality.value.value"
                :counter="10"
                variant="outlined"
                spellcheck ="false"
                placeholder="137"
                :error-messages="nuclide_quality.errorMessage.value"
                label="质量数"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="nuclide_id.value.value"
                :counter="10"
                variant="outlined"
                spellcheck ="false"
                placeholder="1"
                :error-messages="nuclide_id.errorMessage.value"
                label="ID"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5">
              <v-text-field
                v-model="nuclide_rate.value.value"
                :counter="10"
                spellcheck ="false"
                variant="outlined"
                placeholder="3.756E8"
                :error-messages="nuclide_rate.errorMessage.value"
                label="活度"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="nuclide_type.value.value"
                :items="nuclide_type_select"
                variant="outlined"
                required
                :error-messages="nuclide_type.errorMessage.value"
                label="衰变类型"
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn variant="text" @click="Close">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn type="submit" :loading="loading" :color="color" variant="flat">{{ tips }}</v-btn>
      </v-card-actions>
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAddSourceStore } from '../../store/useAddSourceStore'
import { useSourceArrayStore } from '../../store/useSourceArrayStore'

const { handleSubmit } = useForm({
  validationSchema: {
    nuclide(value: any) {
      if (value?.length >= 1 && /[A-Za-z]+/.test(value)) return true
      return '只能为字母且长度大于等于1。'
    },
    nuclide_index(value: any) {
      if (value?.length >= 1 && /[0-9]+/.test(value)) return true
      return '只能为数字且长度大于等于1。'
    },
    nuclide_name(value: any) {
      if (value?.length >= 1 && /[\u4e00-\u9fa5]+/.test(value)) return true
      return '只能为中文且长度大于等于1。'
    },
    nuclide_quality(value: any) {
      if (value?.length >= 1 && /[0-9]+/.test(value)) return true
      return '只能为数字且长度大于等于1。'
    },
    nuclide_id(value: any) {
      if (value?.length >= 1 && /[0-9]+/.test(value)) return true
      return '只能为数字且长度大于等于1。'
    },
    nuclide_rate(value: any) {
      if (value?.length >= 1 && /[0-9]+(.[0-9]+)?E[0-9]+/.test(value)) return true
      return '格式错误 参考 3.29E8 或 2E4'
    },
  },
})

const nuclide = useField('nuclide')
const nuclide_id = useField('nuclide_id')
const nuclide_name = useField('nuclide_name')
const nuclide_index = useField('nuclide_index')
const nuclide_quality = useField('nuclide_quality')
const nuclide_rate = useField('nuclide_rate')
const nuclide_type:any = useField('nuclide_type')

const nuclide_type_select= ref([
  'EC',
  'α',
  'β',
])
const loading = ref(false)
const color = ref("primary")
const tips = ref("Next")

const submit = handleSubmit(values => {
  loading.value = true
  useAddSourceStore().sources_list_data = values
  setTimeout(()=>{
    useAddSourceStore().Add_sources_list()
    setTimeout(()=>{
      useSourceArrayStore().UpdateSourceArray()
      setTimeout(()=>{
        if(useSourceArrayStore().SourceArray.find((_source)=>{return _source.SSID==useAddSourceStore().SSID&&_source.nuclide_name!='tmp'})!=undefined){
          loading.value = false
          useAddSourceStore().CanClose = false
          useAddSourceStore().step = 2
        }else {
          tips.value = "failed"
          loading.value = false
          color.value = "red"
        }
        setTimeout(()=>{
          tips.value = "Next"
          color.value = "primary"
        },2000)
      },500)
    },300)
  },100)
})

function Close(){
  useAddSourceStore().$reset()
}

</script>

<style>

</style>
