import request from '@/utils/request'


//  半年营收按月报表
export function totalTurnover(query) {
  return request({
    url: '/api/report/turnover/total',
    method: 'get',
    params: query
  })
}

//  项目半年按月营收
//  paras  project_id  项目id
export function projectTurnover(query) {
  return request({
    url: '/api/report/project/turnover',
    method: 'get',
    params: query
  })
}

//  当月营收项目分布饼图
export function projectMonth() {
  return request({
    url: '/api/report/month/project/turnover',
    method: 'get',
  })
}

//  当月营收项目分布饼图
export function projectsName() {
  return request({
    url: '/api/projects/names',
    method: 'get',
  })
}

