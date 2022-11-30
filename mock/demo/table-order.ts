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
      orderNo: Math.floor(Math.random() * 10000000000),
      orderTime: '@datetime',
      orderType: '普通送机',
      orderStatus: '调度中',
      placeDeparture: '@city()',
      placeDestination: '@city()',
      city: '@city()',
      price: Math.floor(Math.random() * 100) + 'USD',
      carType: '',
    })
  }
  return result
})()
export default [
  {
    url: '/basic-api/table/getOrderList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 5 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
