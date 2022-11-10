import axios from "axios"
import store from '@/store/index.js'
const request = axios.create({
  baseURL: "http://toutiao.itheima.net/v1_0" // 基础路径
})
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const TOKEN = store.state.token.token

  if (TOKEN) {
    config.headers.Authorization = 'Bearer ' + TOKEN
  }

  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
export default request