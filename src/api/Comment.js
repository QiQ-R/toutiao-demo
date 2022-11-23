import request from '@/utils/request'

// 获取评论
export const getComment = params => {
  return request({
    url: '/comments',
    method: 'GET',
    params
  })
}
