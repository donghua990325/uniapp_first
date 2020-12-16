<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">修改登录密码</block>
    </cu-custom>
    <view class="forget">
      <view class="content">
        <!-- 头部logo -->
        <view class="header">
          <image :src="logoImage"></image>
        </view>
        <!-- 主体 -->
        <view class="main">
          <!-- <view class="tips">若你忘记了密码，可在此重置新密码。</view> -->
          <wInput
            v-model="phoneData"
            type="text"
            maxlength="11"
            placeholder="请输入手机号码"
            isDisabled
          ></wInput>
          <wInput
            v-model="passData"
            type="password"
            maxlength="32"
            placeholder="请输入新密码"
            isShowPass
          ></wInput>

          <wInput
            v-model="verCode"
            type="number"
            maxlength="6"
            placeholder="验证码"
            isShowCode
            codeText="获取重置码"
            setTime="60"
            ref="runCode"
            @setCode="getVerCode()"
          ></wInput>
        </view>

        <wButton
          text="重置密码"
          :rotate="isRotate"
          @click.native="startRePass()"
        ></wButton>
      </view>
    </view>
  </view>
</template>

<script>
import { toLogin, quit } from "@/server/api.js";
import {
  securitypwdUpdateApi,
  securitypwdSendSmsApi,
  memberInfoApi,
} from "@/server/config.js";
import wInput from "@/components/watch-login/watch-input.vue"; //input
import wButton from "@/components/watch-login/watch-button.vue"; //button
export default {
  onShow() {
    toLogin();
  },
  data() {
    return {
      // logoImage: "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/logo.png",
      logoImage: "",
      phoneData: "", //电话
      passData: "", //密码
      verCode: "", //验证码
      isRotate: false, //是否加载旋转
    };
  },
  components: {
    wInput,
    wButton,
  },
  onLoad() {
    this.getMemberInfo();
  },
  methods: {
    async getMemberInfo() {
      const data = await memberInfoApi({});
      this.phoneData = data.data.info.mobile;
      this.logoImage = data.data.logo_other;
    },

    async getVerCode() {
      //获取验证码
      if (this.phoneData.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      const data = await securitypwdSendSmsApi({
        mobile: this.phoneData,
      });

      console.log("获取验证码");
      if (data.data.res === false) {
        //模拟倒计时触发
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: data.data.msg,
        });
      }
      if (data.data.res === true) {
        //模拟倒计时触发
        this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "获取短信成功",
        });
      }

      // setTimeout(function() {
      //   this.$refs.runCode.$emit("runCode", 0); //假装模拟下需要 终止倒计时
      //   // uni.showToast({
      //   //     icon: 'none',
      //   // 	position: 'bottom',
      //   //     title: '模拟倒计时终止'
      //   // });
      // }, 3000);
    },
    async startRePass() {
      //重置密码
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      if (this.passData.length < 6) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确",
        });
        return false;
      }
      if (this.verCode.length < 3) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "验证码不正确",
        });
        return false;
      }

      const data = await securitypwdUpdateApi({
        mobile: this.phoneData,
        passData: this.passData,
        verCode: this.verCode,
      });
      if (data.data.res === false) {
        uni.showToast({
          title: data.data.msg,
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (data.data.res === true) {
        uni.showToast({
          title: data.data.msg,
          icon: "none",
          duration: 1500,
        });
        // uni.clearStorageSync();
        quit();
        setTimeout(function () {
          uni.navigateTo({
            url: "/apiPam/login/main",
          });
        }, 1500);
      }

      console.log("修改密码成功");
      // this.isRotate=true
      // setTimeout(function(){
      // 	this.isRotate=false
      // },3000)
    },
  },
};
</script>
<style lang='scss' scoped>
@import url("../../components/watch-login/css/icon.css");
@import "./style";
</style>

