<template>
  <v-container fluid >
    <v-row justify="center">
      <v-menu min-width="200px" rounded>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" size="large" >
            <v-chip color="brown" size="large">
              <span class="text-h5">{{ (useUserDataStore().UserData.name === "" ? "LOGIN" : useUserDataStore().UserData.name.substring(0, 1)) }}</span>
            </v-chip>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar color="brown">
                <span class="text-h5">{{ (useUserDataStore().UserData.name === "" ? "" : useUserDataStore().UserData.name.substring(0, 1)) }}</span>
              </v-avatar>
              <h3>{{ useUserDataStore().UserData.name }}</h3>
              <p class="text-caption mt-1">{{ useUserDataStore().UserData.user }}</p>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text"> Edit Account </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="useUserDataStore().Clear()"> Disconnect </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-menu>
    </v-row>
  </v-container>
  <v-dialog
    v-model="useUserDataStore().Register"
    width="auto"
  >
    <Register></Register>
  </v-dialog>
  <v-dialog
    v-model="useUserDataStore().Login"
    width="auto"
  >
    <Login></Login>
  </v-dialog>
</template>
<script lang="ts" setup>
import { useUserDataStore } from '../store/useUserDataStore'
import Login from './Login.vue'
import Register from './Register/Register.vue'

</script>
