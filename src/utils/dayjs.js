import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')
dayjs.extend(relativeTime)


// 使用全局过滤器 过滤出 信息
Vue.filter('relativeTime', vlaue => {
  return dayjs().to(dayjs(vlaue))
})