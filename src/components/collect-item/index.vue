<!-- eslint-disable vue/multi-word-component-names  -->
// 收藏组件

<template>
  <div>
    <van-button
      :class="{'collected':isCollected}"
      :icon=" isCollected ? 'star':  'star-o'"
      @click="collectedFn"
    />
  </div>
</template>

<script>
import { delcollections, collections } from '@/api/Articles.js'
export default {
  data () {
    return {
      loading: false
    }
  },
  props: ['isCollected', 'articleId'],
  model: {
    prop: 'isCollected',
    event: 'changeIsCollected'
  },
  methods: {
    async collectedFn () {
      try {
        if (this.isCollected) {
          // 取消收藏
          await delcollections(this.articleId)
        } else {
          // 收藏
          await collections(this.articleId)
        }
        this.$emit('changeIsCollected', !this.isCollected)
      } catch (err) {

      }
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
/deep/.collected {
  .van-icon {
    color: #ffa500 !important;
  }
}
</style>
