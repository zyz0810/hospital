import request from '@/utils/request'


//  回访列表
export function feedbackList(query) {
  return request({
    url: '/api/feedback',
    method: 'get',
    params: query
  })
}


//  新增回访数据
export function feedbackAdd(data) {
  return request({
    url: '/api/feedback',
    method: 'post',
    data
  })
}

//  修改回访数据
export function feedbackUpdate(id,data) {
  return request({
    url: `/api/feedback/${id}`,
    method: 'put',
    data
  })
}

//  删除回访数据
export function feedbackDel(id) {
  return request({
    url: `/api/feedback/${id}`,
    method: 'DELETE',
  })
}

//  回访总数
export function feedbackCount(query) {
  return request({
    url: '/api/feedback/count',
    method: 'get',
    params:query
  })
}
