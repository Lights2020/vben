export interface ListItem {
  title: string
  icon: string
  color?: string
}

export interface TabItem {
  key: string
  name: string
  component: string
}

export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '基础信息',
    component: 'basicInfo',
  },
  {
    key: '2',
    name: '订单信息',
    component: 'orderInfo',
  },
  {
    key: '3',
    name: '钱包信息',
    component: 'walletInfo',
  },
  {
    key: '4',
    name: '优惠信息',
    component: 'discountInfo',
  },
  {
    key: '5',
    name: '操作日志',
    component: 'operationInfo',
  },
]
