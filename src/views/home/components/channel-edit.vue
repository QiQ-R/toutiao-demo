<template>
  <div class="channel-edit">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in channels"
        :key="index"
        icon="clear"
      >
        <template v-slot:text class="text">
          <span :class="{ active: index === active }">
            {{ value.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>

    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" class="recommend-grid">
      <van-grid-item
        class="channel-item"
        v-for="value in recommendChannels"
        icon="plus"
        :key="value.id"
        :text="value.name"
        @click="AddChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from "@/api/channels.js";
export default {
  data() {
    return {
      allChannels: [],
    };
  },
  props: ["channels", "active"],
  created() {
    this.getAllChannelsFn();
  },
  methods: {
    async getAllChannelsFn() {
      try {
        const {
          data: {
            data: { channels },
          },
        } = await getAllChannels();
        this.allChannels = channels;
        console.log(channels);
      } catch (err) {
        console.log("获取数据错误");
      }
    },
    AddChannel(channel) {
      this.channels.push(channel);
    },
  },
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.channels.some((item2) => {
          return item2.id === item.id;
        });
      });
    },
  },
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
      .active {
        color: red;
      }
      .van-grid-item__text,
      span {
        color: #222;
        font-size: 22px;
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
        font-size: 22px;
        margin-top: 0;
      }
    }
  }
}
</style>
