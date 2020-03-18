import request from '@/utils/request'


//  回访人员列表
export function visitorsList(query) {
  return request({
    url: '/api/visitors',
    method: 'get',
    params: query
  })
}

//  新增回访人员信息
export function visitorsAdd(data) {
  return request({
    url: '/api/visitors',
    method: 'post',
    data
  })
}

//  修改回访人员信息
export function visitorsUpdate(id, data) {
  return request({
    url: `/api/visitors/${id}`,
    method: 'put',
    data
  })
}

//  删除回访人员信息
export function visitorsDel(id) {
  return request({
    url: `/api/visitors/${id}`,
    method: 'DELETE',
  })
}


//  回访人员名称列表
export function visitorsNameList(query) {
  return request({
    url: '/api/visitors/names',
    method: 'get',
    params: query
  })
}
