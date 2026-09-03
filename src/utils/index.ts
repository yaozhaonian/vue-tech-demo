/**
 * 通用工具函数
 */

/** 生成唯一 id */
export function uniqueId(prefix = 'id'): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

/** 深拷贝（基于 JSON，适合纯数据） */
export function deepClone<T>(data: T): T {
  if (data === null || typeof data !== 'object') return data
  return JSON.parse(JSON.stringify(data))
}

/** 判断是否为空值 */
export function isEmpty(val: unknown): boolean {
  if (val === null || val === undefined || val === '') return true
  if (Array.isArray(val)) return val.length === 0
  if (typeof val === 'object') return Object.keys(val as object).length === 0
  return false
}

export * from './format'
