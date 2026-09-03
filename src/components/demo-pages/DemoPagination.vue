<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BasePagination from '@/components/base/BasePagination/index.vue'
import type { TableListItem } from '@/api/mockApi'
import { fetchTableListByPage } from '@/api/mockApi'

const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const list = ref<TableListItem[]>([])
const loading = ref(false)

async function load() {
  loading.value = true
  try {
    const res = await fetchTableListByPage({ page: page.value, pageSize: pageSize.value })
    list.value = res.data.list
    total.value = res.data.total
  } finally {
    loading.value = false
  }
}

function onChange() {
  load()
}

onMounted(load)
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">分页组件 Demo</h2>
    <div class="card">
      <table class="demo-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>部门</th>
            <th>状态</th>
            <th>邮箱</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in list" :key="row.id">
            <td>{{ row.id }}</td>
            <td>{{ row.name }}</td>
            <td>{{ row.age }}</td>
            <td>{{ row.department }}</td>
            <td>{{ row.status }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-top: 16px; display: flex; justify-content: flex-end">
        <BasePagination
          v-model:page="page"
          v-model:pageSize="pageSize"
          :total="total"
          @change="onChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.demo-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  th,
  td {
    padding: 8px 12px;
    border-bottom: 1px solid #ebeef5;
    text-align: left;
  }
  th {
    background: #f5f7fa;
    font-weight: 600;
  }
  tbody tr:hover {
    background: #f0f7ff;
  }
}
</style>
