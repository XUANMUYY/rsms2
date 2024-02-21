<template>
  <v-card width="100%" height="auto" style="padding: 20px" flat>
    <v-card width="100%" height="auto" :loading="!useAsyncUpdateCupBoardStore().cupBoardUpdate">
      <v-container class="bg-grey-lighten-3">
        <v-row no-gutters>
          <v-col cols="5">
            <div v-for="(cupBoxIndex) in Array.from({length: 6}, (_val, i) => i+1)" :key="cupBoxIndex" style="margin: 10px">
              <v-card v-if="ChooseCup!=cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')" class="mx-auto bg-grey-lighten-4" width="auto" height="100px" @click="ChooseBox(cupBoxIndex)">
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-card class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-box" elevation="0">
                      <template v-slot:title> {{ cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0') }} </template>
                      <v-card-text>{{useAsyncUpdateCupBoardStore().cupBoxSources[cupBoxIndex-1].nuclide}} </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <v-card v-else variant="outlined" style="border-width: 3px;border-color:#76FF03" class="mx-auto bg-grey-lighten-4" width="auto" height="100px" @click="ChooseCup=cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')">
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-card class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-box" elevation="0">
                      <template v-slot:title> {{ cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0') }} </template>
                      <v-card-text>{{useAsyncUpdateCupBoardStore().cupBoxSources[cupBoxIndex-1].nuclide}} </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
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
                                class="bg-grey-lighten-3">
                          <template v-slot:title>
                            <h4 class="text-h4 align-content-center">{{`柜 `+cupBoardIndex.toString()}}</h4>
                          </template>
                        </v-card>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="cupBoardIndex"
                          :items="Array.from({length: 20}, (_val, i) => i+1)"
                          variant="outlined"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
              </v-layout>
            </v-container>
          </v-col>
          <v-col cols="5">
            <div v-for="(cupBoxIndex) in Array.from({length: 6}, (_val, i) => i+7)" :key="cupBoxIndex" style="margin: 10px">
              <v-card v-if="ChooseCup!=cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')" class="mx-auto bg-grey-lighten-4" width="auto" height="100px" @click="ChooseBox(cupBoxIndex)">
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-card class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-box" elevation="0">
                      <template v-slot:title> {{ cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0') }} </template>
                      <v-card-text>{{useAsyncUpdateCupBoardStore().cupBoxSources[cupBoxIndex-1].nuclide}} </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
              <v-card v-else variant="outlined" style="border-width: 3px;border-color:#76FF03" class="mx-auto bg-grey-lighten-4" width="auto" height="100px" @click="ChooseCup=cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')">
                <v-row no-gutters>
                  <v-col cols="6">
                    <v-card class="mx-auto bg-grey-lighten-4" width="auto" height="100px" prepend-icon="mdi-box" elevation="0">
                      <template v-slot:title> {{ cupBoardIndex.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0') }} </template>
                      <v-card-text>{{useAsyncUpdateCupBoardStore().cupBoxSources[cupBoxIndex-1].nuclide}} </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAsyncUpdateCupBoardStore } from '../../store/useAsyncUpdateCupBoardStore'

const cupBoardIndex = ref(1)
const ChooseCup = ref("")

useAsyncUpdateCupBoardStore().updateBox(cupBoardIndex.value)
watch(cupBoardIndex,(_pre,_state)=>{
  useAsyncUpdateCupBoardStore().updateBox(cupBoardIndex.value)
})
function ChooseBox(cupBoxIndex:number){
  if(useAsyncUpdateCupBoardStore().cupBoxSources[cupBoxIndex-1].nuclide=='empty'){
    ChooseCup.value = cupBoardIndex.value.toString().padStart(2, '0') + (cupBoxIndex).toString().padStart(2, '0')
  }
}
</script>

<style scoped>

</style>
