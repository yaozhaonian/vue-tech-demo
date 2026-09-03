/**
 * mockApi.ts
 * 本地生成 mock 数据，模拟接口返回。
 * 全部使用 Promise + setTimeout 模拟异步请求，不请求任何外部接口。
 */
import type { ApiResult } from './request'

/* ----------------- 类型定义 ----------------- */
export interface TableListItem {
  id: number
  name: string
  age: number
  email: string
  department: string
  status: 'active' | 'inactive' | 'pending'
  salary: number
  address: string
  createdAt: string
}

export interface ChartSeriesItem {
  date: string
  value1: number
  value2: number
}

export interface PaginationParams {
  page: number
  pageSize: number
}

/* ----------------- 工具函数 ----------------- */
function delay<T>(data: T, ms = 300): Promise<ApiResult<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, message: 'ok', data })
    }, ms)
  })
}

const DEPARTMENTS = ['研发部', '产品部', '设计部', '运营部', '市场部', '人事部', '财务部']
const STATUSES: TableListItem['status'][] = ['active', 'inactive', 'pending']

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`
}

function randomDate() {
  const start = new Date(2020, 0, 1).getTime()
  const end = Date.now()
  const t = new Date(start + Math.random() * (end - start))
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
}

/* 预生成 1200 条数据，供虚拟滚动表格与分页表格共用 */
const TOTAL = 1200
const tableList: TableListItem[] = Array.from({ length: TOTAL }, (_, i) => {
  const id = i + 1
  return {
    id,
    name: `用户${String(id).padStart(4, '0')}`,
    age: 18 + Math.floor(Math.random() * 42),
    email: `user${id}@tech-demo.com`,
    department: DEPARTMENTS[i % DEPARTMENTS.length],
    status: STATUSES[i % STATUSES.length],
    salary: 5000 + Math.floor(Math.random() * 45000),
    address: `城市${(i % 20) + 1}街道${(i % 50) + 1}号`,
    createdAt: randomDate(),
  }
})

/* ----------------- Mock 接口 ----------------- */

/** 全量数据（虚拟滚动表格使用，一次性返回所有数据） */
export function fetchAllTableList(): Promise<ApiResult<TableListItem[]>> {
  return delay(tableList)
}

/** 分页数据（分页表格使用） */
export function fetchTableListByPage(params: PaginationParams): Promise<
  ApiResult<{
    list: TableListItem[]
    total: number
  }>
> {
  const { page, pageSize } = params
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return delay({
    list: tableList.slice(start, end),
    total: tableList.length,
  })
}

/** 图表时序数据（支持按天数过滤） */
export function fetchChartSeries(days = 30): Promise<ApiResult<ChartSeriesItem[]>> {
  const today = new Date()
  const list: ChartSeriesItem[] = Array.from({ length: days }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (days - 1 - i))
    return {
      date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
      value1: Math.floor(Math.random() * 400) + 100,
      value2: Math.floor(Math.random() * 400) + 100,
    }
  })
  return delay(list)
}

/** 模拟文件上传 */
export function mockUploadFile(file: File): Promise<ApiResult<{ url: string; name: string }>> {
  return delay(
    {
      url: `mock://local/${encodeURIComponent(file.name)}`,
      name: file.name,
    },
    500
  )
}
