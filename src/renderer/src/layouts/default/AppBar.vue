<template>
  <v-app-bar flat :order="1" style="height: 50px;" height="50">
    <v-app-bar-title>
      <v-icon
        @click="useTmpSafeCodeStore().TmpSafeClick()"
        icon="mdi-circle-slice-6"
        :color="useTmpSafeCodeStore().SafeAuthority?'red':''"/>
      {{ title }}
    </v-app-bar-title>
    <TmpSafeCode></TmpSafeCode>
    <div class="d-flex">
      <v-btn  icon>
        <v-badge dot color="success">
          <v-icon>mdi-account-multiple-outline</v-icon>
        </v-badge>
      </v-btn>
      <ToolbarNotifications />
      <v-btn  icon >
        <v-badge :content="`2 +`" color="error">
          <v-icon>mdi-calendar-check</v-icon>
        </v-badge>
      </v-btn>
      <v-divider vertical thickness="2" inset class="ml-5 mr-1"></v-divider>

      <themeSwitcher @click="console.log('ok')"/>
    </div>

  </v-app-bar>
</template>

<script lang="ts" setup>
import ToolbarNotifications from '../../components/tmp/ToolbarNotifications.vue'
import themeSwitcher from '../../components/themeSwitcher.vue'
import { useTmpSafeCodeStore } from '../../store/useTmpSafeCodeStore'
import TmpSafeCode from '../../components/TmpSafeCode.vue'

defineProps({
  title: String
})
</script>
