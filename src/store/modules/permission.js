// import { asyncRoutes, constantRoutes,asyncRoutesHospital,asyncRoutesOutpatient,asyncRoutesPay,asyncRoutesHospitalization,asyncRoutesOperation,asyncRoutesConsult,asyncRoutesReturn,asyncRoutesDoctor
// ,asyncRoutesRevenue,asyncRoutesOperate,asyncRoutesPerformance,asyncRoutesData,asyncRoutesChart} from '@/router'
import { asyncRoutes,constantRoutes} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes = [];
      // if (roles.includes('门诊权限')) {
      //   asyncRoutesData[0].children.push(asyncRoutesOutpatient);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesData || []);
      // }
      // if (roles.includes('缴费权限')) {
      //   asyncRoutesData[0].children.push(asyncRoutesPay);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesData || [])
      // }
      // if (roles.includes('住院权限')) {
      //   asyncRoutesData[0].children.push(asyncRoutesHospitalization);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesData || [])
      // }
      // if (roles.includes('手术权限')) {
      //   asyncRoutesData[0].children.push(asyncRoutesOperation);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesData || [])
      // }
      // if (roles.includes('咨询权限')) {
      //   asyncRoutesData[0].children.push(asyncRoutesConsult);
      //   asyncRoutesData[0].children.push(asyncRoutesDoctor);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesData || [])
      // }
      // if (roles.includes('回访权限')) {
      //   asyncRoutesData[0].children.push(asyncRoutesReturn);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesData || [])
      // }
      // if (roles.includes('报表权限')) {
      //   asyncRoutesChart[0].children.push(asyncRoutesRevenue);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesChart || [])
      // }
      // if (roles.includes('运营权限')) {
      //   asyncRoutesChart[0].children.push(asyncRoutesOperate);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesChart || [])
      // }
      // if (roles.includes('绩效权限')) {
      //   asyncRoutesChart[0].children.push(asyncRoutesPerformance);
      //   // accessedRoutes = accessedRoutes.concat(asyncRoutesChart || [])
      // }
      // if (roles.includes('医院权限')) {
      //   accessedRoutes = accessedRoutes.concat(asyncRoutesHospital || [])
      // }
      // if (roles.includes('用户管理权限')) {
      //   accessedRoutes = accessedRoutes.concat(asyncRoutes || [])
      // }
      // if(roles.includes('首页')){
      //   console.log('首页首页')
      //   accessedRoutes = []
      // }else{
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      // }
      // accessedRoutes = accessedRoutes.concat(asyncRoutesData || [])
      // accessedRoutes = accessedRoutes.concat(asyncRoutesChart || [])
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
