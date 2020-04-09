import request from '@/utils/request'


//  最近7天门诊/住院/咨询人数
export function weekCount(query) {
  return request({
    url: '/api/report/day/patients/count',
    method: 'get',
    params: query
  })
}
//  客户年龄分布
export function ageStatics(query) {
  return request({
    url: '/api/report/patients/age/statics',
    method: 'get',
    params: query
  })
}
//  客户地区分布（地图）
export function patientsArea(query) {
  return request({
    url: '/api/report/patients/area',
    method: 'get',
    params: query
  })
}

//  门诊来源统计（渠道）
export function sourceOut(query) {
  return request({
    url: '/api/report/outpatients/source/statics',
    method: 'get',
    params: query
  })
}
