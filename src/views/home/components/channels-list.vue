<template>
  <div class="channel-list">
    <van-pull-refresh
      v-model="refreshingLoading"
      @refresh="onRefresh"
      :success-text="successText"
      success-duration="1500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <channel-item v-for="item in list" :key="item.id" :article="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import channelItem from "@/components/channels-item/index.vue";
import { getArticles } from "@/api/channels.js";
export default {
  name: "test-item",
  props: ["channels"],
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: "",
      error: false,
      refreshingLoading: false, // 下拉刷新的状态
      successText: "刷新成功",
    };
  },
  components: {
    channelItem,
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      try {
        const {
          data: {
            data: { results, pre_timestamp },
          },
        } = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now(),
        });
        this.list = [...this.list, ...results];

        this.loading = false;
        if (results.length) {
          this.timestamp = pre_timestamp;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log("请求失败", err);

        this.loading = false;
        this.error = true;
      }
    },
    // 下拉刷新
    async onRefresh() {
      try {
        const {
          data: {
            data: { results },
          },
        } = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now(),
        });
        this.list = [...this.list, ...results];
        this.refreshingLoading = false;
        this.successText = `刷新成功，请求了 ${results.length}条数据`;
      } catch (err) {
        this.successText = "刷新失败";
      }
    },
  },
};
</script>

<style lang="less">
.channel-list {
  padding-top: 180px;
  padding-bottom: 88px;
  height: 79vh;
  overflow-y: auto;
}
</style>