<template>
  <form @submit.prevent="submit">
    <v-card class="mx-auto"
            elevation="0"
            rounded="0">
    <v-card-text>
      <v-select
        v-model="authority.value.value as string"
        :error-messages="authority.errorMessage.value"
        label="账户类型"
        v-if="useUserDataStore().UserData.authority=='root'"
        :items="['管理员','普通用户','访客']"
        variant="outlined"
      ></v-select>
      <v-select
        v-model="authority.value.value as string"
        :error-messages="authority.errorMessage.value"
        label="账户类型"
        v-else-if="useTmpSafeCodeStore().SafeAuthority"
        :items="['管理员','普通用户','访客']"
        variant="outlined"
      ></v-select>
      <v-select
        v-model="authority.value.value as string"
        :error-messages="authority.errorMessage.value"
        label="账户类型"
        v-else
        :items="['访客']"
        variant="outlined"
      ></v-select>
      <span class="text-caption text-grey-darken-1">注册后可等待管理员提升类型或联系管理员注册。</span>
    </v-card-text>

  <v-divider></v-divider>

  <v-card-actions>
    <v-btn variant="text" @click="useUserDataStore().Register=false">Back</v-btn>
    <v-spacer></v-spacer>
    <v-btn type="submit" color="primary" variant="flat">Next</v-btn>
  </v-card-actions>
    </v-card>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { useUserDataStore } from '../../store/useUserDataStore'
import { useTmpSafeCodeStore } from '../../store/useTmpSafeCodeStore'

const { handleSubmit } = useForm({
  validationSchema: {
    authority(value: any) {
      if (value != null) {
        return true
      }
      return '请选择账户类型'
    },
  }
})

const authority = useField('authority')

const submit = handleSubmit(()=>{
  useUserDataStore().UserRegister.authority = authorityFormat(authority.value.value as string)
  useUserDataStore().Register_step++
})

function authorityFormat(value:string){
  switch (value){
    case '管理员':
      return 'root'
    case '普通用户':
      return 'normal'
    default :
      return 'guest'
  }
}
</script>

<style>

</style>
