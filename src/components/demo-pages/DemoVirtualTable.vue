<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import VirtualScrollTable from '@/components/business/VirtualScrollTable/index.vue'
import type { VirtualColumn } from '@/components/business/VirtualScrollTable/types'
import type { TableListItem } from '@/api/mockApi'
import { fetchAllTableList } from '@/api/mockApi'
import { formatMoney } from '@/utils'

const list = ref<TableListItem[]>([])
const loading = ref(false)
const clickedRow = ref<TableListItem | null>(null)

const columns: VirtualColumn<TableListItem>[] = [
  { prop: 'id', label: 'ID', width: 80 },
  { prop: 'name', label: '姓名', width: 120 },
  { prop: 'age', label: '年龄', width: 80 },
  { prop: 'email', label: '邮箱', width: 200 },
  { prop: 'department', label: '部门', width: 100 },
  {
    prop: 'salary',
    label: '薪资',
    width: 120,
    render: (row) => formatMoney(row.salary),
  },
  { prop: 'status', label: '状态', width: 100 },
  { prop: 'address', label: '地址' },
  { prop: 'createdAt', label: '创建时间', width: 120 },
]

async function load() {
  loading.value = true
  try {
    const res = await fetchAllTableList()
    list.value = res.data
  } finally {
    loading.value = false
  }
}

function onRowClick(row: TableListItem, index: number) {
  clickedRow.value = row
  // eslint-disable-next-line no-console
  console.log('行点击:', index, row)
}

const renderCount = computed(() => list.value.length)

onMounted(load)
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">虚拟滚动大数据表格 Demo</h2>
    <div class="card">
      <p style="margin-bottom: 12px; color: #909399">
        共加载 <b>{{ renderCount }}</b> 条 mock 数据，仅渲染可视区域行，滚动流畅。
      </p>
      <button class="btn" style="margin-bottom: 12px" @click="load">重新加载数据</button>
      <VirtualScrollTable
        :data="list"
        :columns="columns"
        :row-height="44"
        :height="480"
        :buffer="8"
        show-index
        row-key="id"
        @row-click="onRowClick"
      />
    </div>
    <div v-if="clickedRow" class="card">
      <h3>最后点击的行</h3>
      <pre>{{ JSON.stringify(clickedRow, null, 2) }}</pre>
    </div>
  </div>
</template>
