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
      operateName: '账户充值-赠送金',
      rechargeAmount: ['-', '+'][Math.round(Math.random() * 1)] + Math.floor(Math.random() * 100),
      useAmount: ['-', '+'][Math.round(Math.random() * 1)] + Math.floor(Math.random() * 100),
      remarks: '',
    })
  }
  return result
})()
export default [
  {
    url: '/basic-api/table/getWalletRechargeList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 5 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
