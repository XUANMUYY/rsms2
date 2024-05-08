<template>
<v-card title="源柜管理">
  <template v-slot:text>
    <v-data-table
      height="860px"
      :headers="headers"
      :items="CupboardArray"
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
                <span class="text-h5">{{`柜门编号:`+  chooseItem.cupbox_id}}</span>
              </v-card-title>

              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="chooseItem.device_id"
                      variant="outlined"
                      spellcheck ="false"
                      label="设备编号">
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
                  @click="saveCupboardData">
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
// import { toRaw } from "@vue/reactivity"
import { Ref } from 'vue'
import { CupboardArray } from '../../type'

const headers:any = [
  {
    title: '柜门编号',
    align: 'start',
    sortable: false,
    key: 'cupbox_id'
  },
  { title: '设备编号', key: 'device_id' },
  { title: '操作', key: 'actions', sortable: false }
]

const CupboardArray:Ref<CupboardArray[]> = ref([])
const dialog = ref(false)
const saveLoading = ref(false)
const saveTips = ref("保存")
const chooseItem:Ref<CupboardArray> = ref({} as CupboardArray)

const editItem = async(item) => {
  chooseItem.value = Object.assign({}, item)
  dialog.value = true
}
const cancel = () => {
  dialog.value = false
  chooseItem.value = {} as CupboardArray
}
const saveCupboardData = () => {
  saveLoading.value = true
  setTimeout(() => {
    useManageStore().ChangeCupboard(chooseItem.value.cupbox_id, chooseItem.value)
      .then(() => {
        useManageStore().ManageGetCupboardList()
          .then((resolve) => {
            CupboardArray.value = resolve
          })
          .then(() => {
            const check = CupboardArray.value.find((item) => {
              return item.cupbox_id == chooseItem.value.cupbox_id
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

useManageStore().ManageGetCupboardList().then((resolve) => {
  CupboardArray.value = resolve
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
