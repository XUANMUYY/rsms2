<template>
<v-card title="用户管理">
  <template v-slot:text>
    <v-data-table
      height="860px"
      :headers="headers"
      :items="UserList"
      :sort-by="[{ key: 'authority', order: 'desc' }]">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>用户数据库</v-toolbar-title>
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
                <span class="text-h5">{{ chooseItem.name}} {{chooseItem.user}}</span>
              </v-card-title>

              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      v-model="chooseItem.name"
                      variant="outlined"
                      spellcheck ="false"
                      label="名称">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="chooseItem.user"
                      variant="outlined"
                      disabled
                      label="账号">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="chooseItem.authority"
                      variant="outlined"
                      item-title="title"
                      item-value="value"
                      persistent-hint
                      label="权限"
                      :items="[{ title:'管理员',value:'root'}, {title:'普通用户',value:'normal'}, {title:'访客',value:'guest'}]"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="chooseItem.card"
                      :loading="cardLoading"
                      append-inner-icon="mdi-pencil"
                      variant="outlined"
                      :label="cardTips"
                      spellcheck ="false"
                      @click:append-inner="loadCard"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="chooseItem.state"
                      variant="outlined"
                      item-title="title"
                      item-value="value"
                      persistent-hint
                      label="状态"
                      :items="[{ title:'正常',value:'normal'}, {title:'冻结',value:'freeze'}]"
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
                  @click="saveUserData">
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
import { UserData } from '../../type'
import { useLotusCardDriverStore } from '../../store/useLotusCardDriverStore'
import { useUserDataStore } from '../../store/useUserDataStore'

const authorityText:{ [KEY:string]: string} = {
  'root': '管理员',
  'normal': '普通用户',
  'guest': '访客',
}
const stateText:{ [KEY:string]: string} = {
  'normal': '正常',
  'freeze': '冻结',
}
const headers:any = [
  {
    title: '名称',
    align: 'start',
    sortable: false,
    key: 'name'
  },
  { title: '账号', key: 'user' },
  { title: '权限', key: 'authority',value:item => `${authorityText[item.authority]}`},
  { title: '卡号', key: 'card' },
  { title: '状态', key: 'state', value:item => `${stateText[item.state]}` },
  { title: '操作', key: 'actions', sortable: false }
]
const UserList:Ref<UserData[]> = ref([])
const dialog = ref(false)
const saveLoading = ref(false)
const saveTips = ref("保存")
const chooseItem:Ref<UserData> = ref({} as UserData)
const cardTips = ref("card")
const cardLoading = ref(false)
let tmpCard: string = "-1"
// const UserListTool = (val) => {
//   useManageStore().ChangeAuthority(val.user,"normal")
// }

const editItem = (item) => {
  chooseItem.value = Object.assign({}, item)
  dialog.value = true
}
const cancel = () => {
  dialog.value = false
  chooseItem.value = {} as UserData
}
const saveUserData = () => {
  saveLoading.value = true
  setTimeout(()=>{
    useManageStore().ChangeUser(chooseItem.value.user,chooseItem.value)
      .then(()=>{
      useManageStore().ManageGetUserList()
        .then((resolve)=>{
          UserList.value = resolve
        })
        .then(()=>{
          const check = UserList.value.find((user)=>{return user.user==chooseItem.value.user})
          if(check!.name==chooseItem.value.name&&check!.authority==chooseItem.value.authority&&check!.state==chooseItem.value.state&&check!.card==chooseItem.value.card){
            saveLoading.value = false
            saveTips.value = "完成"
            setTimeout(() => {
              saveTips.value = "保存"
            },500)
          }else {
            saveLoading.value = false
            saveTips.value = "超时"
            setTimeout(() => {
              saveTips.value = "保存"
            },500)
          }
        })
    })
  },500)
}
const loadCard = () => {
  cardLoading.value = true
  tmpCard = chooseItem.value.card
  useLotusCardDriverStore().OpenDriver()
  setTimeout(() => {
    if (useLotusCardDriverStore().Result != '设备打开失败!') {
      cardTips.value = '请在哔声后一秒内放入卡片。'
      setTimeout(() => {
        useLotusCardDriverStore().Beep(300)
        setTimeout(() => {
          useLotusCardDriverStore().UpdateCardNo()
          setTimeout(() => {
            if (useLotusCardDriverStore().CardNo != '-1') {
              tmpCard = useLotusCardDriverStore().CardNo
              useUserDataStore().RefreshCard( tmpCard as string)
              setTimeout(()=>{
                if(useUserDataStore().UserRegister.CardResult){
                  cardLoading.value = false
                  tmpCard = "-1"
                  cardTips.value = '卡片信息已存在。'
                }else {
                  cardLoading.value = false
                  chooseItem.value.card = tmpCard as string
                  cardTips.value = '读卡成功。正在写入信息。'
                }
              },200)
            } else {
              cardLoading.value = false
              cardTips.value = '读卡失败!请联系管理员。'
            }
            setTimeout(() => {
              cardTips.value = '卡号'
            }, 2000)
          }, 300)
        })
      }, 1000)
    }
    else {
      cardLoading.value = false
      cardTips.value = '读卡失败!请联系管理员。'
      setTimeout(() => {
        cardTips.value = '卡号'
      }, 2000)
    }
  }, 200)
}

useManageStore().ManageGetUserList().then((resolve)=>{
  UserList.value = resolve
})

</script>
