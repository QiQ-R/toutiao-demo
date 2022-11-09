<template>
  <div class="home-container">
    <!-- 导航条 -->
    <van-nav-bar title="标题">
      <template #title>
        <van-button
          class="search-btn"
          type="info"
          size="small"
          round
          icon="search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!--  -->
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
}
</style>