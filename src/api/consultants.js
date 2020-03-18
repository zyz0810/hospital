import request from '@/utils/request'


//  咨询师列表
export function consultantsList(query) {
  return request({
    url: '/api/consultants',
    method: 'get',
    params: query
  })
}

//  新增咨询师信息
export function consultantsAdd(data) {
  return request({
    url: '/api/consultants',
    method: 'post',
    data
  })
}

//  修改咨询师信息
export function consultantsUpdate(id, data) {
  return request({
    url: `/api/consultants/${id}`,
    method: 'put',
    data
  })
}

//  删除咨询师信息
export function consultantsDel(id) {
  return request({
    url: `/api/consultants/${id}`,
    method: 'DELETE',
  })
}

//  咨询师名称列表
export function consultantsNameList() {
  return request({
    url: '/api/consultants/names',
    method: 'get',
  })
}

