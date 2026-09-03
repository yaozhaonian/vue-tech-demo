/**
 * 格式化工具函数
 */

/** 千分位格式化数字 */
export function formatThousand(num: number | string): string {
  const n = Number(num)
  if (Number.isNaN(n)) return String(num)
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/** 格式化金额，保留两位小数 */
export function formatMoney(num: number): string {
  return `￥${formatThousand(num.toFixed(2))}`
}

/** 格式化日期 YYYY-MM-DD HH:mm:ss */
export function formatDateTime(date: Date | string | number): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  )
}

/** 格式化日期 YYYY-MM-DD */
export function formatDate(date: Date | string | number): string {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
