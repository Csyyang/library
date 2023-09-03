import request from '@/utils/request'

// 获取借阅记录
export function allBorrowing(params) {
  return request({
    url: '/verify/admin/borrowing/allBorrowing',
    method: 'get',
    params
  })
}

// 新增
export function addBorrowing(data) {
  return request({
    url: '/verify/admin/borrowing/addBorrowing',
    method: 'post',
    data
  })
}

// 修改
export function upBorrowing(data) {
  return request({
    url: '/verify/admin/borrowing/upBorrowing',
    method: 'post',
    data
  })
}

// 删除
export function delBorrowing(params) {
  return request({
    url: '/verify/admin/borrowing/delBorrowing',
    method: 'get',
    params
  })
}
