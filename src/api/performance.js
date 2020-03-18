import request from '@/utils/request'


//  当月各医生营收报表
export function doctorsTurnover(query) {
  return request({
    url: '/api/report/month/doctors/turnover',
    method: 'get',
    params: query
  })
}


