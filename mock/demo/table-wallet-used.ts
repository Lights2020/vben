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
      operateTime: '@datetime',
      operateName: '消费',
      orderType: '实时用车',
      orderNo: Math.floor(Math.random() * 1000000000),
      useAmount: Math.floor(Math.random() * 1000) + 'USD',
    })
  }
  return result
})()
export default [
  {
    url: '/basic-api/table/getWalletUsedList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 5 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
