import request from '@/utils/request'

export const  loginApi=function(data) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}