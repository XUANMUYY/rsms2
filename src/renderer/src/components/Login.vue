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
          spellcheck ="false"
          placeholder="请输入账户"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
          clearable
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
          spellcheck ="false"
          :error-messages="PassWord.errorMessage.value"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="请输入密码"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          clearable
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
            @click="useUserDataStore().Register=true"
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
import router from '../router'

const visible = ref(false)
const loading = ref(false)
const loadingSwipe = ref(false)
const Tips = ref("提示: 连续三次尝试登录失败后，账户将被锁定三小时，需联系管理员解除锁定。\n")

useUserDataStore().$subscribe((_args,state)=>{
  if(state.Login == true) setTimeout(()=>{
    Tips.value = "提示: 连续三次尝试登录失败后，账户将被锁定三小时，需联系管理员解除锁定。\n"
  },1000)
})

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
  const User = useUserDataStore().GetUserData(values.UserAccount,values.PassWord,"");
  User.then((User)=>{
    setTimeout(()=>{
      if(User.UserStatus=="Login"&&User.UserData.state!='freeze'){
        Tips.value = "欢迎！ "+useUserDataStore().UserData.name
        loading.value = false
        setTimeout(()=>{
          router.replace({ path: '/DashBoard' })
          useUserDataStore().Login = false
          handleReset()
        },500)
      }
      else {
        if(User.UserStatus=="Login"&&User.UserData.state=='freeze'){
          Tips.value = "账户被冻结，请联系管理员。"
          loading.value = false
          setTimeout(()=>{
            useUserDataStore().Clear()
          },1000)
        }else{
          Tips.value = "账号与密码不匹配"
          loading.value = false
        }
      }
    },500)
  })
})

function swipe(){
  loadingSwipe.value = true
  useLotusCardDriverStore().Clear()
  useUserDataStore().Clear()
  useLotusCardDriverStore().OpenDriver()
  setTimeout(()=>{
    if(useLotusCardDriverStore().Result=='设备打开失败!'){
      Tips.value = '读卡设备连接失败！请联系管理员。'
      loadingSwipe.value = false
    }
    else {
      Tips.value = "请在‘哔’声后刷卡。"
      setTimeout(()=>{
        useLotusCardDriverStore().UpdateCardNo()
        setTimeout(()=>{
          const Callback = useUserDataStore().GetUserData("","",useLotusCardDriverStore().CardNo)
          Callback.then((resolve)=>{
            if(resolve.UserStatus=='Login'){
              Tips.value = "欢迎！ "+useUserDataStore().UserData.name
              setTimeout(()=>{
                loadingSwipe.value = false
                useUserDataStore().Login = false
                handleReset()
              },200)
            }
            else {
              loadingSwipe.value = false
              Tips.value = "无效卡"
            }
          })
        },300)
      },200)
    }
  },500)
}
</script>
