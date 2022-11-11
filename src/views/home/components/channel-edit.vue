<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="channel-item"
        v-for="value in 8"
        :key="value"
        text="文字"
        icon="clear"
      />
    </van-grid>

    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="value in 8"
        icon="plus"
        :key="value"
        text="文字"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "ChannelEdit",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.channel-edit {
  padding: 50px 0;
  .channel-item {
    height: 86px;
    /deep/ .van-icon-clear {
      font-size: 25px;
      position: absolute;
      right: 0;
      top: 0;
      color: #ccc;
    }
    /deep/ .van-grid-item__content {
      background-color: #f5f5f6;
      .van-grid-item__text {
        color: #222;
        font-size: 28px;
      }
    }
  }
  /deep/ .recommend-grid {
    .van-grid-item__content {
      flex-direction: row;
      color: #222;
      .van-icon {
        font-size: 24px;
      }

      .van-grid-item__text {
        font-size: 28px;
        margin-top: 0;
      }
    }
  }
}
</style>
