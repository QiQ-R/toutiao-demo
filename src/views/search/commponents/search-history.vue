<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <span>全部删除</span>
      <span>完成</span>
      <van-icon name="delete"></van-icon>
    </van-cell>
    <van-cell v-for="item,index in SearchHistory" :key="index" :title="item">
      <van-icon name="close"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: ['SearchHistory']
}
</script>

<style>
</style>
