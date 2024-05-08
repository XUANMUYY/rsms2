<template>
  <v-card width="100%" height="auto" style="padding: 20px" flat>
    <v-card color="miniBG" width="100%" height="auto" >
      <v-container  >
        <v-row no-gutters>
          <v-col cols="5">
            <div v-for="(cupBoxIndex,i) in cupBoardArray.cupBoxLeftArray" :key="i" style="margin: 10px">
              <cup-box :cupBoxIndex="cupBoxIndex"></cup-box>
            </div>
          </v-col>
          <v-col cols="2">
            <v-container class="fill-height" style="padding: 0">
              <v-layout align-center align-content-center>
                <v-container style="padding: 0">
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-card elevation="0"
                              flat
                              color="miniBG"
                              class="bg-grey-lighten-3">
                        <template v-slot:title>
                          <h4 class="text-h4 align-content-center">{{ `柜 ` +  cupBoardArray.cupBoardIndex.toString() }}</h4>
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-container>
              </v-layout>
            </v-container>
          </v-col>
          <v-col cols="5">
            <div v-for="(cupBoxIndex,i) in cupBoardArray.cupBoxRightArray" :key="i" style="margin: 10px">
              <cup-box :cupBoxIndex="cupBoxIndex"></cup-box>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import cupBox from "./cupBox.vue";
import { CupBoardArray } from '../type'

defineProps<{
  cupBoardArray:CupBoardArray
}>()
</script>

<style>

</style>
