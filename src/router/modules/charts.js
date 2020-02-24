/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const chartsRouter = {
  path: '/charts',
  component: Layout,
  redirect: 'noRedirect',
  name: '报表展示',
  meta: {
    title: '报表展示',
    icon: 'chart'
  },
  children: [
    {
      path: 'keyboard',
      component: () => import('@/views/charts/revenue'),
      name: '营收报表',
      meta: { title: '营收报表', noCache: true }
    },
    {
      path: 'line',
      component: () => import('@/views/charts/line'),
      name: '运营报表',
      meta: { title: '运营报表', noCache: true }
    },
    {
      path: 'mix-chart2',
      component: () => import('@/views/charts/mix-chart'),
      name: '员工绩效',
      meta: { title: '员工绩效', noCache: true }
    }
  ]
}

export default chartsRouter
