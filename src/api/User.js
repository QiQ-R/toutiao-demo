import request from '@/utils/request'
//    

export const loginApi = function (data) {
  return request({
    url: '/authorizations',
    method: 'POST',
    data
  })
}
export const sendAPI = function (data) {
  return request({
    url: '/sms/codes/' + data,
    method: 'GET',

  })
}
export const userInfoAPI = function () {
  return request({
    url: '/user',
    method: 'GET',
    //请求头： 在拦截器中请求
    // headers: {
    //   Authorization: `Bearer ${store.state.token.token} `
    // }

  })
}

// 获取用户 频道列表
export const userChannelAPI = function () {
  return request({
    url: '/user/channels',
    method: 'GET',


  })
}

export const AddUserChannels = (channels) => {
  return request({
    url: '/user/channels',
    method: 'PATCH',
    data: {
      channels: [channels]
    }
  })
}

