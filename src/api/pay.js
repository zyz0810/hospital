import request from '@/utils/request'


//  缴费列表
export function payList(query) {
  return request({
    url: '/api/payments',
    method: 'get',
    params: query
  })
}


//  缴费数据新增
export function payAdd(data) {
  return request({
    url: '/api/payments',
    method: 'post',
    data
  })
}

//  修改缴费信息
export function payUpdate(payment_id, data) {
  return request({
    url: `/api/payments/${payment_id}`,
    method: 'put',
    data
  })
}

//  删除缴费信息
export function payDel(payment_id) {
  return request({
    url: `/api/payments/${payment_id}`,
    method: 'DELETE',
  })
}
//  缴费记录总数
export function payCount(query) {
  return request({
    url: '/api/payments/count',
    method: 'get',
    params:query
  })
}
