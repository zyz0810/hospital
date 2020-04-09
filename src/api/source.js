import request from '@/utils/request'


//  门诊来源列表
export function sourceList(query) {
  return request({
    url: '/api/outpatients/sources',
    method: 'get',
    params: query
  })
}


//  门诊来源数据新增
export function sourceAdd(data) {
  return request({
    url: '/api/outpatients/sources/',
    method: 'post',
    data
  })
}

//  修改门诊来源信息
export function sourceUpdate(source_id, data) {
  return request({
    url: `/api/outpatients/sources/${source_id}`,
    method: 'put',
    data
  })
}

//  删除门诊来源信息
export function sourceDel(sources_id) {
  return request({
    url: `/api/outpatients/sources/${sources_id}`,
    method: 'DELETE',
  })
}



