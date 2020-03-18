import request from '@/utils/request'


//  缴费列表
export function hospitalizationList(query) {
  return request({
    url: '/api/in-hospitals',
    method: 'get',
    params: query
  })
}


//  缴费数据新增
export function hospitalizationAdd(data) {
  return request({
    url: '/api/in-hospitals',
    method: 'post',
    data
  })
}

//  修改缴费信息
export function hospitalizationUpdate(in_hospital_id, data) {
  return request({
    url: `/api/in-hospitals/${in_hospital_id}`,
    method: 'put',
    data
  })
}

//  删除缴费信息
export function hospitalizationDel(in_hospital_id) {
  return request({
    url: `/api/in-hospitals/${in_hospital_id}`,
    method: 'DELETE',
  })
}
//  住院记录总数
export function hospitalizationCount(query) {
  return request({
    url: '/api/in-hospitals/count',
    method: 'get',
    params:query
  })
}
