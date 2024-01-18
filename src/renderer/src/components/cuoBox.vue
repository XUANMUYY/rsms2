<template>
  <v-card v-if="UserPass.includes(cupBoxIndex)" class="mx-auto bg-yellow-accent-3" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> {{ useUserDataStore().UserPass.Sources.find(item=>item.cupbox_id==cupBoxIndex)?
      useUserDataStore().UserPass.Sources.find(item=>item.cupbox_id==cupBoxIndex)!.nuclide_name:""}}
      <v-snackbar
        :timeout="2000"
      >
        <template v-slot:activator="{ props }">
          <v-btn class="ma-2" v-bind="props" variant="outlined">取</v-btn>
        </template>
        开启 {{ cupBoxIndex }} 柜
      </v-snackbar>
    </v-card-text>

  </v-card>
  <v-card v-else-if="UserOut.includes(cupBoxIndex)" class="mx-auto bg-orange-darken-1" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> {{ useUserDataStore().UserOut.Sources.find(item=>item.cupbox_id==cupBoxIndex)?
      useUserDataStore().UserOut.Sources.find(item=>item.cupbox_id==cupBoxIndex)!.nuclide_name:""}}
      <v-snackbar
        :timeout="2000"
      >
        <template v-slot:activator="{ props }">
          <v-btn class="ma-2" v-bind="props" variant="outlined">还</v-btn>
        </template>
        开启 {{ cupBoxIndex }} 柜
      </v-snackbar>
    </v-card-text>
  </v-card>
  <v-card v-else-if="READY.includes(cupBoxIndex)" class="mx-auto bg-green-lighten-1" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> This is content </v-card-text>
  </v-card>
  <v-card v-else-if="ALARM.includes(cupBoxIndex)" class="mx-auto bg-red-lighten-1" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> This is content </v-card-text>
  </v-card>
  <v-card v-else-if="PROCESS.includes(cupBoxIndex)" class="mx-auto bg-light-blue-lighten-1" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> This is content </v-card-text>
  </v-card>
  <v-card v-else-if="OUT.includes(cupBoxIndex)" class="mx-auto bg-blue-grey-lighten-1" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> This is content </v-card-text>
  </v-card>
  <v-card v-else class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-home">
    <template v-slot:title> {{ cupBoxIndex }} </template>
    <v-card-text> This is content </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import { useUserDataStore } from '../store/useUserDataStore'

defineProps<{
  cupBoxIndex:string,
  UserPass:string[],
  UserOut:string[],
}>()

let READY:Ref<string[]> = ref([])
let ALARM:Ref<string[]> = ref([])
let PROCESS:Ref<string[]> = ref([])
let OUT:Ref<string[]> = ref([])
</script>

<style scoped>

</style>
