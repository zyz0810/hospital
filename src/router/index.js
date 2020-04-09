import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import chartsRouter from './modules/charts'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: '首页',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/counselor',
  //   alwaysShow: true,
  //   name: '用户管理',
  //   meta: { title: '用户管理', icon: 'user' },
  //   children: [
  //
  //     {
  //       path: 'counselor',
  //       component: () => import('@/views/user/index'),
  //       name: '咨询师',
  //       meta: { title: '咨询师' }
  //     },
  //     {
  //       path: 'doctor',
  //       component: () => import('@/views/user/doctor'),
  //       name: '医生',
  //       meta: { title: '医生' }
  //     },
  //     // {
  //     //   path: 'assistant',
  //     //   component: () => import('@/views/user/assistant'),
  //     //   name: '助理',
  //     //   meta: { title: '助理' }
  //     // },
  //     {
  //       path: 'return',
  //       component: () => import('@/views/user/return'),
  //       name: '回访人员',
  //       meta: { title: '回访人员' }
  //     },
  //     {
  //       path: 'account',
  //       component: () => import('@/views/user/account'),
  //       name: '系统账户',
  //       meta: { title: '系统账户' }
  //     },
  //   ]
  // },
  // {
  //   path: '/hospital',
  //   component: Layout,
  //   redirect: '/hospital/list',
  //   name: '医院管理',
  //   meta: {
  //     title: '医院管理',
  //     icon: 'example'
  //   },
  //   children: [
  //     // {
  //     //   path: 'create',
  //     //   component: () => import('@/views/example/create'),
  //     //   name: '添加医院详情',
  //     //   meta: { title: '添加医院详情' }
  //     // },
  //     {
  //       path: 'view/:id(\\d+)',
  //       component: () => import('@/views/hospital/view'),
  //       name: '医院详情',
  //       meta: { title: '医院详情', noCache: true, activeMenu: '/hospital/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/hospital/list'),
  //       name: '医院列表',
  //       meta: { title: '医院列表' }
  //     }
  //   ]
  // },
  // {
  //   path: '/data',
  //   component: Layout,
  //   redirect: '/data/patient',
  //   name: '数据录入',
  //   meta: {
  //     title: '数据录入',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'patient',
  //       component: () => import('@/views/data/patient'),
  //       name: '病人',
  //       meta: { title: '病人' }
  //     },
  //     {
  //       path: 'consult',
  //       component: () => import('@/views/data/consult'),
  //       name: '咨询',
  //       meta: { title: '咨询' }
  //     },
  //     {
  //       path: 'custorm/:id(\\d+)',
  //       component: () => import('@/views/patient/view'),
  //       name: '病人基本信息页',
  //       meta: { title: '病人基本信息页', noCache: true, activeMenu: '/data/patient' },
  //       hidden: true
  //     },
  //     {
  //       path: 'outpatient',
  //       component: () => import('@/views/data/outpatient'),
  //       name: '门诊',
  //       meta: { title: '门诊' }
  //     },
  //     {
  //       path: 'addOutpatient',
  //       component: () => import('@/views/data/addOutpatient'),
  //       name: '门诊记录',
  //       meta: { title: '门诊记录' },
  //       hidden: true
  //     },
  //     {
  //       path: 'return',
  //       component: () => import('@/views/data/return'),
  //       name: '回访',
  //       meta: { title: '回访' }
  //     },
  //     {
  //       path: 'pay',
  //       component: () => import('@/views/data/pay'),
  //       name: '缴费',
  //       meta: { title: '缴费' }
  //     },
  //     {
  //       path: 'hospitalization',
  //       component: () => import('@/views/data/hospitalization'),
  //       name: '住院',
  //       meta: { title: '住院' }
  //     },
  //     {
  //       path: 'operation',
  //       component: () => import('@/views/data/operation'),
  //       name: '手术',
  //       meta: { title: '手术' }
  //     },
  //     {
  //       path: 'doctor',
  //       component: () => import('@/views/data/doctor'),
  //       name: '医生收入',
  //       meta: { title: '医生收入' }
  //     }
  //   ]
  // },
  // chartsRouter,
];
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutesData = [
  {
    path: '/data',
    component: Layout,
    redirect: '/data/patient',
    name: '数据录入',
    meta: {
      title: '数据录入',
      icon: 'excel'
    },
    children: [
      {
        path: 'patient',
        component: () => import('@/views/data/patient'),
        name: '病人',
        meta: { title: '病人' }
      },
      {
        path: 'custorm/:id(\\d+)',
        component: () => import('@/views/patient/view'),
        name: '病人基本信息页',
        meta: { title: '病人基本信息页', noCache: true, activeMenu: '/data/patient' },
        hidden: true
      },
    ]
  },
];
// export const asyncRoutes = [
//   {
//     path: '/user',
//     component: Layout,
//     redirect: '/user/counselor',
//     alwaysShow: true,
//     name: '用户管理',
//     meta: { title: '用户管理', icon: 'user' },
//     children: [
//
//       {
//         path: 'counselor',
//         component: () => import('@/views/user/index'),
//         name: '咨询师',
//         meta: { title: '咨询师' }
//       },
//       {
//         path: 'doctor',
//         component: () => import('@/views/user/doctor'),
//         name: '医生',
//         meta: { title: '医生' }
//       },
//       // {
//       //   path: 'assistant',
//       //   component: () => import('@/views/user/assistant'),
//       //   name: '助理',
//       //   meta: { title: '助理' }
//       // },
//       {
//         path: 'return',
//         component: () => import('@/views/user/return'),
//         name: '回访人员',
//         meta: { title: '回访人员' }
//       },
//       {
//         path: 'account',
//         component: () => import('@/views/user/account'),
//         name: '系统账户',
//         meta: { title: '系统账户' }
//       },
//     ]
//   },
// ];
export const asyncRoutesHospital = [
  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital/list',
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'example'
    },
    children: [
      // {
      //   path: 'create',
      //   component: () => import('@/views/example/create'),
      //   name: '添加医院详情',
      //   meta: { title: '添加医院详情' }
      // },
      {
        path: 'view/:id(\\d+)',
        component: () => import('@/views/hospital/view'),
        name: '医院详情',
        meta: { title: '医院详情', noCache: true, activeMenu: '/hospital/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/hospital/list'),
        name: '医院列表',
        meta: { title: '医院列表' }
      },
      {
        path: 'list',
        component: () => import('@/views/data/source'),
        name: '门诊来源',
        meta: { title: '门诊来源' }
      },
      {
        path: 'list',
        component: () => import('@/views/data/disease'),
        name: '门诊病种',
        meta: { title: '门诊病种' }
      }
    ]
  },
];
export const asyncRoutesOutpatient = {
        path: 'outpatient',
        component: () => import('@/views/data/outpatient'),
        name: '门诊',
        meta: { title: '门诊' }
      };
