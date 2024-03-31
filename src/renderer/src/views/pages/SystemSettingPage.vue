<template>
  <v-card style="padding: 20px" height="1000px">
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="(value, key) in useSystemSettingStore().SystemSetting" :key="key" :title="key as unknown as string">
        <template v-slot:text>
          <v-card elevation="0" >
            <v-card-text>
              <v-card style="background: #EEEEEE" elevation="0">
                <v-row no-gutters>
                  <v-col
                    v-for="(subValue, subKey) in value"
                    :key="subKey"
                    cols="12">
                    <div v-if="subValue['type']==='Router_Array'" class="d-flex py-3 " style="min-height: 60px">
                      <v-expansion-panels>
                        <v-expansion-panel bg-color="#EEEEEE" style="min-height: 60px" elevation="0">
                          <template v-slot:title class="text-h7">
                            {{ subKey }}
                          </template>
                          <template v-slot:text>
                            <v-row no-gutters>
                              <v-col cols="2">
                                <div class="m-4">
                                  <p>管理员可访问</p>
                                  <el-select
                                    v-model="useSystemSettingStore().Router_Array_Setting.root"
                                    value-key="index"
                                    multiple
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :max-collapse-tags="2"
                                    placeholder="Select"
                                    style="width: 240px"
                                  >
                                    <el-option
                                      v-for="item in useSystemSettingStore().Router_Array.all"
                                      :key="item.index"
                                      :label="item.title"
                                      :value="item"
                                    />
                                  </el-select>
                                </div>
                              </v-col>
                              <v-col cols="2">
                                <div class="m-4">
                                  <p>普通用户可访问</p>
                                  <el-select
                                    v-model="useSystemSettingStore().Router_Array_Setting.normal"
                                    value-key="index"
                                    multiple
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :max-collapse-tags="2"
                                    placeholder="Select"
                                    style="width: 240px"
                                  >
                                    <el-option
                                      v-for="item in useSystemSettingStore().Router_Array.all"
                                      :key="item.index"
                                      :label="item.title"
                                      :value="item"
                                    />
                                  </el-select>
                                </div>
                              </v-col>
                              <v-col cols="2">
                                <div class="m-4">
                                  <p>访客可访问</p>
                                  <el-select
                                    v-model="useSystemSettingStore().Router_Array_Setting.guest"
                                    value-key="index"
                                    multiple
                                    collapse-tags
                                    collapse-tags-tooltip
                                    :max-collapse-tags="2"
                                    placeholder="Select"
                                    style="width: 240px"
                                  >
                                    <el-option
                                      v-for="item in useSystemSettingStore().Router_Array.all"
                                      :key="item.index"
                                      :label="item.title"
                                      :value="item"
                                    />
                                  </el-select>
                                </div>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                    <div v-else-if="subValue['type']==='SQLSetting'" class="d-flex py-3 " style="min-height: 60px">
                      <v-expansion-panels>
                        <v-expansion-panel bg-color="#EEEEEE" style="min-height: 60px" elevation="0">
                          <template v-slot:title class="text-h7">
                            {{ subKey }}
                          </template>
                          <template v-slot:text>
                            <v-row>
                              <v-col cols="3">
                                <v-text-field
                                  v-model="useSystemSettingStore().MySQL.INIT_SQL.host"
                                  @change="useSystemSettingStore().updateText('host', $event)"
                                  hide-details="auto"
                                  label="HOST"
                                  variant="outlined"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  v-model="useSystemSettingStore().MySQL.INIT_SQL.port"
                                  @change="useSystemSettingStore().updateText('port', $event)"
                                  hide-details="auto"
                                  label="HOST"
                                  variant="outlined"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  v-model="useSystemSettingStore().MySQL.INIT_SQL.user"
                                  @change="useSystemSettingStore().updateText('user', $event)"
                                  hide-details="auto"
                                  label="USER"
                                  variant="outlined"
                                ></v-text-field>
                              </v-col>
                              <v-col cols="3">
                                <v-text-field
                                  v-model="useSystemSettingStore().MySQL.INIT_SQL.password"
                                  @change="useSystemSettingStore().updateText('password', $event)"
                                  hide-details="auto"
                                  label="PASSWORD"
                                  variant="outlined"
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                    <div v-else class="d-flex py-3 justify-space-between" style="height: 60px">
                      <v-list-item density="compact" class="text-h7">
                        <v-list-item-title >
                          {{ subKey }}
                        </v-list-item-title>
                      </v-list-item>

                      <v-list-item v-if="subValue['type']==='switch'" density="compact">
                        <v-switch
                          :model-value="subValue['value']"
                          color="green"
                          inset
                          @change="useSystemSettingStore().updateSwitch(key, subKey, $event)"
                          hide-details
                        ></v-switch>
                      </v-list-item>
                      <v-list-item v-if="subValue['type']==='select'" density="compact">
                        <v-select
                          :model-value="subValue['value']"
                          :items="subValue['option']"
                          variant="outlined"
                          @update:model-value="useSystemSettingStore().updateSelect(key, subKey, $event)"
                        ></v-select>
                      </v-list-item>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-card-text>
          </v-card>
        </template>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-btn :loading="SaveLoading" @click="SaveSetting()">保存设置</v-btn>
  </v-card>
</template>

<script setup lang="ts">
import { useSystemSettingStore } from '../../store/useSystemSettingStore'

const SaveLoading = ref(false)

function SaveSetting(){
  SaveLoading.value = true
  const Callback = useSystemSettingStore().writeSysSetting()
  Callback.then((resolve)=>{
    if(resolve){
      SaveLoading.value = false
    }else {
      SaveLoading.value = false
    }
  })
}
</script>

<style scoped></style>
