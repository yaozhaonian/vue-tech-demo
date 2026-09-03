/**
 * useImageLazy
 * 图片懒加载组合式函数：基于 IntersectionObserver
 */
import { onMounted, onBeforeUnmount, type Directive } from 'vue'

/** 图片懒加载指令：v-lazy="url" */
export const lazyImageDirective: Directive<HTMLImageElement, string> = {
  mounted(el, binding) {
    const src = binding.value
    if (!src) return
    // 占位
    el.dataset.src = src
    el.src =
      'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPjwvc3ZnPg=='

    if (typeof IntersectionObserver === 'undefined') {
      el.src = src
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement
            target.src = target.dataset.src || src
            target.removeAttribute('data-src')
            observer.unobserve(target)
          }
        })
      },
      { rootMargin: '50px' }
    )
    observer.observe(el)
    // 复用 el 上的 observer 引用便于卸载
    ;(el as any).__lazyObserver__ = observer
  },
  unmounted(el) {
    const observer = (el as any).__lazyObserver__ as IntersectionObserver | undefined
    observer?.disconnect()
  },
}

/**
 * useImageLazy：返回一个可以手动控制懒加载的组合函数
 * 监听一组元素，进入视口后加载真实 src
 */
export function useImageLazy() {
  let observer: IntersectionObserver | null = null

  const observe = (el: HTMLImageElement, src: string) => {
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLImageElement
              target.src = src
              observer?.unobserve(target)
            }
          })
        },
        { rootMargin: '50px' }
      )
    }
    el.dataset.src = src
    observer.observe(el)
  }

  const disconnect = () => {
    observer?.disconnect()
    observer = null
  }

  onMounted(() => {})
  onBeforeUnmount(() => {
    disconnect()
  })

  return { observe, disconnect }
}
