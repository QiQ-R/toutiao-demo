<template>
  <div class="channel-list">
    <van-list
      v-model="loading"
      :finished="finished"
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
    };
  },

  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const {
        data: {
          data: { results, pre_timestamp },
        },
      } = await getArticles({
        channel_id: this.channels.id,
        timestamp: Date.now(),
      });
      console.log(results, pre_timestamp);
      this.list = [...this.list, ...results];
      this.loading = false;
    },
  },
};
</script>

<style lang="less">
.channel-list {
  padding-bottom: 88px;
}
</style>