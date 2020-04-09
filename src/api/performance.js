import request from '@/utils/request'

//  当月咨询师绩效
export function consultantTurnover(query) {
  return request({
    url: '/api/report/consultant/month/statics',
    method: 'get',
    params: query
  })
}

//  当月各医生营收报表
export function doctorsTurnover(query) {
  return request({
    url: '/api/report/month/doctors/turnover',
    method: 'get',
    params: query
  })
}

//  当月医生接诊数/转化率
export function doctorsPayment(query) {
  return request({
    url: '/api/report/month/doctors/outpatients/payment/statics',
    method: 'get',
    params: query
  })
}


