import request from '@/utils/request'

// 获取所有读者
export function allCategory(params) {
  return request({
    url: '/verify/admin/category/allCategory',
    method: 'get',
    params
  })
}

// 新增
export function addCategory(data) {
  return request({
    url: '/verify/admin/category/addCategory',
    method: 'post',
    data
  })
}

// 修改
export function updateCategory(data) {
  return request({
    url: '/verify/admin/category/updateCategory',
    method: 'post',
    data
  })
}

// 删除
export function delCategory(params) {
  return request({
    url: '/verify/admin/category/delCategory',
    method: 'get',
    params
  })
}
