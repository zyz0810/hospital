import request from '@/utils/request'


//  最近7天门诊/住院/咨询人数
export function weekCount(query) {
  return request({
    url: '/api/report/day/patients/count',
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


