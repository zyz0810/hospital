import request from '@/utils/request'


//  门诊病种一级列表
export function diseaseList(query) {
  return request({
    url: '/api/outpatients/disease/level/first',
    method: 'get',
    params: query
  })
}


//  门诊一级病种数据新增
export function diseaseAdd(data) {
  return request({
    url: '/api/outpatients/disease/level/first',
    method: 'post',
    data
  })
}

//  修改门诊一级病种信息
export function diseaseUpdate(disease_id, data) {
  return request({
    url: `/api/outpatients/disease/level/first/${disease_id}`,
    method: 'put',
    data
  })
}

//  删除门诊一级病种信息
export function diseaseDel(disease_id) {
  return request({
    url: `/api/outpatients/disease/level/first/${disease_id}`,
    method: 'DELETE',
  })
}

//  门诊病种二级列表
export function levelDiseaseList(query) {
  return request({
    url: '/api/outpatients/disease/level/second',
    method: 'get',
    params: query
  })
}

//  门诊二级病种数据新增
export function levelDiseaseAdd(data) {
  return request({
    url: '/api/outpatients/disease/level/second',
    method: 'post',
    data
  })
}

//  修改门诊二级病种信息
export function levelDiseaseUpdate(disease_id, data) {
  return request({
    url: `/api/outpatients/disease/level/second/${disease_id}`,
    method: 'put',
    data
  })
}

//  删除门诊二级病种信息
export function levelDiseaseDel(disease_id) {
  return request({
    url: `/api/outpatients/disease/level/second/${disease_id}`,
    method: 'DELETE',
  })
}

