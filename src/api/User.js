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
    method: 'GET'

  })
}
export const userInfoAPI = function () {
  return request({
    url: '/user',
    method: 'GET'
    // 请求头： 在拦截器中请求
    // headers: {
    //   Authorization: `Bearer ${store.state.token.token} `
    // }

  })
}

// 获取用户 频道列表
export const userChannelAPI = function () {
  return request({
    url: '/user/channels',
    method: 'GET'

  })
}
// 添加用户频道列表
export const AddUserChannels = (channels) => {
  return request({
    url: '/user/channels',
    method: 'PATCH',
    data: {
      channels: [channels]
    }
  })
}
// 删除用户频道列表

export const delUserChannels = (target) => {
  return request({
    url: '/user/channels/' + target,
    method: 'DELETE'
  })
}

// 用户关注
export const userFollow = (target) => {
  return request({
    url: '/user/followings',
    method: 'POST',
    data: {
      target
    }

  })
}
// 用户取消关注
export const userDelFollow = (target) => {
  return request({
    url: '/user/followings/' + target,
    method: 'DELETE'
  })
}
