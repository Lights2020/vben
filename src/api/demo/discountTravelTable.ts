import { defHttp } from '/@/utils/http/axios'
import { DemoParams, DemoListGetResultModel } from './model/tableModel'

enum Api {
  DEMO_LIST = '/table/getCouponTravelList',
}

/**
 * @description: Get sample list value
 */

export const couponTravelApi = (params: DemoParams) =>
  defHttp.get<DemoListGetResultModel>({
    url: Api.DEMO_LIST,
    params,
    headers: {
      // @ts-ignore
      ignoreCancelToken: true,
    },
  })
