import request from '@/utils/request'
import store from '@/store'

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
export const userInfoAPI = function () {
  return request({
    url: '/user',
    method: 'GET',
    //请求头：
    headers: {
      Authorization: `Bearer ${store.state.token.token} `
    }
    
  })
}