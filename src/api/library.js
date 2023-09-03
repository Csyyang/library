import request from '@/utils/request'

// 获取所有图书
export function getList(params) {
  return request({
    url: '/verify/admin/book/allBook',
    method: 'get',
    params
  })
}

// 新增
export function addBook(data) {
  return request({
    url: '/verify/admin/book/addBook',
    method: 'post',
    data
  })
}

// 修改
export function updateBook(data) {
  return request({
    url: '/verify/admin/book/updateBook',
    method: 'post',
    data
  })
}

// 删除
export function delBook(params) {
  return request({
    url: '/verify/admin/book/delBook',
    method: 'get',
    params
  })
}
