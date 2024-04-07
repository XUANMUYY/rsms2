<template>
  <v-card
    class="mx-auto"
    width="600"
    height="350"
  >
    <v-card-item :title="$t(`init.title`)">
      <template v-slot:subtitle>
        <v-icon
          class="me-1 pb-1"
          color="error"
          icon="mdi-alert"
          size="18"
        ></v-icon>
        {{$t(`init.subTitle`)}}
      </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col
          class="text-h2"
          cols="6"
        >
          RSMS2
        </v-col>

        <v-col class="text-right" cols="6">
          <v-img height="200" src="@/assets/scdx.svg" />
        </v-col>
      </v-row>
    </v-card-text>

    <div class="d-flex py-3 ">
      <v-list-item
        density="compact">
        <template v-slot:prepend>
          <v-progress-circular
            :size="20"
            :width="3"
            color="red"
            indeterminate
          ></v-progress-circular>
        </template>
        <v-list-item-subtitle>加载中</v-list-item-subtitle>
      </v-list-item>

      <v-list-item
        density="compact">
        <v-list-item-subtitle>{{ progress_tips }}</v-list-item-subtitle>
      </v-list-item>
    </div>

  </v-card>
</template>

<script lang="ts" setup>
import { useInitSQLStore } from '../../store/useInitSQL'
import SystemVersionJson from '../../json/SystemVersion.json'

const progress_tips = ref('初始设置')

useInitSQLStore().InitSQL(SystemVersionJson.SQLVersion as string, SystemVersionJson.ip_field, SystemVersionJson.ip_base, SystemVersionJson.ip_range, SystemVersionJson.port, SystemVersionJson.cupboard_num)

window.api.onReadyToShowMain((_value) => {
  console.log('OK')
})

setTimeout(() => {
  progress_tips.value = "初始化界面中"
  window.api.initMain()


  setTimeout(() => {
    progress_tips.value = "检查数据库中"
    useInitSQLStore().InitUser()


    setTimeout(() => {
      progress_tips.value = "加载界面中"
      window.api.showMain()


    }, 500)
  }, 500)
}, 500)


</script>

<style>
</style>
