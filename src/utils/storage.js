// 添加本地存储
export const setLocal = function (key,value) {
  if (typeof value === 'Object') {
    value = JSON.stringify(key)
  }
  localStorage.setItem(key,value)
}

// 获取
export const getLocal = function (key) {
  
  return JSON.parse(localStorage.getItem(key) || '')
}
// 删除数据 
export const delLocal = function (key) {
  
  return localStorage.removeItem(key) 
}