<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EchartsWrapper from '@/components/business/EchartsWrapper/index.vue'
import type { EchartsSeries, EchartsType, TimeChangePayload } from '@/components/business/EchartsWrapper/types'
import { fetchChartSeries } from '@/api/mockApi'

const chartType = ref<EchartsType>('line')
const xAxisData = ref<string[]>([])
const series = ref<EchartsSeries[]>([])

async function load(days = 30) {
  const res = await fetchChartSeries(days)
  xAxisData.value = res.data.map((i) => i.date)
  series.value = [
    { name: '指标A', data: res.data.map((i) => i.value1) },
    { name: '指标B', data: res.data.map((i) => i.value2) },
  ]
}

// 时间筛选切换：用组件抛出的天数重新拉取对应长度的 mock 数据
function onTimeChange(payload: TimeChangePayload) {
  load(payload.days)
}

onMounted(() => load())
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">ECharts 封装 Demo</h2>
    <div class="card">
      <EchartsWrapper
        v-model:type="chartType"
        title="本地 Mock 时序数据"
        :x-axis-data="xAxisData"
        :series="series"
        :height="380"
        smooth
        @time-change="onTimeChange"
      />
    </div>
    <div class="card">
      <h3 style="margin-bottom: 8px">说明</h3>
      <p>1. 支持折线图 / 柱状图切换</p>
      <p>2. 支持时间筛选（7 / 30 / 90 天），切换后重新拉取 mock 数据</p>
      <p>3. 组件内部已对 ECharts 进行 resize / dispose 处理</p>
    </div>
  </div>
</template>
