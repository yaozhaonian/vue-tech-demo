/**
 * useDebounceThrottle
 * 防抖、节流组合式函数
 */
import { ref, type Ref } from 'vue'

/** 防抖：在最后一次触发后 wait 毫秒执行 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  wait = 300
): { run: (...args: Parameters<T>) => void; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  const run = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, wait)
  }
  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return { run, cancel }
}

/** 节流：每 wait 毫秒最多执行一次 */
export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  wait = 300
): { run: (...args: Parameters<T>) => void; cancel: () => void } {
  let last = 0
  let timer: ReturnType<typeof setTimeout> | null = null
  const run = (...args: Parameters<T>) => {
    const now = Date.now()
    const remaining = wait - (now - last)
    if (remaining <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      last = now
      fn(...args)
    } else if (!timer) {
      timer = setTimeout(() => {
        last = Date.now()
        timer = null
        fn(...args)
      }, remaining)
    }
  }
  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
  return { run, cancel }
}

/**
 * 带响应式 loading 状态的防抖函数
 */
export function useDebounceRef<T extends (...args: any[]) => any>(
  fn: T,
  wait = 300
): { run: (...args: Parameters<T>) => void; loading: Ref<boolean>; cancel: () => void } {
  const loading = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null
  const run = (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    loading.value = true
    timer = setTimeout(() => {
      try {
        fn(...args)
      } finally {
        loading.value = false
        timer = null
      }
    }, wait)
  }
  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    loading.value = false
  }
  return { run, loading, cancel }
}