export const asyncRoutesPay = {
        path: 'pay',
        component: () => import('@/views/data/pay'),
        name: '缴费',
        meta: { title: '缴费' }
      };
export const asyncRoutesHospitalization = {
        path: 'hospitalization',
        component: () => import('@/views/data/hospitalization'),
        name: '住院',
        meta: { title: '住院' }
      };
export const asyncRoutesOperation = {
        path: 'operation',
        component: () => import('@/views/data/operation'),
        name: '手术',
        meta: { title: '手术' }
      };
export const asyncRoutesConsult ={
        path: 'consult',
        component: () => import('@/views/data/consult'),
        name: '咨询',
        meta: { title: '咨询' }
      };
export const asyncRoutesReturn = {
        path: 'return',
        component: () => import('@/views/data/return'),
        name: '回访',
        meta: { title: '回访' }
      };
export const asyncRoutesDoctor = {
        path: 'doctor',
        component: () => import('@/views/data/doctor'),
        name: '医生收入',
        meta: { title: '医生收入' }
      };
export const asyncRoutesChart = [
  {
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
        path: 'revenue11',
        component: () => import('@/views/charts/revenue'),
        name: '报表详情',
        meta: { title: '报表详情', noCache: true },
        hidden:true
      },
    ]
  }
];
export const asyncRoutesRevenue = {
        path: 'revenue',
        component: () => import('@/views/charts/revenue'),
        name: '营收报表',
        meta: { title: '营收报表', noCache: true }
      };
export const asyncRoutesOperate = {
        path: 'operate',
        component: () => import('@/views/charts/operate'),
        name: '运营报表',
        meta: { title: '运营报表', noCache: true }
      };
export const asyncRoutesPerformance = {
        path: 'performance',
        component: () => import('@/views/charts/performance'),
        name: '员工绩效',
        meta: { title: '员工绩效', noCache: true }
      };



