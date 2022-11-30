import { defHttp } from '/@/utils/http/axios'
import { DemoParams, DemoListGetResultModel } from './model/tableModel'

enum Api {
  DEMO_LIST = '/table/getCouponEquitylList',
}

/**
 * @description: Get sample list value
 */

export const couponEquityApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  })
