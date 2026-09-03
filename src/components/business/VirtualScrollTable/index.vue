<script setup lang="ts" generic="T extends Record<string, any>">
/**
 * VirtualScrollTable —— 手写简易虚拟滚动大数据表格
 * 思路：
 * 1. 仅渲染可视区域内 + 上下 buffer 缓冲行
 * 2. 通过 translateY 偏移让可视行停留在正确位置
 * 3. 容器总高 = data.length * rowHeight 撑开滚动条
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { VirtualScrollTableProps, VirtualScrollTableEmits } from './types'

const props = withDefaults(defineProps<VirtualScrollTableProps<T>>(), {
  rowHeight: 44,
  height: 480,
  buffer: 8,
  showIndex: false,
  rowKey: 'id',
})

const emit = defineEmits<VirtualScrollTableEmits<T>>()

const wrapRef = ref<HTMLDivElement | null>(null)
const scrollTop = ref(0)

const totalHeight = computed(() => props.data.length * props.rowHeight)

const visibleCount = computed(() => Math.ceil(props.height / props.rowHeight))

const startIdx = computed(() => {
  const idx = Math.floor(scrollTop.value / props.rowHeight) - props.buffer
  return Math.max(0, idx)
})

const endIdx = computed(() => {
  const idx = startIdx.value + visibleCount.value + props.buffer * 2
  return Math.min(props.data.length, idx)
})

const visibleData = computed(() => props.data.slice(startIdx.value, endIdx.value))

const offsetY = computed(() => startIdx.value * props.rowHeight)

function onScroll(e: Event) {
  const target = e.target as HTMLDivElement
  scrollTop.value = target.scrollTop
  emit('scroll', scrollTop.value)
}

function getCellValue(row: T, col: (typeof props.columns)[number], index: number): string {
  if (col.render) return col.render(row, index)
  const val = row[col.prop as keyof T]
  return val === null || val === undefined ? '' : String(val)
}

function onRowClick(row: T, index: number) {
  emit('row-click', row, index)
}

onMounted(() => {
  // noop
})
onBeforeUnmount(() => {
  // noop
})
</script>

<template>
  <div ref="wrapRef" class="v-table" :style="{ height: `${height}px` }" @scroll="onScroll">
    <div class="v-table__phantom" :style="{ height: `${totalHeight}px` }">
      <table class="v-table__table" :style="{ transform: `translateY(${offsetY}px)` }">
        <colgroup>
          <col v-if="showIndex" width="60" />
          <col
            v-for="col in columns"
            :key="String(col.prop)"
            :width="typeof col.width === 'number' ? `${col.width}px` : col.width"
          />
        </colgroup>
        <thead class="v-table__head">
          <tr>
            <th v-if="showIndex" class="v-table__th">序号</th>
            <th v-for="col in columns" :key="String(col.prop)" class="v-table__th">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in visibleData"
            :key="String(row[rowKey as keyof T] ?? startIdx + i)"
            class="v-table__row"
            :style="{ height: `${rowHeight}px` }"
            @click="onRowClick(row, startIdx + i)"
          >
            <td v-if="showIndex" class="v-table__td">{{ startIdx + i + 1 }}</td>
            <td v-for="col in columns" :key="String(col.prop)" class="v-table__td">
              {{ getCellValue(row, col, startIdx + i) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-table {
  position: relative;
  width: 100%;
  overflow: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  &__phantom {
    position: relative;
  }
  &__table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
  }
  &__head {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #f5f7fa;
  }
  &__th,
  &__td {
    padding: 0 12px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
  }
  &__th {
    height: 44px;
    font-weight: 600;
    color: #303133;
  }
  &__td {
    color: #606266;
  }
  &__row {
    cursor: pointer;
    transition: background 0.15s;
    &:hover {
      background: #f0f7ff;
    }
  }
}
</style>
