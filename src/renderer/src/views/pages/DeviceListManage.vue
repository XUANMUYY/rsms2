<template>
  <v-card title="设备管理">
    <template v-slot:text>
      <v-data-table
        height="860px"
        :headers="headers"
        :items="DeviceArray"
        :sort-by="[{ key: 'nuclide', order: 'desc' }]">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>设备数据库</v-toolbar-title>
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
                  <span class="text-h5">{{ chooseItem.nuclide }} No.{{ chooseItem.nuclide_id }}</span>
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
                        v-model="chooseItem.cupbox_id"
                        variant="outlined"
                        spellcheck="false"
                        label="源柜编号">
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="5">
                      <v-text-field
                        v-model="chooseItem.SSID"
                        variant="outlined"
                        append-inner-icon="mdi-pencil"
                        spellcheck ="false"
                        @click:append-inner=""
                        label="SSID">
                      </v-text-field>
                    </v-col>
                    <v-col cols="7">
                      <v-text-field
                        v-model="chooseItem.nuclide"
                        variant="outlined"
                        spellcheck ="false"
                        disabled
                        label="源">
                      </v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        v-model="chooseItem.nuclide_id"
                        variant="outlined"
                        spellcheck ="false"
                        disabled
                        label="编号">
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        v-model="chooseItem.nuclide_name"
                        variant="outlined"
                        label="名称"
                        spellcheck ="false"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                      <v-text-field
                        v-model="chooseItem.nuclide_quality"
                        variant="outlined"
                        spellcheck ="false"
                        disabled
                        label="质量数">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="chooseItem.SourceStatus"
                        variant="outlined"
                        item-title="title"
                        item-value="value"
                        persistent-hint
                        disabled
                        label="源状态"
                        :items="[{ title:'在库',value:'READY'}, {title:'离库',value:'OUT'}, {title:'异常',value:'ALARM'}, {title:'待审',value:'PROCESS'}, {title:'待取',value:'PROCESS-PASS'}]"
                      ></v-select>
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

const stateText: { [KEY: string]: string } = {
  'READY': '在库',
  'OUT': '离库',
  'ALARM': '异常',
  'PROCESS': '待审',
  'PROCESS-PASS': '待取',
  'NONE': '未绑定'
}

const headers: any = [
  {
    title: '设备编号',
    align: 'start',
    key: 'device_id'
  },
  { title: 'IP地址', key: 'wiz_ip' },
  { title: '端口', key: 'wiz_port' },
  { title: '源柜编号', key: 'cupbox_id' },
  {
    title: '绑定源',
    align: 'center',
    children: [
      { title: 'SSID', key: 'SSID' },
      { title: '源', key: 'nuclide' },
      { title: '编号', key: 'nuclide_id' },
      { title: '名称', key: 'nuclide_name' },
      { title: '质量数', key: 'nuclide_quality' },
      { title: '源状态', key: 'SourceStatus', value: item => `${stateText[item.SourceStatus]}` }
    ]
  },
  { title: '操作', key: 'actions', sortable: false }
]

const DeviceArray: Ref<DeviceArray[]> = ref([])
const dialog = ref(false)
const saveLoading = ref(false)
const saveTips = ref('保存')
const chooseItem: Ref<DeviceArray> = ref({} as DeviceArray)

const editItem = (item) => {
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
    useManageStore().ChangeDevice(chooseItem.value.SSID, chooseItem.value)
      .then(() => {
        useManageStore().ManageGetDeviceList()
          .then((resolve) => {
            DeviceArray.value = resolve
          })
          .then(() => {
            const check = DeviceArray.value.find((user) => {
              return user.SSID == chooseItem.value.SSID
            })
            if (CheckObject(check!, chooseItem.value, ['nuclide_energy'])) {
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

useManageStore().ManageGetDeviceList().then((resolve) => {
  DeviceArray.value = resolve
})

const CheckObject = (objectA: object, objectB: object, filter: string[]): boolean => {
  let Correct = 1
  const keys = Object.entries(objectA)
  for (let i = 0; i < keys.length; i++) {
    if (filter.includes(keys[i][0])) {
      Correct *= 1
    } else {
      if (typeof objectB[keys[i][0]] == typeof keys[i][1] && objectB[keys[i][0]] == keys[i][1]) {
        Correct *= 1
      } else {
        Correct *= 0
      }
    }
  }
  return Correct == 1
}
</script>
