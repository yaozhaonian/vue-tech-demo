<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDebounce } from '@/composables/useDebounceThrottle'

const heavyLogs = ref<string[]>([])
const inputText = ref('')
const loadTime = ref<string>('')

// 防抖示例：输入停止 400ms 后才执行
const { run: debouncedSearch } = useDebounce((val: string) => {
  heavyLogs.value.unshift(`[${new Date().toLocaleTimeString()}] 搜索："${val}"`)
  if (heavyLogs.value.length > 20) heavyLogs.value.pop()
}, 400)

function onInput(e: Event) {
  inputText.value = (e.target as HTMLInputElement).value
  debouncedSearch(inputText.value)
}

onMounted(() => {
  loadTime.value = `本组件通过路由懒加载（dynamic import）按需加载，挂载时间：${new Date().toLocaleTimeString()}`
})
</script>

<template>
  <div class="page-container">
    <h2 class="page-title">路由懒加载子页面 Demo</h2>
    <div class="card">
      <p>{{ loadTime }}</p>
      <p style="margin: 12px 0">
        路由配置中使用 <code>() => import('@/views/performance/LazyRoute.vue')</code> 实现按需加载。
      </p>
      <p>打开浏览器 Network 面板，首次进入该路由会看到独立 chunk 文件被加载。</p>
    </div>
    <div class="card">
      <h3 style="margin-bottom: 12px">防抖搜索演示（useDebounce）</h3>
      <input
        class="ipt"
        placeholder="快速输入，停止 400ms 后触发"
        :value="inputText"
        @input="onInput"
      />
      <ul class="logs">
        <li v-for="(log, i) in heavyLogs" :key="i">{{ log }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.ipt {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-size: 14px;
}
.logs {
  margin-top: 12px;
  li {
    padding: 6px 0;
    border-bottom: 1px dashed #ebeef5;
    font-family: monospace;
    color: #606266;
  }
}
</style>
