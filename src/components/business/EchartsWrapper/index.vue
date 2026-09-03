<script setup lang="ts">
/**
 * EchartsWrapper —— ECharts 二次封装
 * - 支持折线图 / 柱状图切换
 * - 支持时间筛选（最近 7/30/90 天）
 */
import { ref, watch, onMounted, onBeforeUnmount, shallowRef, computed } from 'vue'
import * as echarts from 'echarts'
import type { EchartsWrapperProps, EchartsWrapperEmits } from './types'

const props = withDefaults(defineProps<EchartsWrapperProps>(), {
  type: 'line',
  height: 360,
  stack: false,
  smooth: true,
  title: '',
})

const emit = defineEmits<EchartsWrapperEmits>()

const chartRef = ref<HTMLDivElement | null>(null)
const chartInstance = shallowRef<echarts.ECharts | null>(null)

const timeRange = ref<7 | 30 | 90>(30)

const chartHeight = computed(() =>
  typeof props.height === 'number' ? `${props.height}px` : props.height
)

function buildOption(): echarts.EChartsOption {
  const series = props.series.map((s) => ({
    name: s.name,
    type: props.type,
    data: s.data,
    smooth: props.smooth && props.type === 'line',
    stack: props.stack ? 'total' : undefined,
    areaStyle: props.type === 'line' ? { opacity: 0.15 } : undefined,
  }))

  return {
    title: props.title
      ? { text: props.title, left: 'left', textStyle: { fontSize: 14 } }
      : undefined,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    legend: {
      top: 10,
      data: props.series.map((s) => s.name),
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: { title: '保存为图片' },
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: props.type === 'bar',
      data: props.xAxisData,
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'value',
    },
    series: series as any,
  }
}

function render() {
  if (!chartInstance.value) return
  // notMerge=true：整图替换，避免新旧数据残留，无需销毁重建实例
  chartInstance.value.setOption(buildOption(), true)
}

function onTimeChange() {
  // 计算最近 N 天的起止日期，并把选中的天数一并抛出，供父级按天数拉取 mock 数据
  const end = new Date()
  const start = new Date()
  start.setDate(end.getDate() - (timeRange.value - 1))
  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  emit('time-change', {
    days: timeRange.value,
    start: fmt(start),
    end: fmt(end),
  })
}

function onLegendSelectChanged(params: any) {
  emit('legend-select', params.name)
}

function handleResize() {
  chartInstance.value?.resize()
}

/** 销毁当前 ECharts 实例并解绑事件，防止多实例内存泄漏 */
function disposeChart() {
  if (chartInstance.value) {
    chartInstance.value.off('legendselectchanged', onLegendSelectChanged)
    chartInstance.value.dispose()
    chartInstance.value = null
  }
}

/** 初始化 ECharts 实例；若已存在先销毁，保证同一容器只持有一个实例 */
function initChart() {
  if (!chartRef.value) return
  disposeChart()
  const instance = echarts.init(chartRef.value)
  instance.on('legendselectchanged', onLegendSelectChanged)
  chartInstance.value = instance
  render()
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  disposeChart()
})

watch(
  () => [props.type, props.series, props.xAxisData, props.stack, props.smooth, props.title],
  () => render(),
  { deep: true }
)

defineExpose({ chartInstance, render })
</script>

<template>
  <div class="echarts-wrapper">
    <div class="echarts-wrapper__toolbar">
      <div class="time-filter">
        <span>时间筛选：</span>
        <label v-for="d in [7, 30, 90]" :key="d">
          <input
            type="radio"
            name="time-range"
            :value="d"
            v-model="timeRange"
            @change="onTimeChange"
          />
          最近 {{ d }} 天
        </label>
      </div>
      <div class="type-switch">
        <button
          class="btn"
          :class="{ 'btn-primary': type === 'line' }"
          @click="$emit('update:type', 'line')"
        >
          折线图
        </button>
        <button
          class="btn"
          :class="{ 'btn-primary': type === 'bar' }"
          @click="$emit('update:type', 'bar')"
        >
          柱状图
        </button>
      </div>
    </div>
    <div ref="chartRef" class="echarts-wrapper__chart" :style="{ height: chartHeight }"></div>
  </div>
</template>

<script lang="ts">
export default { name: 'EchartsWrapper' }
</script>

<style scoped lang="scss">
.echarts-wrapper {
  &__toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    flex-wrap: wrap;
    gap: 8px;
  }
  .time-filter {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 13px;
    label {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
    }
  }
  .type-switch {
    display: flex;
    gap: 6px;
  }
  &__chart {
    width: 100%;
  }
}
</style>
