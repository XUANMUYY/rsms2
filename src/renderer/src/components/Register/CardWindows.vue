<template>
  <form @submit.prevent="submit">
    <v-card class="mx-auto"
            elevation="0"
            rounded="0">
      <v-card-text>
        <v-checkbox
          v-model="useCard"
          :value=true
          label="注册卡号"
          type="checkbox"
          :disabled="useCheck"
        ></v-checkbox>
        <v-text-field
          label="卡号"
          v-model="card.value.value"
          :error-messages="card.errorMessage.value"
          placeholder="请等待卡号读取"
          :loading="updateCard"
          variant="outlined"
          disabled
        ></v-text-field>
        <span class="text-caption text-grey-darken-1">
              {{ CardTips }}
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
import { useUserDataStore } from '../../store/useUserDataStore'
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { useLotusCardDriverStore } from '../../store/useLotusCardDriverStore'
let useCheck = ref(false)
let useCard = ref(false)
let updateCard = ref(false)
let CardTips = ref('勾选注册卡号后，可以使用刷卡登录。')

const { handleSubmit } = useForm({
  validationSchema: {
    async card(value: any) {
      if ((value?.length > 3 && useCard.value) || !useCard.value) return true
      return '请等待卡号写入'
    },
  }
})

const card = useField('card')
const submit = handleSubmit(()=>{
  useUserDataStore().Register_step++
})

watch(useCard, (_useCard, _preuseCard) => {
  if (_useCard == true && _preuseCard == false) {
    useCheck.value = true
    UpdateCard()
  }
})

function UpdateCard() {
  if (useCard) {
    card.value.value = ''
    updateCard.value = true
    useLotusCardDriverStore().OpenDriver()
    setTimeout(() => {
      if (useLotusCardDriverStore().Result != '设备打开失败!') {
        CardTips.value = '请在哔声后一秒内放入卡片。'
        setTimeout(() => {
          useLotusCardDriverStore().Beep(300)
          setTimeout(() => {
            useLotusCardDriverStore().UpdateCardNo()
            setTimeout(() => {
              if (useLotusCardDriverStore().CardNo != '-1') {
                updateCard.value = false
                card.value.value = useLotusCardDriverStore().CardNo
                useUserDataStore().RefreshCard(card.value.value as string)
                setTimeout(()=>{
                  if(useUserDataStore().UserRegister.CardResult){
                    updateCard.value = false
                    useCheck.value = false
                    useCard.value = false
                    CardTips.value = '卡片信息已存在。'
                  }else {
                    useUserDataStore().UserRegister.Card = card.value.value as string
                    CardTips.value = '读卡成功。正在写入信息。'
                  }
                },200)
              } else {
                updateCard.value = false
                useCheck.value = false
                useCard.value = false
                CardTips.value = '读卡失败!请联系管理员。'
              }
              setTimeout(() => {
                CardTips.value = '勾选注册卡号后，可以使用刷卡登录。'
              }, 2000)
            }, 300)
          })
        }, 1000)
      }
      else {
        useCheck.value = false
        CardTips.value = '设备打开失败!请联系管理员。'
        updateCard.value = false
        useCard.value = false
        setTimeout(() => {
          CardTips.value = '勾选注册卡号后，可以使用刷卡登录。'
        }, 2000)
      }
    }, 200)
  }
}
</script>

<style>

</style>
