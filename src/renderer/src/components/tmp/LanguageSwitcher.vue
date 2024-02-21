<!--
* @Component: LanguageSwitcher.vue
* @Maintainer: J.K. Yang
* @Description: 语言切换组件
-->
<script setup lang="ts">

</script>
<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-icon color="primary">mdi-translate</v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>
