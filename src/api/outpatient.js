import request from '@/utils/request'


//  门诊列表
export function outpatientList(query) {
  return request({
    url: '/api/out-patients',
    method: 'get',
    params: query
  })
}


//  挂号数据新增
export function outpatientAdd(data) {
  return request({
    url: '/api/out-patients',
    method: 'post',
    data
  })
}

//  修改挂号信息
export function outpatientUpdate(id, data) {
  return request({
    url: `/api/out-patients/${id}`,
    method: 'put',
    data
  })
}

//  删除挂号信息
export function outpatientDel(id) {
  return request({
    url: `/api/out-patients/${id}`,
    method: 'DELETE',
  })
}
//  门诊纪录总数
//patient_id	否
//doctor_id	否
//hospital_id	否
//start_date	否 2020-03-02
//  end_date	是 2020-03-02

export function outpatientCount(query) {
  return request({
    url: '/api/out-patients/count',
    method: 'get',
    params: query
  })
}

