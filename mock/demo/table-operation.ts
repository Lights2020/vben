import { MockMethod } from 'vite-plugin-mock'
import { resultPageSuccess } from '../_util'

const demoList = (() => {
  const result: any[] = []
  for (let index = 0; index < 10; index++) {
    result.push({
      operationTime: '@datetime',
      imei: Math.floor(Math.random() * 10000) + 'F' + Math.floor(Math.random() * 10) + 'E',
      accountTerminal: ['ios', 'android'][Math.round(Math.random() * 1)],
      operationDetail: ['登录', '退出'][Math.round(Math.random() * 1)],
    })
  }
  return result
})()
export default [
  {
    url: '/basic-api/table/getOperationList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
