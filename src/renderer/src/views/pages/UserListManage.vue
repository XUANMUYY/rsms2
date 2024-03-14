<template>
<v-card title="用户管理">
  <template v-slot:text>
    <el-table :data="UserList"
              border
              style="width: 100%"
    >
      <el-table-column fixed prop="user" label="user" width="150" />
      <el-table-column prop="authority" label="authority" width="120" />
      <el-table-column prop="name" label="name" width="120" />
      <el-table-column prop="card" label="card" width="120" />
      <el-table-column prop="state" label="state" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick"
          >Detail</el-button
          >
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
</v-card>
</template>

<script lang="ts" setup>
import { useManageStore } from '../../store/useManageStore'

const UserList = ref([])
const handleClick = () => {
  console.log('click')
}
useManageStore().ManageGetUserList().then((resolve)=>{
  UserList.value = resolve
})

</script>
