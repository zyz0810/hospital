import request from '@/utils/request'


//  今日咨询数
export function todayConsults(query) {
  return request({
    url: '/api/report/today/consults/count',
    method: 'get',
    params: query
  })
}


//  今日营业额
export function todayTurnover() {
  return request({
    url: '/api/report/today/turnover',
    method: 'get'
  })
}

//  今日利润
export function todayProfit() {
  return request({
    url: '/api/report/today/profit',
    method: 'get'
  })
}

//  今日门诊数
export function todayOut() {
  return request({
    url: '/api/report/today/out-patient/count',
    method: 'get'
  })
}

//  今日各医院营业额
export function hospitalMoney() {
  return request({
    url: '/api/report/today/hospitals/turnover',
    method: 'get'
  })
}

//  今日各项目营业额
export function projectsMoney() {
  return request({
    url: '/api/report/today/projects/turnover',
    method: 'get'
  })
}
//  今日运营报表
export function outPatients() {
  return request({
    url: '/api//report//today/hospitals/out-patients',
    method: 'get'
  })
}
//  今日各医生创收
export function doctorsTurnover() {
  return request({
    url: '/api/report//today/doctors/turnover',
    method: 'get'
  })
}
