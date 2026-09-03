export interface VirtualColumn<T = Record<string, any>> {
  /** 字段名 */
  prop: keyof T | string
  /** 表头标题 */
  label: string
  /** 列宽 */
  width?: number | string
  /** 是否固定列 */
  fixed?: 'left' | 'right'
  /** 自定义渲染函数 */
  render?: (row: T, index: number) => string
}

export interface VirtualScrollTableProps<T = Record<string, any>> {
  /** 数据源 */
  data: T[]
  /** 列配置 */
  columns: VirtualColumn<T>[]
  /** 行高（px） */
  rowHeight?: number
  /** 视口高度（px） */
  height?: number
  /** 上下额外渲染的缓冲条数 */
  buffer?: number
  /** 是否显示序号列 */
  showIndex?: boolean
  /** 行 key */
  rowKey?: keyof T | string
}

export interface VirtualScrollTableEmits<T = Record<string, any>> {
  (e: 'row-click', row: T, index: number): void
  (e: 'scroll', scrollTop: number): void
}
