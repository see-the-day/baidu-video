export interface Table {
  title: string,
  key: string,
  children?: Table[],
  width?: number,
  fixed?: string,
  sorter?: string,
  align?: string,
  ellipsis?: boolean,
  render?: (row: any, index: number) => any
}

export interface LineData {
  gmv_line: [],
  sales_line: [],
  title: string[]
}

export interface ChartList {
  shop_id: string,
  shop_name: string,
  value: number,
  index: number
}
export interface ReturnChartList {
  id: string,
  key: string,
  value: number,
  index: number
}

export interface BrandData {
  pay: ReturnChartList[],
  amount: ReturnChartList[],
}

export interface Website {
  value?: number,
  label?: string
}
