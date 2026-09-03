export interface BasePaginationProps {
  /** 当前页 */
  page: number
  /** 每页条数 */
  pageSize: number
  /** 总条数 */
  total: number
  /** 每页条数可选 */
  pageSizes?: number[]
  /** 显示跳转输入框 */
  showJumper?: boolean
}

export interface BasePaginationEmits {
  (e: 'update:page', page: number): void
  (e: 'update:pageSize', pageSize: number): void
  (e: 'change', payload: { page: number; pageSize: number }): void
}
