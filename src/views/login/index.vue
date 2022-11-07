<template>
  <div>
    <van-nav-bar title="登录" class="login" />
    <van-form class="login-container" @submit="loginSub">
      <van-field name="用户名" placeholder="请输入手机号" v-model="user.mobile">
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <van-field name="验证码" placeholder="请输入验证码" v-model="user.code">
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <template #button>
          <van-button size="small" type="primary" class="send-sms-btn" round
            >发送验证码</van-button
          >
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
import { loginApi } from "@/api/User.js";
export default {
  data() {
    return {
      user: {
        code: "",
        mobile: "",
      },
    };
  },
  methods: {
    async loginSub() {
     try{
       const res = await loginApi(this.user);
      console.log("登录成功", res);
     }catch(err){
      console.log('登录失败');
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
