import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/ordinary/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/ordinary/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/verify/logout',
    method: 'get'
  })
}
