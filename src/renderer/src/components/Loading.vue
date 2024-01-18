<template>
  <div class="text-center">
    <v-progress-circular :rotate="360" :size="100" :width="15" :model-value="value" color="teal">
      <template v-slot:default> {{ value }} % </template>
    </v-progress-circular>
  </div>
</template>
<script lang="ts" setup>

let value = ref(0)

setInterval(()=>{
  value.value++
},1000)

</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
