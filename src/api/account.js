import request from '@/utils/request'


//  权限列表
export function permisionsList(query) {
  return request({
    url: '/api/permissions',
    method: 'get',
    params: query
  })
}
//  用户列表
export function accountsList(query) {
  return request({
    url: '/api/accounts',
    method: 'get',
    params: query
  })
}

//  用户权限列表
export function accountsPermissions(account_id) {
  return request({
    url: `/api/account/${account_id}/permissions`,
    method: 'get',
  })
}

//  新增用户权限
export function accountAdd(data) {
  return request({
    url: `/api/accounts`,
    method: 'post',
    data
  })
}

//  修改用户权限
export function accountUpdate(account_id, data) {
  return request({
    url: `/api/accounts/${account_id}`,
    method: 'put',
    data
  })
}

//  删除用户信息
export function accountDel(account_id) {
  return request({
    url: `/api/accounts/${account_id}`,
    method: 'DELETE',
  })
}


