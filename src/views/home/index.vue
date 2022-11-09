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

    <!-- 频道列表 -->
    <van-tabs animated swipeable v-model="active" class="channel-tabs">
      <van-tab :title="index.name" v-for="index in channels" :key="index.id">
        <channel-list :channels="index" />
      </van-tab>
      <div class="placeholder" slot="nav-right"></div>
      <div class="gengduo" slot="nav-right">
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { userChannelAPI } from "@/api/User.js";
import channelList from "./components/channels-list.vue";
export default {
  data() {
    return {
      active: 0,
      channels: [],
    };
  },
  created() {
    this.userChannelFn();
  },
  methods: {
    async userChannelFn() {
      const {
        data: { data },
      } = await userChannelAPI();
      console.log(data.channels);
      this.channels = data.channels;
    },
  },
  components: {
    channelList,
  },
};
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
  /deep/ .channel-tabs {
    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      height: 80px;
      .van-tab__text {
        font-size: 27px;
        color: #777777;
      }
    }
    .van-tabs__wrap {
      border-bottom: 1px solid #edeff3;
    }
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }

    .gengduo {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.iconfont {
        font-size: 33px;
      }
    }
    .placeholder {
      flex-shrink: 0; // 不参与flex伸缩比
      width: 66px;
    }
  }
}
</style>