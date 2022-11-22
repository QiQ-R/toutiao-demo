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
