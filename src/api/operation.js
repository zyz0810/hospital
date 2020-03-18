import request from '@/utils/request'


//  手术列表
export function operationList(query) {
  return request({
    url: '/api/surgeries',
    method: 'get',
    params: query
  })
}


//  手术数据新增
export function operationAdd(data) {
  return request({
    url: '/api/surgeries',
    method: 'post',
    data
  })
}

//  修改手术信息
export function operationUpdate(surgery_id, data) {
  return request({
    url: `/api/surgeries/${surgery_id}`,
    method: 'put',
    data
  })
}

//  删除手术信息
export function operationDel(surgery_id) {
  return request({
    url: `/api/surgeries/${surgery_id}`,
    method: 'DELETE',
  })
}
//  手术总数
export function operationCount(query) {
  return request({
    url: '/api/surgeries/count',
    method: 'get',
    params: query
  })
}
