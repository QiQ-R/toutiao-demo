<template>
  <div>
    <van-nav-bar title="登录" class="login" />
    <van-form class="login-container" @submit="loginSub" ref="sendcode">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        type="number"
        :rules="formRules.mobile"
      >
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="formRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-button
            size="small"
            type="primary"
            class="send-sms-btn"
            round
            native-type="button"
            @click="sendBtn"
            v-if="!flag"
          >
            发送验证码
          </van-button>
          <van-count-down
            :time="time"
            format="ss"
            v-else
            @finish="flag = false"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi, sendAPI } from "@/api/User.js";
export default {
  data() {
    return {
      user: {
        code: "",
        mobile: "",
      },
      formRules: {
        mobile: [
          {
            required: true,
            message: "请填写手机号",
          },
          {
            pattern: /^1\d{10}$/,
            message: "请输入11位手机号",
          },
        ],
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "请输入6位验证码",
          },
        ],
      },
      time: 60000,
      flag: false,
    };
  },
  methods: {
    async loginSub() {
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const {data:{data}} = await loginApi(this.user);
        this.$toast.success({
          message: "登录成功",
          duration: 2000,
        });
        this.$store.commit('setToken',data)
      } catch (err) {
        this.$toast.fail({
          message: "登录失败",
          duration: 2000,
        });
      }
    },
    async sendBtn() {
      // 验证手机号是否正确
      try {
        await this.$refs.sendcode.validate("mobile");
        
      } catch (err) {
       return this.$toast.fail({
          message: "验证失败",
          duration: 2000,
        });
      } 
      this.flag = true; // 验证码倒计时
      //发送验证码
      try{
       await sendAPI(this.user.mobile)
      }catch(err){
        
        this.$toast.fail('获取验证码失败')
      }
    },
  },
};
</script>

<style lang="less" >
.login-container {
  .iconfont {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
    border: none;
  }
  .login-btn {
    background-color: #6db4fb;
  }
}
</style>
