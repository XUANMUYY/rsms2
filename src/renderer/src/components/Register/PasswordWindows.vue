<template>
  <form @submit.prevent="submit">
    <v-card class="mx-auto"
            elevation="0"
            rounded="0">
      <v-card-text>
        <v-text-field
          v-model="password.value.value"
          :counter="18"
          :error-messages="password.errorMessage.value"
          :append-inner-icon="password_visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="password_visible ? 'text' : 'password'"
          density="compact"
          spellcheck ="false"
          placeholder="请输入密码"
          :loading="loading"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          clearable
          @click:append-inner="password_visible = !password_visible">
        </v-text-field>
        <v-text-field
          v-model="password_second.value.value"
          :counter="18"
          spellcheck ="false"
          :error-messages="password_second.errorMessage.value"
          :append-inner-icon="password_second_visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="password_second_visible ? 'text' : 'password'"
          density="compact"
          placeholder="请确认密码"
          :loading="loading"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          clearable
          @click:append-inner="password_second_visible = !password_second_visible">

        </v-text-field>
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

const password_visible = ref(false)
const password_second_visible = ref(false)
const loading = ref(false)
const tips = ref('设置并确认账户密码。')
const { handleSubmit } = useForm({
  validationSchema: {
    password(value: any) {
      if (value?.length >= 8) return true
      return '出于安全需要，密码至少大于8字符。'
    },
    password_second(value: any) {
      if (value == password.value.value) return true
      return '两次输入的密码不一致。'
    }
  }
})
const password = useField('password')
const password_second = useField('password_second')

const submit = handleSubmit(() => {
  loading.value = true
  useUserDataStore().UserRegister.password = password.value.value as string
  setTimeout(() => {
    useUserDataStore().AddUser(useUserDataStore().UserRegister.User, useUserDataStore().UserRegister.name, useUserDataStore().UserRegister.password, useUserDataStore().UserRegister.authority, useUserDataStore().UserRegister.Card)
    setTimeout(()=>{
      if(useUserDataStore().UserRegister.Result == 1){
        loading.value = false
        useUserDataStore().Register_step++
      }else {
        loading.value = false
        tips.value = "注册失败，请联系管理员。"
        setTimeout(()=>{
          tips.value = '设置并确认账户密码。'
        },2000)
      }
    },300)
  }, 100)
})
</script>

<style>

</style>
