import request from '@/utils/request'

export const loginApi = function (data) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}
export const sendAPI = function (data) {
  return request({
    url: '/sms/codes/'+data,
    method: 'GET',
    
  })
}