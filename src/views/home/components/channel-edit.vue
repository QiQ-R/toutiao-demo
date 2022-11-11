<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" :border="false">
      <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit = !isEdit"
      >
        {{ !isEdit ? "编辑" : "完成" }}
      </van-button>
    </van-cell>
    <!-- 我的频道内容 -->
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="channel-item"
        v-for="(value, index) in channels"
        :key="index"
        icon="clear"
      >
        <template v-slot:icon>
          <van-icon
            name="clear"
            v-show="isEdit && !fixedChannels.includes(index)"
          ></van-icon>
        </template>

        <template v-slot:text class="text">
          <span
            :class="{ active: index === active }"
            @click="changeChannel(value, index)"
          >
            {{ value.name }}
          </span>
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
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
import { mapState } from "vuex";
import { setLocal } from "@/utils/storage.js";
import { AddUserChannels } from "@/api/User.js";
export default {
  data() {
    return {
      allChannels: [],
      isEdit: false,
      fixedChannels: [0],
    };
  },
  props: ["channels", "active"],
  computed: {
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.channels.some((item2) => {
          return item2.id === item.id;
        });
      });
    },
    ...mapState(["token"]),
  },
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
    //添加频道
    async AddChannel(channel) {
      this.channels.push(channel);

      // 数据持久化
      if (this.token.token) {
        // 登录存贮在数据库
        const res = await AddUserChannels({
          id: channel.id,
          seq: this.channels.length,
        });
        console.log(res);
      } else {
        //未登录 存储在本地
        setLocal("channels", this.channels);
      }
    },
    changeChannel(channels, index) {
      if (this.isEdit) {
        // 编辑状态
        if (index <= this.active) {
          this.$emit("update-active", this.active - 1, true);
        }
        this.channels.splice(index, 1);
      } else {
        // 非编辑状态
        this.$emit("update-active", index, false); //  给父组件传值 名为 update-active 父组件使用@update-active 接收
      }
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
      .van-grid-item__icon-wrapper {
        position: unset;
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