export  const asyncRoutes=[
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       component: () => import('@/views/dashboard/index'),
  //       name: '首页',
  //       meta: { title: '首页', icon: 'dashboard', affix: true,roles: ['首页'] }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    name: '用户管理',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['用户管理权限']
    },
    children: [

      {
        path: 'counselor',
        component: () => import('@/views/user/index'),
        name: '咨询师',
        meta: { title: '咨询师' }
      },
      {
        path: 'doctor',
        component: () => import('@/views/user/doctor'),
        name: '医生',
        meta: { title: '医生' }
      },
      // {
      //   path: 'assistant',
      //   component: () => import('@/views/user/assistant'),
      //   name: '助理',
      //   meta: { title: '助理' }
      // },
      {
        path: 'return',
        component: () => import('@/views/user/return'),
        name: '回访员',
        meta: { title: '回访员' }
      },
      {
        path: 'account',
        component: () => import('@/views/user/account'),
        name: '系统账户',
        meta: { title: '系统账户' }
      },
    ]
  },
  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital/list',
    name: '系统设置',
    meta: {
      title: '系统设置',
      icon: 'example',
      roles: ['医院权限']
    },
    children: [
      // {
      //   path: 'create',
      //   component: () => import('@/views/example/create'),
      //   name: '添加医院详情',
      //   meta: { title: '添加医院详情' }
      // },
      {
        path: 'view/:id(\\d+)',
        component: () => import('@/views/hospital/view'),
        name: '医院详情',
        meta: { title: '医院详情', noCache: true, activeMenu: '/hospital/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import('@/views/hospital/list'),
        name: '医院列表',
        meta: { title: '医院列表' }
      },
      {
        path: 'source',
        component: () => import('@/views/data/source'),
        name: '门诊来源',
        meta: { title: '门诊来源' }
      },
      {
        path: 'disease',
        component: () => import('@/views/data/disease'),
        name: '门诊病种',
        meta: { title: '门诊病种' }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: 'noRedirect',
    name: '数据录入',
    meta: {
      title: '数据录入',
      icon: 'excel'
    },
    children: [
      {
        path: 'patient',
        component: () => import('@/views/data/patient'),
        name: '病人',
        meta: { title: '病人' }
      },
      {
        path: 'custorm/:id(\\d+)',
        component: () => import('@/views/patient/view'),
        name: '病人基本信息页',
        meta: { title: '病人基本信息页', noCache: true, activeMenu: '/data/patient' },
        hidden: true
      },
      {
        path: 'consult',
        component: () => import('@/views/data/consult'),
        name: '咨询',
        meta: { title: '咨询',
          roles: ['咨询权限'] }
      },
      {
        path: 'outpatient',
        component: () => import('@/views/data/outpatient'),
        name: '门诊',
        meta: { title: '门诊',
          roles: ['门诊权限'] }
      },
      // {
      //   path: 'addOutpatient',
      //   component: () => import('@/views/data/addOutpatient'),
      //   name: '门诊记录',
      //   meta: { title: '门诊记录' },
      //   hidden: true
      // },
      {
        path: 'return',
        component: () => import('@/views/data/return'),
        name: '回访',
        meta: { title: '回访' ,
          roles: ['回访权限']}
      },
      {
        path: 'pay',
        component: () => import('@/views/data/pay'),
        name: '缴费',
        meta: { title: '缴费',
          roles: ['缴费权限'] }
      },
      {
        path: 'hospitalization',
        component: () => import('@/views/data/hospitalization'),
        name: '住院',
        meta: { title: '住院' ,
          roles: ['住院权限']}
      },
      {
        path: 'operation',
        component: () => import('@/views/data/operation'),
        name: '手术',
        meta: { title: '手术',
          roles: ['手术权限'] }
      },
      // {
      //   path: 'doctor',
      //   component: () => import('@/views/data/doctor'),
      //   name: '医生收入',
      //   meta: { title: '医生收入',
      //     roles: ['医生权限'] }
      // }
    ]
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noRedirect',
    name: '报表展示',
    meta: {
      title: '报表展示',
      icon: 'chart' ,
      roles: ['报表权限','运营权限','绩效权限']
    },
    children: [
      {
        path: 'revenue',
        component: () => import('@/views/charts/revenue'),
        name: '营收报表',
        meta: { title: '营收报表', noCache: true ,
          roles: ['报表权限']}
      },
      {
        path: 'operate',
        component: () => import('@/views/charts/operate'),
        name: '运营报表',
        meta: { title: '运营报表', noCache: true,
          roles: ['运营权限'] }
      },
      {
        path: 'performance',
        component: () => import('@/views/charts/performance'),
        name: '员工绩效',
        meta: { title: '员工绩效', noCache: true ,
          roles: ['绩效权限']}
      },
      {
        path: 'hospital',
        component: () => import('@/views/charts/hospital'),
        name: '医院报表',
        meta: { title: '医院报表', noCache: true ,
          roles: ['绩效权限']}
      }
    ]
  }
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
