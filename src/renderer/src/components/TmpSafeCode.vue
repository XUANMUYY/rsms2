<template>
  <v-dialog
    v-model="useTmpSafeCodeStore().SafeCodeDialog"
    max-width="1000px">
    <v-card max-width="1000px">
      <v-otp-input
        max-width="1000px"
        v-model="SafeCode"
        length="12"
        type="text"
        @finish="finished"
      ></v-otp-input>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useTmpSafeCodeStore } from '../store/useTmpSafeCodeStore'
const SafeCode = ref("")

const finished = () => {
  useTmpSafeCodeStore().CodeCheck(SafeCode.value).then((result) => {
    if(result[0][0]['result']){
      SafeCode.value = ""
      useTmpSafeCodeStore().SafeAuthority = true
      useTmpSafeCodeStore().SafeCodeDialog = false
      useTmpSafeCodeStore().ChangeCode()
    }else{
      SafeCode.value = ""
      useTmpSafeCodeStore().SafeAuthority = false
    }
  })
}
</script>

<style scoped>

</style>
