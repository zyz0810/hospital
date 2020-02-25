import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'Documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'Guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/counselor',
    alwaysShow: true,
    name: '用户管理',
    meta: { title: '用户管理', icon: 'user' },
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
      {
        path: 'assistant',
        component: () => import('@/views/user/assistant'),
        name: '助理',
        meta: { title: '助理' }
      },
      {
        path: 'return',
        component: () => import('@/views/user/return'),
        name: '回访人员',
        meta: { title: '回访人员' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import('@/views/example/edit'),
        name: '医生详情',
        meta: { title: '医生详情', noCache: true, activeMenu: '/example/list' },
        hidden: true
      }
    ]
  },
  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital/list',
    name: '医院管理',
    meta: {
      title: '医院管理',
      icon: 'example'
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/hospital/list'),
        name: '医院',
        meta: { title: '医院列表' }
      },
      {
        path: 'list',
        component: () => import('@/views/hospital/list'),
        name: '医院列表',
        meta: { title: '医院列表' }
      },
      {
        path: 'view/:id(\\d+)',
        component: () => import('@/views/hospital/view'),
        name: '医院详情',
        meta: { title: '医院详情', noCache: true, activeMenu: '/hospital/list' },
        hidden: true
      }
    ]
  },
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
        path: 'consult',
        component: () => import('@/views/data/consult'),
        name: '咨询',
        meta: { title: '咨询' }
      },
      {
        path: 'custorm/:id(\\d+)',
        component: () => import('@/views/patient/view'),
        name: '病人基本信息页',
        meta: { title: '病人基本信息页', noCache: true, activeMenu: '/excel/export-excel' },
        hidden: true
      },
      {
        path: 'outpatient',
        component: () => import('@/views/data/outpatient'),
        name: '门诊',
        meta: { title: '门诊' }
      },
      {
        path: 'return',
        component: () => import('@/views/data/return'),
        name: '回访',
        meta: { title: '回访' }
      }
    ]
  },
  chartsRouter,
  // {
  //   path: '/user',
  //   component: Layout,
  //   redirect: '/user/download',
  //   alwaysShow: true,
  //   name: '报表展示',
  //   meta: { title: '报表展示', icon: 'user' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/user/index'),
  //       name: '营收报表',
  //       meta: { title: '营收报表' }
  //     },
  //     {
  //       path: 'download',
  //       component: () => import('@/views/user/index'),
  //       name: '运营报表',
  //       meta: { title: '运营报表' }
  //     },
  //     {
  //       path: 'download',
  //       component: () => import('@/views/user/index'),
  //       name: '客户报表',
  //       meta: { title: '客户报表' }
  //     },
  //     {
  //       path: 'download',
  //       component: () => import('@/views/user/index'),
  //       name: '员工绩效',
  //       meta: { title: '员工绩效' }
  //     }
  //   ]
  // },

  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  //
  // nestedRouter,
  tableRouter,
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: '医院管理',
  //   meta: {
  //     title: '医院管理',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: '医院列表',
  //       meta: { title: '医院列表', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: '医院详情',
  //       meta: { title: '医院详情', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },
  //
  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
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
