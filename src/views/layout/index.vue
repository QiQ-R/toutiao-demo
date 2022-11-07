<template>
  <div>
    <!-- 子路由 -->
    <router-view />

    <van-tabbar class="layout-container" route>
      <van-tabbar-item to="/home">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>

        <span>首页</span>
      </van-tabbar-item>

      <van-tabbar-item to="/qa">
        <template #icon>
          <i class="iconfont icon-shouye"></i>
        </template>
        <span>问答</span>
      </van-tabbar-item>

      <van-tabbar-item to="/video">
        <template #icon>
          <i class="iconfont icon-shipin"></i>
        </template>
        <span>视频</span>
      </van-tabbar-item>

      <van-tabbar-item to="/my">
        <template #icon>
          <i class="iconfont icon-wode"></i>
        </template>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.layout-container {
  i {
    font-size: 40px;
  }
  span {
    font-size: 20px;
  }
}
</style>