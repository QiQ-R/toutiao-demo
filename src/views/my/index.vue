<template>
  <div class="my-container">
    <!-- 未登录 -->
    <div class="not-login" v-if="!token.token">
      <div class="header">
        <img
          class="mobile-img"
          src="~@/assets/mobile.png"
          @click="$router.push('/login')"
        />
      </div>
      <div class="grid-nav"></div>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>

    <!-- 已登录 -->
    <div class="login" v-else>
      <div class="userInfo header">
        <!-- 基本信息 -->
        <div class="base">
          <div class="left">
            <van-image fit="cover" :src="userInfo.photo" class="avatar" round />
            <span class="name">{{ userInfo.name }}</span>
          </div>
          <div class="right">
            <van-button type="default" size="mini" round>编辑资料</van-button>
          </div>
        </div>
        <!-- 粉丝、关注 -->
        <div class="data">
          <div class="data-item">
            <span>{{ userInfo.art_count }}</span>
            <span>头条</span>
          </div>
          <div class="data-item">
            <span>{{ userInfo.follow_count }}</span>
            <span>关注</span>
          </div>
          <div class="data-item">
            <span>{{ userInfo.fans_count }}</span>
            <span>粉丝</span>
          </div>
          <div class="data-item">
            <span>{{ userInfo.like_count }}</span>
            <span>获赞</span>
          </div>
        </div>
      </div>

      <van-grid :column-num="2">
        <van-grid-item text="收藏">
          <template #icon>
            <i class="iconfont icon-shoucang"></i>
          </template>
        </van-grid-item>

        <van-grid-item text="历史">
          <template #icon>
            <i class="iconfont icon-lishi"></i>
          </template>
        </van-grid-item>
      </van-grid>

      <van-cell title="消息通知" is-link url="" />
      <van-cell title="实名认证" is-link url="" />
      <van-cell title="用户反馈" is-link url="" />
      <van-cell title="小智同学" is-link url="" />
      <van-cell title="系统设置" is-link url="" />
      <van-cell @click="onLogout" class="logout-cell" title="退出登录" center />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { userInfoAPI } from "@/api/User.js";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  computed: {
    ...mapState(["token"]),
  },
  created() {
    this.userInfoFn();
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "退出",
          message: "确认退出吗",
        })
        .then(() => {
          this.$store.commit("setToken", {});
        })
        .catch(() => {
          this.$toast("取消成功");
        });
    },
    async userInfoFn() {
      try {
        const {
          data: { data },
        } = await userInfoAPI();
        console.log(data);
        this.userInfo = data;
      } catch (err) {
        $this.$toast('获取失败')
      }
    },
  },
};
</script>

<style lang="less">
.my-container {
  margin-bottom: 120px;
  .not-login {
    .header {
      height: 361px;
      background: url("~@/assets/banner.png") no-repeat;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
    }
  }

  .login {
    .header {
      width: 750px;
      height: 401px;
      background: url("~@/assets/banner.png");
      background-size: cover;
    }
    .userInfo {
      .base {
        height: 231px;
        padding: 76px 32px 23px;

        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        .left {
          display: flex;
          align-items: center;
          .avatar {
            width: 132px;
            height: 132px;
            border: 2px solid #fff;
          }
          .name {
            font-size: 29px;
            margin-left: 22px;
          }
        }
      }
      .data {
        display: flex;
        justify-content: space-around;
        .data-item {
          height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #fff;
          span:nth-child(1) {
            font-size: 36px;
            margin-bottom: 15px;
          }
          span:nth-child(2) {
            font-size: 23px;
          }
        }
      }
    }
    .iconfont {
      font-size: 45px;
      color: #eb5253;
    }
    .logout-cell {
      text-align: center;
    }
  }
}
</style>