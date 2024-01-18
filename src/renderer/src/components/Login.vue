<template>
  <form @submit.prevent="submit">
    <div>
<!--      <v-img-->
<!--        class="mx-auto my-6"-->
<!--        max-width="228"-->
<!--        src="@/assets/logo.svg"-->
<!--      ></v-img>-->
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">账号</div>

        <v-text-field
          v-model="UserAccount.value.value"
          :counter="16"
          :error-messages="UserAccount.errorMessage.value"
          density="compact"
          placeholder="请输入账户"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          clearable
          required
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          密码

          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            忘记密码?</a>
        </div>

        <v-text-field
          v-model="PassWord.value.value"
          :counter="18"
          :error-messages="PassWord.errorMessage.value"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="请输入密码"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          clearable
          required
          @click:append-inner="visible = !visible"
        ></v-text-field>

        <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
          height="120"
        >
          <v-card-text class="text-medium-emphasis text-caption">
            {{Tips}}
          </v-card-text>
        </v-card>

        <v-btn
          type="submit"
          :loading="loading"
          block
          class="mb-1"
          color="blue"
          size="large"
          variant="tonal"
        >
          登录
        </v-btn>
        <v-btn
          block
          class="mb-8"
          color="green"
          size="large"
          variant="tonal"
          :loading="loadingSwipe"
          @click="swipe"
        >
          刷卡
        </v-btn>

        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            注册<v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </form>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import { useField, useForm } from 'vee-validate'
import { useUserDataStore } from '../store/useUserDataStore'
import { useLotusCardDriverStore } from '../store/useLotusCardDriverStore'

let visible = ref(false)
let loading = ref(false)
let loadingSwipe = ref(false)

let Tips = ref("提示: 连续三次尝试登录失败后，账户将被锁定三小时，需联系管理员解除锁定。\n")

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    UserAccount(value:any) {
      if (value?.length >= 5) return true

      return '账号长度至少大于5字符。'
    },
    PassWord(value:any) {
      if (value?.length >= 8 && /[0-9-]+/.test(value)) return true

      return '出于安全需要，密码至少大于8字符。'
    },
  },
})

const UserAccount = useField('UserAccount')
const PassWord = useField('PassWord')

const submit = handleSubmit(values => {
  loading.value = true
  useUserDataStore().GetUserData(values.UserAccount,values.PassWord,"");
  setTimeout(()=>{
    if(useUserDataStore().UserStatus=="Login"){
      Tips.value = "欢迎！ "+useUserDataStore().UserData.name
      loading.value = false
      setTimeout(()=>{
        useUserDataStore().Login = false
        handleReset()
      },500)
    }
    else {
      Tips.value = "账号与密码不匹配"
      loading.value = false
    }
  },500)
})

function swipe(){
  loadingSwipe.value = true
  useLotusCardDriverStore().Clear()
  useUserDataStore().Clear()
  useLotusCardDriverStore().OpenDriver()
  Tips.value = "请在‘哔’声后刷卡。"
  setTimeout(()=>{
    useLotusCardDriverStore().UpdateCardNo()
    setTimeout(()=>{
      loadingSwipe.value = false
      useUserDataStore().GetUserData("","",useLotusCardDriverStore().CardNo)
      setTimeout(()=>{
        if(useUserDataStore().UserStatus=="Login"){
          Tips.value = "欢迎！ "+useUserDataStore().UserData.name
          loadingSwipe.value = false
          setTimeout(()=>{
            useUserDataStore().Login = false
            handleReset()
          },500)
        }
        else {
          Tips.value = "无效卡"
        }
      },300)
    },300)
  },200)
}
</script>
