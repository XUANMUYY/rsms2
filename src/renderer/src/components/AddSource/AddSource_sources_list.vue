<template>
  <form @submit.prevent="submit" class="pa-3">
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
            :counter="10"
            :error-messages="nuclide.errorMessage.value"
            variant="outlined"
            placeholder="Cs"
            label="核素"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="nuclide_index.value.value"
            :counter="10"
            :error-messages="nuclide_index.errorMessage.value"
            placeholder="67"
            variant="outlined"
            label="序数"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="nuclide_name.value.value"
            :counter="10"
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
            :error-messages="nuclide_type.errorMessage.value"
            label="衰变类型"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
    <v-btn  class="me-4"
            type="submit"
            size="x-large"
            density="compact"
            :loading="loading"
            :icon="loading_done?'mdi-check-circle-outline':'mdi-arrow-up-circle-outline'"
    ></v-btn>
    <v-btn  class="me-4"
            density="compact"
            size="x-large"
            @click="handleReset"
            icon="mdi-close-circle-outline"
    ></v-btn>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { useAddSourceStore } from '../../store/useAddSourceStore'
import { useSourceArrayStore } from '../../store/useSourceArrayStore'

const { handleSubmit,handleReset } = useForm({
  validationSchema: {
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

let loading = ref(false)
let loading_done = ref(false)
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
          loading_done.value = true
          setTimeout(()=>{
            loading_done.value = false
          },700)
        }
        setTimeout(()=>{
          loading.value = false
        },2000)
      },500)
    },300)
  },100)
})

</script>

<style>

</style>
