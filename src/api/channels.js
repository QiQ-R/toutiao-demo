import request from '@/utils/request'

// 获取全部频道的接口
export const getAllChannels = () => {
  return request({
    url: '/channels',
    method: 'GET'
  })
}
