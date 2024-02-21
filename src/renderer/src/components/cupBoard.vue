<template>
  <v-card width="100%" height="auto" style="padding: 20px" flat>
    <v-card width="100%" height="auto" >
      <v-container class="bg-grey-lighten-3">
        <v-row no-gutters>
          <v-col cols="5">
            <div v-for="(cupBoxIndex,i) in cupBoardArray.cupBoxLeftArray" :key="i" style="margin: 10px">
              <cup-box :cupBoxIndex="cupBoxIndex" :UserPass=UserPass :UserOut=UserOut></cup-box>
            </div>
          </v-col>
          <v-col cols="2">
            <v-card style="margin-left: 10px; margin-right: 10px" height="100%">
              {{ cupBoardArray.cupBoardIndex }}
            </v-card>
          </v-col>
          <v-col cols="5">
            <div v-for="(cupBoxIndex,i) in cupBoardArray.cupBoxRightArray" :key="i" style="margin: 10px">
              <cup-box :cupBoxIndex="cupBoxIndex" :UserPass=UserPass :UserOut=UserOut></cup-box>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import cupBox from "../components/cuoBox.vue";
import { CupBoardArray } from '../type'

defineProps<{
  cupBoardArray:CupBoardArray
  UserPass:string[],
  UserOut:string[],
}>()
</script>

<style>

</style>
