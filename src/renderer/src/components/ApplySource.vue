<template>
  <div class="text-center">
    <v-bottom-sheet v-model="useSourceListStatusStore().OpenApplySheet" width="800" inset >
      <form @submit.prevent="submit">
        <div>
          <v-card
            class="mx-auto pa-12 pb-8 text-center"
            elevation="8"
            width="800"
            height="1000"
            rounded="lg"
          >
            <v-card-text>
              <v-btn variant="text" @click="useSourceListStatusStore().OpenApplySheet = !useSourceListStatusStore().OpenApplySheet"> close </v-btn>
              <div>你正在预约{{useSourceListStatusStore().ChooseSourceSSID}}</div>
            </v-card-text>
            <v-container>
              <v-row>
                <v-col cols="7">
                  <v-text-field
                    v-model="SSID.value.value"
                    :error-messages="SSID.errorMessage.value"
                    density="compact"
                    label="SSID"
                    :placeholder="'Enter your SSID'"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    required
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="user.value.value"
                    :error-messages="user.errorMessage.value"
                    density="compact"
                    label="user"
                    :placeholder="'Enter your user'"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    required
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="name.value.value"
                    :error-messages="name.errorMessage.value"
                    density="compact"
                    label="name"
                    :placeholder="'Enter your name'"
                    prepend-inner-icon="mdi-account-outline"
                    variant="outlined"
                    required
                    disabled
                  ></v-text-field>
                </v-col>
                <v-col cols="9">
                  <v-select
                    :v-model="reason.value.value"
                    :error-messages="reason.errorMessage.value"
                    density="compact"
                    label="reason"
                    variant="outlined"
                    required
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
                    hint="Pick your favorite states"
                    persistent-hint
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <VueDatePicker
                    v-model="first_time.value.value"
                    disabled
                    vertical />
                </v-col>
                <v-col cols="4">
                  <VueDatePicker
                    v-model="last_time.value.value"
                    disabled
                    vertical />
                </v-col>
                <v-col cols="4">
                  <VueDatePicker
                    v-model="time"
                    :max-time="{ hours: 11, minutes: 30 }"
                    time-picker />
                </v-col>
              </v-row>
            </v-container>
            <v-btn
              type="submit"
              block
              class="mb-1"
              color="blue"
              size="large"
              variant="tonal"
            >
              Log In
            </v-btn>
            <v-btn
              block
              class="mb-8"
              color="green"
              size="large"
              variant="tonal"
            >
              Swipe
            </v-btn>

          </v-card>
        </div>
      </form>
    </v-bottom-sheet>
  </div>
</template>

<script setup lang="ts">
import {useSourceListStatusStore} from '../store/useSourceListStatusStore'
import {ref} from "vue";
import {useField, useForm} from 'vee-validate'

const {handleSubmit, handleReset} = useForm({
  validationSchema: {

  },
})

const time = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
});

const SSID = useField('SSID')
const user = useField('user')
const name = useField('name')
const first_time = useField('first_time')
const last_time = useField('last_time')
const reason = useField('reason')

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
  handleReset()
})
</script>

<style scoped>

</style>
