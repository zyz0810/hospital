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

//  当月各医院营收
export function hospitalTurnover() {
  return request({
    url: '/api/report/month/hospital/turnover',
    method: 'get',
  })
}

//  病种半年营收按月报表
export function diseaseTurnover(query) {
  return request({
    url: '/api/report/disease/total',
    method: 'get',
    params: query
  })
}
//  半年的来源每月收入
export function sourceTurnover(query) {
  return request({
    url: '/api/report/source/total',
    method: 'get',
    params: query
  })
}
