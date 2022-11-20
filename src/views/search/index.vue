<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 搜索栏 -->
    <form action="/" class="search-con">
      <van-search
        v-model="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @blur="blur"
        background="#3296fa"
      />
    </form>

    <div class="botton">
      <!-- 搜索结果 -->
      <search-result v-if="isResult" :searchTest="value" class="result"></search-result>
      <!-- 联想建议 -->
      <search-suggest v-else-if="value" :searchText="value" @search="onSearch"></search-suggest>
      <!-- 搜索历史 -->
      <search-history v-else :SearchHistory="SearchHistory"></search-history>
    </div>
  </div>
</template>

<script>
import SearchSuggest from './commponents/search-suggest.vue'
import SearchHistory from './commponents/search-history.vue'
import SearchResult from './commponents/search-result.vue'
export default {
  data () {
    return {
      name: 'search',
      value: '',
      isResult: false,
      SearchHistory: []
    }
  },
  components: {
    SearchSuggest,
    SearchHistory,
    SearchResult
  },
  methods: {
    onSearch (val) {
      this.value = val
      const index = this.SearchHistory.indexOf(val)
      if (index !== -1) {
        this.SearchHistory.splice(index, -1)
      }
      this.SearchHistory.unshift(val)

      console.log(this.SearchHistory)

      this.isResult = true
    },
    onCancel () {
      this.isResult = false

      this.$router.go(-1)
    },
    blur () {
      this.isResult = false
    }

  }
}
</script>

<style lang="less">
.search-con {
  position: fixed;
  background: rgb(50, 150, 250);
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  .van-search__action {
    color: #fff !important;
  }
}
.botton {
  margin-top: 110px;
}
</style>
