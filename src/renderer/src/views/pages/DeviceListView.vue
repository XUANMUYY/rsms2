<template>
  <v-card title="设备查看">
    <template v-slot:text>
      <v-data-table
        height="860px"
        :headers="headers"
        :items="DeviceArray"
        :sort-by="[{ key: 'nuclide', order: 'desc' }]">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>已绑定设备数据库</v-toolbar-title>
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
              </v-card>
            </v-dialog>
          </v-toolbar>
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
  }
]

const DeviceArray: Ref<DeviceArray[]> = ref([])
const dialog = ref(false)
const chooseItem: Ref<DeviceArray> = ref({} as DeviceArray)

useManageStore().ManageGetDeviceList().then((resolve) => {
  DeviceArray.value = resolve
})
</script>
