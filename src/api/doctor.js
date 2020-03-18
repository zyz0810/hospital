import request from '@/utils/request'


//  医生列表
export function doctorList(query) {
  return request({
    url: '/api/doctors',
    method: 'get',
    params: query
  })
}


//  医生数据新增
export function doctorAdd(data) {
  return request({
    url: '/api/doctors/',
    method: 'post',
    data
  })
}

//  修改医生信息
export function doctorUpdate(doctor_id, data) {
  return request({
    url: `/api/doctors/${doctor_id}`,
    method: 'put',
    data
  })
}

//  删除医生信息
export function doctorDel(doctor_id) {
  return request({
    url: `/api/doctors/${doctor_id}`,
    method: 'DELETE',
  })
}


//  医生收入列表
export function doctorIncomeList(query) {
  return request({
    url: '/api/doctors/turnover',
    method: 'get',
    params: query
  })
}


//  医生收入数据新增
export function doctorIncomeAdd(data) {
  return request({
    url: '/api/doctors/turnover',
    method: 'post',
    data
  })
}

//  修改医生收入信息
export function doctorIncomeUpdate(doctor_id, data) {
  return request({
    url: `/api/doctors/turnover/${doctor_id}`,
    method: 'put',
    data
  })
}

//  删除医生收入信息
export function doctorIncomeDel(doctor_id) {
  return request({
    url: `/api/doctors/turnover/${doctor_id}`,
    method: 'DELETE',
  })
}

