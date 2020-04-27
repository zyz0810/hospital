import request from '@/utils/request'


//  病人列表
export function patientList(query) {
  return request({
    url: '/api/patients',
    method: 'get',
    params: query
  })
}

//  新增病人信息
export function patientAdd(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/api/patients',
    method: 'post',
    data
  })
}

//  修改病人信息
export function patientUpdate(id, data) {
  return request({
    url: `/api/patients/${id}`,
    method: 'put',
    data
  })
}

//  删除病人信息
export function patientDel(id) {
  return request({
    url: `/api/patients/${id}`,
    method: 'DELETE',
  })
}

//  病人姓名搜素
//  prefix  前缀姓名
export function patientName(data) {
  return request({
    url: '/api/patients/names',
    method: 'post',
    data
  })
}
//  病人姓名搜素
//  prefix 前缀姓名
export function nameSearch(query) {
  return request({
    url: '/api/patients/names',
    method: 'get',
    params: query
  })
}

//  病人总数
export function patientCount(query) {
  return request({
    url: '/api/patients/count',
    method: 'get',
    params:query
  })
}

//  病人详情
export function patientView(patient_id) {
  return request({
    url: `/api/patients/${patient_id}`,
    method: 'get',
  })
}

//  病人门诊列表
export function patientOutList(patient_id) {
  return request({
    url: `/api/patients/${patient_id}/out-patients`,
    method: 'get',
  })
}

//  病人缴费列表
export function patientPayList(patient_id) {
  return request({
    url: `/api/patients/${patient_id}/payments`,
    method: 'get',
  })
}

//  病人住院列表
export function patientHospitalizationList(patient_id) {
  return request({
    url: `/api/patients/${patient_id}/in-hospitals`,
    method: 'get',
  })
}

//  病人手术列表
export function patientOperationList(patient_id) {
  return request({
    url: `/api//patients/${patient_id}/surgeries`,
    method: 'get',
  })
}

//  病人咨询列表
export function patientConsultsList(patient_id) {
  return request({
    url: `/api/patients/${patient_id}/consults`,
    method: 'get',
  })
}

//  病人回访记录列表
export function patientReturnList(patient_id) {
  return request({
    url: `/api/patients/${patient_id}/feedback`,
    method: 'get',
  })
}

//  病人重名信息
export function patientsName(query) {
  return request({
    url: '/api/patients/names/query',
    method: 'get',
    params:query
  })
}
