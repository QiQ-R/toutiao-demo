<!-- eslint-disable vue/multi-word-component-names -->
// 点赞组件

<template>
  <div>
    <van-button
      :icon="attitude ===1 ?'good-job' : 'good-job-o'"
      :class="{'liked':attitude ===1}"
      @click="likedFn"
    />
  </div>
</template>

<script>
import { likings, dislikes } from '@/api/Articles.js'
export default {
  props: ['attitude', 'articleId'],
  model: {
    prop: 'attitude',
    event: 'changeAttitude'

  },
  methods: {
    async likedFn () {
      let status = 1
      if (this.attitude === 1) {
        await dislikes(this.articleId)
        status = 0
      } else {
        await likings(this.articleId)
      }
      this.$emit('changeAttitude', status)
    }
  }

}
</script>

<style lang="less" scoped>
.van-button--normal {
  border: none !important;
  .van-button__icon {
    font-size: 40px !important;
  }
}
/deep/.liked {
  .van-icon {
    color: #ffa500 !important;
  }
}
</style>
