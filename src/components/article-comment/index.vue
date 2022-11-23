<!-- eslint-disable vue/multi-word-component-names -->

// 文章评论

<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <commentItem :list="list"></commentItem>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComment } from '@/api/Comment.js'
import commentItem from './commit-item/index.vue'
export default {
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false,
      offset: '' // 是否加载结束
    }
  },
  components: {
    commentItem
  },
  props: ['articleId'],
  methods: {
    async onLoad () {
      try {
        const params = {
          type: 'a',
          source: this.articleId,
          offset: this.offset,
          limit: 10
        }
        const { data: { data: { last_id: lastId, results, total_count: totalCount } } } = await getComment(params)
        this.list = [...this.list, ...results]
        this.offset = lastId
        this.loading = false
        this.$emit('changeTotalCount', totalCount)
        if (this.list >= totalCount) {
          this.finished = true
        }
      } catch (err) {

      }
    }
  }

}
</script>

<style>
</style>
