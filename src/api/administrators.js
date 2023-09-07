import request from '@/utils/request'

// 获取管理员列表
export function allAdmins(params) {
  return request({
    url: '/verify/suadmin/administrators/allAdmins',
    method: 'get',
    params
  })
}

export function getUsers(params) {
  return request({
    url: '/verify/suadmin/administrators/getUsers',
    method: 'get',
    params
  })
}

// 新增
export function addAdmin(params) {
  return request({
    url: '/verify/suadmin/administrators/addAdmin',
    method: 'get',
    params
  })
}

// 修改
export function upAdmin(data) {
  return request({
    url: '/verify/suadmin/administrators/upAdmin',
    method: 'post',
    data
  })
}

// 删除
export function delAdmin(params) {
  return request({
    url: '/verify/suadmin/administrators/delAdmin',
    method: 'get',
    params
  })
}
