<template>
<v-card title="源柜管理">
  <template v-slot:text>
    <v-data-table
      height="860px"
      :headers="headers"
      :items="DeviceArray"
      :sort-by="[{ key: 'nuclide', order: 'desc' }]">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>源柜数据库</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical></v-divider>
          <v-spacer></v-spacer>

          <v-dialog
            v-model="dialog"
            max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{`设备编号:`+ chooseItem.device_id}}</span>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="chooseItem.device_id"
                      variant="outlined"
                      spellcheck="false"
                      disabled
                      label="设备编号">
                    </v-text-field>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-model="chooseItem.wiz_ip"
                      variant="outlined"
                      label="IP地址">
                    </v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="chooseItem.wiz_port"
                      variant="outlined"
                      spellcheck="false"
                      label="端口">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="chooseItem.SSID"
                      variant="outlined"
                      spellcheck="false"
                      label="绑定源SSID">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="cancel">
                  取消
                </v-btn>
                <v-btn
                  :loading="saveLoading"
                  color="blue-darken-1"
                  variant="text"
                  @click="saveDeviceData">
                  {{ saveTips }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)">
          mdi-pencil
        </v-icon>
      </template>
    </v-data-table>
  </template>
</v-card>
</template>

<script lang="ts" setup>
import { useManageStore } from '../../store/useManageStore'
import { Ref } from 'vue'
import { DeviceArray } from '../../type'

const headers:any = [
  {
    title: '设备编号',
    align: 'start',
    key: 'device_id'
  },
  { title: 'IP地址', key: 'wiz_ip' },
  { title: '端口', key: 'wiz_port' },
  { title: '绑定源', key: 'SSID' },
  { title: '操作', key: 'actions', sortable: false }
]

const DeviceArray:Ref<DeviceArray[]> = ref([])
const dialog = ref(false)
const saveLoading = ref(false)
const saveTips = ref("保存")
const chooseItem:Ref<DeviceArray> = ref({} as DeviceArray)

const editItem = async(item) => {
  chooseItem.value = Object.assign({}, item)
  dialog.value = true
}
const cancel = () => {
  dialog.value = false
  chooseItem.value = {} as DeviceArray
}
const saveDeviceData = () => {
  saveLoading.value = true
  setTimeout(() => {
    useManageStore().ChangeDevice(chooseItem.value.device_id, chooseItem.value)
      .then(() => {
        useManageStore().ManageGetDeviceListAll()
          .then((resolve) => {
            DeviceArray.value = resolve
          })
          .then(() => {
            const check = DeviceArray.value.find((item) => {
              return item.device_id == chooseItem.value.device_id
            })
            if (CheckObject(check!, chooseItem.value, [''])) {
              saveLoading.value = false
              saveTips.value = '完成'
              setTimeout(() => {
                saveTips.value = '保存'
              }, 500)
            } else {
              saveLoading.value = false
              saveTips.value = '超时'
              setTimeout(() => {
                saveTips.value = '保存'
              }, 500)
            }
          })
      })
  }, 500)
}

useManageStore().ManageGetDeviceListAll().then((resolve) => {
  DeviceArray.value = resolve
})

const CheckObject = (objectA: object, objectB: object, filter: string[]): boolean => {
  let Correct = 1
  const keys = Object.entries(objectA)
  for (let i = 0; i < keys.length; i++) {
    if (filter.includes(keys[i][0])) {
      Correct *= 1
    } else {
      if (objectB[keys[i][0]] == keys[i][1]) {
        Correct *= 1
      }
      else {
        Correct *= 0
      }
    }
  }
  return Correct == 1
}
</script>
