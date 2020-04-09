import request from '@/utils/request'


//  门诊病种列表
export function diseaseList(query) {
  return request({
    url: '/api/outpatients/disease',
    method: 'get',
    params: query
  })
}


//  门诊病种数据新增
export function diseaseAdd(data) {
  return request({
    url: '/api/outpatients/disease',
    method: 'post',
    data
  })
}

//  修改门诊病种信息
export function diseaseUpdate(disease_id, data) {
  return request({
    url: `/api/outpatients/disease/${disease_id}`,
    method: 'put',
    data
  })
}

//  删除门诊病种信息
export function diseaseDel(disease_id) {
  return request({
    url: `/api/outpatients/disease/${disease_id}`,
    method: 'DELETE',
  })
}



