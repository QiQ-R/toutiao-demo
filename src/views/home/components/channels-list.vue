<template>
  <div class="channel-list">
    <van-list
      v-model="loading"
      :finished="finished"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
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
    };
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
  },
};
</script>

<style lang="less">
.channel-list {
  padding-bottom: 88px;
}
</style>