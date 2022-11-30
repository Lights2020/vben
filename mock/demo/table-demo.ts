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
  for (let index = 0; index < 200; index++) {
    result.push({
      tel: '1' + Math.floor(Math.random() * 10000000000),
      nickName: 'LV' + Math.floor(Math.random() * 10000000),
      level: Math.floor(Math.random() * 10),
      lastLoginTime: '@datetime',
      lastPosition: '@city()',
      imei: Math.floor(Math.random() * 10000) + 'F' + Math.floor(Math.random() * 10) + 'E',
      logonTime: '@datetime',
      logonPosition: '@city()',
      logonImei: Math.floor(Math.random() * 10000) + 'F' + Math.floor(Math.random() * 10) + 'E',
      accountState: ['正常', '禁用'][Math.round(Math.random() * 1)],
      accountTerminal: ['ios', 'android'][Math.round(Math.random() * 1)],
      accountVersion: ['12.2', '10.1'][Math.round(Math.random() * 1)],
      accountLang: ['en', 'zh_cn'][Math.round(Math.random() * 1)],
      channel: '乐马',
      userType: ['企业用户', '个人用户'][Math.round(Math.random() * 1)],
      enterpriseName: '雷门小店',
      enterpriseStaff: '小马',
    })
  }
  return result
})()

export default [
  {
    url: '/basic-api/table/getDemoList',
    timeout: 100,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query
      return resultPageSuccess(page, pageSize, demoList)
    },
  },
] as MockMethod[]
