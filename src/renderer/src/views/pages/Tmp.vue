<template>
<v-btn :loading="loading" @click="tmp"></v-btn>
  <v-container class="fill-height background">
    <v-responsive class="align-center text-center fill-height">
      <v-img height="400" src="@/assets/scdx.svg" />
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">


import router from '../../router'

const loading = ref(false)

function tmp(){
  router.replace('/UserListManage')
}
</script>

<style scoped>

</style>
