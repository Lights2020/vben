import { MockMethod } from 'vite-plugin-mock'
import { resultPageSuccess } from '../_util'

const demoList = (() => {
  const result: any[] = []
  for (let index = 0; index < 10; index++) {
    result.push({
      couponNo: Math.floor(Math.random() * 1000000000),
      couponName: ['经济专车', '豪华专车'][Math.round(Math.random() * 1)] + 'TG专属优惠券',
      couponType: '现金券',
      couponNum: Math.floor(Math.random() * 100) + 'USD',
      couponValidity: Math.floor(Math.random() * 100),
      couponValidityDate: '@datetime',
      couponState: ['未使用', '已使用'][Math.round(Math.random() * 1)],
      couponUseDate: '@datetime',
    })
  }
  return result
})()
export default [
  {
    url: '/basic-api/table/getCouponTravelList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 5 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
