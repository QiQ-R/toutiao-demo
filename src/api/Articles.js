import request from '@/utils/request'

export const getArticles = params => {
  return request({
    url: '/articles',
    method: 'GET',
    params
  })
}

export const getArticlesById = articleId => {
  return request({
    url: '/articles/' + articleId,
    method: 'GET'
  })
}
// 收藏文章 article/collections
export const collections = target => {
  return request({
    url: '/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
// 取消收藏文章
export const delcollections = target => {
  return request({
    url: '/article/collections/' + target,
    method: 'DELETE'
  })
}

// article/likings 给文章点赞

export const likings = target => {
  return request({
    url: '/article/likings',
    method: 'POST',

    data: {
      target
    }

  })
}
// 取消点赞 article/dislikes/:target
export const dislikes = target => {
  return request({
    url: '/article/likings/' + target,
    method: 'DELETE'
  })
}
