<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div class="isShow" v-if="isShow">
        <span @click="$emit('clear-all')">全部删除</span> &nbsp;&nbsp;&nbsp;
        <span @click="isShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isShow = true"></van-icon>
    </van-cell>
    <van-cell
      v-for="item,index in SearchHistory"
      :key="index"
      :title="item"
      @click="onSearchClick(item,index)"
    >
      <van-icon name="close" v-show="isShow"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ['SearchHistory'],
  data () {
    return {
      isShow: false
    }
  },
  methods: {
    onSearchClick (item, index) {
      if (this.isShow) {
        // 删除
        this.SearchHistory.splice(index, 1)
        // props中数据 可以修改 但是不能赋值
      } else {
        // 跳转
        this.$emit('search', item)
      }
    }
  }

}
</script>

<style>
</style>
