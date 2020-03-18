import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: '/api/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    // url: '/vue-element-admin/user/logout',
    url: 'api/logout',
    method: 'post'
  })
}
export function getInfo(account_id) {
  return request({
    url: `/api/account/${account_id}/permissions`,
    method: 'get'
  })
}

