<template>
  <form @submit.prevent="submit">
    <v-card class="mx-auto"
            elevation="0"
            rounded="0">
      <v-card-text>
        <v-text-field
          :counter="16"
          density="compact"
          placeholder="请输入账号"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          clearable
          spellcheck ="false"
          label="账号"
          :loading="loading"
          v-model="user.value.value"
          :error-messages="user.errorMessage.value"
        ></v-text-field>
        <v-text-field
          :counter="16"
          density="compact"
          placeholder="请输入名称"
          spellcheck ="false"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          clearable
          :loading="loading"
          label="名称"
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"></v-text-field>
        <span class="text-caption text-grey-darken-1">
              {{tips}}
            </span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn variant="text" @click="useUserDataStore().Register_step--">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="primary" variant="flat">Next</v-btn>
      </v-card-actions>
    </v-card>
  </form>

</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { useUserDataStore } from '../../store/useUserDataStore'
import { ref } from 'vue'

const { handleSubmit } = useForm({
  validationSchema: {
    user(value: any) {
      if (value?.length >= 5) return true
      return '账号长度至少大于5字符。'
    },
    name(value: any) {
      if (value?.length >= 1) return true
      return '名称格式不正确。'
    },
  }
})

const user = useField('user')
const name = useField('name')
const tips = ref("设置账户的基本信息")
const loading = ref(false)

const submit = handleSubmit(()=>{
  loading.value = true
  useUserDataStore().RefreshUser(user.value.value as string)
  setTimeout(()=>{
    if (useUserDataStore().UserRegister.UserResult){
      loading.value = false
      tips.value = "账户已存在"
    }
    else {
      loading.value = false
      useUserDataStore().UserRegister.User = user.value.value as string
      useUserDataStore().UserRegister.name = name.value.value as string
      useUserDataStore().Register_step++
      tips.value = "设置账户的基本信息"
    }
  },300)
})
</script>

<style>

</style>
