<template>
<v-btn @click="tmp"></v-btn>
</template>

<script setup lang="ts">
function tmp(){
  const tt = new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve('error')
    }, 2000);
  })
  tt.then((resole)=>{
    console.log(resole)
  })
}
</script>

<style scoped>

</style>
