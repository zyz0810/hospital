import request from '@/utils/request'


//  咨询列表
export function consultsList(query) {
  return request({
    url: '/api/consults',
    method: 'get',
    params: query
  })
}

//  新增咨询信息
export function consultsAdd(data) {
  return request({
    url: '/api/consults',
    method: 'post',
    data
  })
}

//  修改咨询信息
export function consultsUpdate(id, data) {
  return request({
    url: `/api/consults/${id}`,
    method: 'put',
    data
  })
}

//  删除咨询信息
export function consultsDel(id) {
  return request({
    url: `/api/consults/${id}`,
    method: 'DELETE',
  })
}

//  咨询总数
export function consultsCount(query) {
  return request({
    url: '/api/consults/count',
    method: 'get',
    params:query
  })
}
