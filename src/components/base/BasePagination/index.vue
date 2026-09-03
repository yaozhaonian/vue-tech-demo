<script setup lang="ts">
import { computed } from 'vue'
import type { BasePaginationProps, BasePaginationEmits } from './types'

const props = withDefaults(defineProps<BasePaginationProps>(), {
  pageSizes: () => [10, 20, 50, 100],
  showJumper: true,
})

const emit = defineEmits<BasePaginationEmits>()

const totalPages = computed(() =>
  props.pageSize > 0 ? Math.max(1, Math.ceil(props.total / props.pageSize)) : 1
)

/** 简化的页码数组：首页、末页、当前页前后2页，其余用 ... 表示 */
const pages = computed<(number | string)[]>(() => {
  const current = props.page
  const total = totalPages.value
  const arr: (number | string)[] = []
  const delta = 2
  const left = Math.max(2, current - delta)
  const right = Math.min(total - 1, current + delta)
  arr.push(1)
  if (left > 2) arr.push('...')
  for (let i = left; i <= right; i++) arr.push(i)
  if (right < total - 1) arr.push('...')
  if (total > 1) arr.push(total)
  return arr
})

function go(page: number | string) {
  const p = Number(page)
  if (!p || Number.isNaN(p)) return
  if (p < 1 || p > totalPages.value || p === props.page) return
  emit('update:page', p)
  emit('change', { page: p, pageSize: props.pageSize })
}

function prev() {
  if (props.page <= 1) return
  go(props.page - 1)
}
function next() {
  if (props.page >= totalPages.value) return
  go(props.page + 1)
}

function onSizeChange(e: Event) {
  const size = Number((e.target as HTMLSelectElement).value)
  emit('update:pageSize', size)
  emit('update:page', 1)
  emit('change', { page: 1, pageSize: size })
}

function onJumper(e: Event) {
  const val = Number((e.target as HTMLInputElement).value)
  if (val) go(val)
  ;(e.target as HTMLInputElement).value = ''
}
</script>

<template>
  <div class="base-pagination">
    <span class="total">共 {{ total }} 条</span>
    <button class="pager-btn" :disabled="page <= 1" @click="prev">上一页</button>
    <template v-for="(p, i) in pages" :key="`${p}-${i}`">
      <span v-if="p === '...'" class="ellipsis">...</span>
      <button v-else class="pager-num" :class="{ active: p === page }" @click="go(p)">
        {{ p }}
      </button>
    </template>
    <button class="pager-btn" :disabled="page >= totalPages" @click="next">下一页</button>
    <select class="size-select" :value="pageSize" @change="onSizeChange">
      <option v-for="s in pageSizes" :key="s" :value="s">{{ s }} 条/页</option>
    </select>
    <label v-if="showJumper" class="jumper">
      前往
      <input type="number" min="1" :max="totalPages" @keyup.enter="onJumper" @blur="onJumper" />
      页
    </label>
  </div>
</template>

<style scoped lang="scss">
.base-pagination {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: #606266;
  .total {
    margin-right: 8px;
  }
  .pager-btn,
  .pager-num {
    min-width: 32px;
    height: 32px;
    padding: 0 6px;
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:hover:not(:disabled) {
      color: #409eff;
      border-color: #409eff;
    }
    &:disabled {
      cursor: not-allowed;
      color: #c0c4cc;
      background: #f5f7fa;
    }
  }
  .pager-num.active {
    background: #409eff;
    border-color: #409eff;
    color: #fff;
  }
  .ellipsis {
    padding: 0 4px;
    color: #909399;
  }
  .size-select {
    height: 32px;
    padding: 0 6px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
  }
  .jumper {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    input {
      width: 50px;
      height: 32px;
      padding: 0 6px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>
