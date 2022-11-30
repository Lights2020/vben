import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'
import { t } from '/@/hooks/web/useI18n'

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    orderNo: 10,
    icon: 'mdi:user-details',
    title: t('routes.demo.user.userManager'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'UserIndex',
      component: () => import('/@/views/user/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.demo.user.userCenter'),
      },
    },
    // {
    //   path: 'workbench',
    //   name: 'Workbench',
    //   component: () => import('/@/views/dashboard/workbench/index.vue'),
    //   meta: {
    //     title: t('routes.dashboard.workbench'),
    //   },
    // },
  ],
}

export default user
