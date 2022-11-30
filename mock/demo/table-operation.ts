import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
import { resultPageSuccess } from '../_util'

function getRandomPics(count = 10): string[] {
  const arr: string[] = []
  for (let i = 0; i < count; i++) {
    arr.push(Random.image('800x600', Random.color(), Random.color(), Random.title()))
  }
  return arr
}

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
