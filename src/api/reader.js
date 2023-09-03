import request from '@/utils/request'

// 获取所有读者
export function allReader(params) {
  return request({
    url: '/verify/admin/reader/allReader',
    method: 'get',
    params
  })
}

// 新增
export function addReader(data) {
  return request({
    url: '/verify/admin/reader/addReader',
    method: 'post',
    data
  })
}

// 修改
export function upReader(data) {
  return request({
    url: '/verify/admin/reader/upReader',
    method: 'post',
    data
  })
}

// 删除
export function delReader(params) {
  return request({
    url: '/verify/admin/reader/delReader',
    method: 'get',
    params
  })
}
