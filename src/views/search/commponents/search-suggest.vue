<template>
  <div class="search-suggest">
    <div v-if="suggestList[0]">
      <van-cell
        icon="search"
        v-for="(item, index) in suggestList"
        :key="index"
        @click="$emit('search',item)"
      >
        <template #title>
          <span v-html="highlight (item)">{{ item }}</span>
        </template>
      </van-cell>
    </div>

    <div class="p" v-else>暂无数据</div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/Search.js'
import { debounce } from 'lodash'// 设置防抖  引入lodash中的debounce

export default {
  props: ['searchText'],
  data () {
    return {
      suggestList: []
    }
  },

  watch: {
    searchText: {
      deep: true,
      immediate: true,
      handler: debounce(function (newValue) {
        console.log(newValue)
        this.getSuggestionFn(newValue)
      }, 1000)
    }
  },
  methods: {
    async getSuggestionFn (newValue) {
      const {
        data: {
          data: { options }
        }
      } = await getSuggestion({
        q: newValue
      })
      this.suggestList = options
      // console.log(options)
    },
    highlight (text) {
      // 1、查找所有符合的元素 g global 全部查找
      const reg = new RegExp(this.searchText, 'ig')
      // 2、把符合的字符串替换
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const str = text.replace(reg, highlightStr)
      return str
    }

  }
}
</script>

<style lang="less">
.search-suggest {
  .p {
    font-size: 30px;
    text-align: center;
    color: #ccc;
  }
}
.active {
  color: red;
}
</style>
