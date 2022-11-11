import request from "@/utils/request";

export const getArticles = params => {
  return request({
    url: '/articles',
    method: 'GET',
    params
  })
}
