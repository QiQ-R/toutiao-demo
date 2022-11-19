import request from '@/utils/request'

// 获取全部频道的接口
export const getSuggestion = (params) => {
  return request({
    url: '/suggestion',
    method: 'GET',
    params
  })
}

export const getSearch = (params) => {
  return request({
    url: '/search',
    method: 'GET',
    params
  })
}
