<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">注册</block>
    </cu-custom>
    <view class="register">
      <view class="content">
        <!-- 头部logo -->
        <view class="header">
          <image :src="logoImage"></image>
        </view>
        <!-- 主体 -->
        <view class="main">
          <wInput
            v-model="phoneData"
            type="text"
            maxlength="11"
            placeholder="手机号"
          ></wInput>
          <wInput
            v-model="passData"
            type="password"
            maxlength="32"
            placeholder="登录密码"
            isShowPass
          ></wInput>
          <wInput
            v-model="verCode"
            type="number"
            maxlength="6"
            placeholder="验证码"
            isShowCode
            ref="runCode"
            @setCode="getVerCode()"
          ></wInput>
          <wInput
            v-model="recode"
            type="text"
            maxlength="6"
            placeholder="邀请码（非必填）"
          ></wInput>
        </view>

        <wButton
          text="注 册"
          :rotate="isRotate"
          @click.native="startReg()"
        ></wButton>

        <!-- 底部信息 -->
        <!-- <view class="footer">
        <text
          @tap="isShowAgree"
          class="cuIcon"
          :class="showAgree?'cuIcon-radiobox':'cuIcon-round'"
        >同意</text> -->
        <!-- 协议地址 -->
        <!-- <navigator
        url=""
        open-type="navigate"
      >《协议》</navigator>
    </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import {
  registerSendSmsApi,
  registerPhoneApi,
  loginLogo,
} from "@/server/config.js";
import { quit } from "@/server/api.js";
import wInput from "@/components/watch-login/watch-input.vue"; //input
import wButton from "@/components/watch-login/watch-button.vue"; //button

export default {
  onShow() {},
  onLoad() {
    this.logo();
  },
  data() {
    return {
      // logoImage: 'https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/logo.png',
      logoImage: "",
      phoneData: "", // 用户/电话
      passData: "", //密码
      verCode: "", //验证码
      showAgree: true, //协议是否选择
      isRotate: false, //是否加载旋转
      tagtype: "",
      user_id: "",
      recode: "",
      parent_id: "",
    };
  },
  components: {
    wInput,
    wButton,
  },
  onLoad(options) {
    this.parent_id = options.parent_id;
  },
  mounted() {
    if (this.parent_id) {
      this.parent_id = this.parent_id;
      uni.setStorageSync("parent_id", this.parent_id);

      console.log(uni.getStorageSync("parent_id"));
    }
  },
  methods: {
    async logo() {
      const data = await loginLogo({});
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
      const data = await registerSendSmsApi({
        user_name: this.phoneData,
      });
      if (data.data.is_send === false) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: data.data.msg,
        });
        return false;
      }
      this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
      uni.showToast({
        icon: "none",
        position: "bottom",
        title: "请查收验证码",
      });

      // setTimeout(function(){
      // this.$refs.runCode.$emit('runCode',0); //假装模拟下需要 终止倒计时
      // uni.showToast({
      //     icon: 'none',
      // 	position: 'bottom',
      //     title: '结束'
      // });
      // },3000)
    },
    async startReg() {
      //注册
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.showAgree == false) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请先同意《协议》",
        });
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

      // #ifdef MP-WEIXIN
      this.tagtype = "weixin";
      // #endif
      // #ifdef MP-ALIPAY
      this.tagtype = "alipay";
      // #endif
      // #ifdef H5
      this.tagtype = "general";
      // #endif

      this.parent_id = uni.getStorageSync("parent_id");
      console.log(this.parent_id);
      console.log("==========");
      const data = await registerPhoneApi({
        user_name: this.phoneData,
        password: this.passData,
        vcode: this.verCode,
        recode: this.recode,
        tagtype: this.tagtype,
        parent_id: this.parent_id,
      });

      if (data.data.is_register == false) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: data.data.msg,
        });
        return false;
      }

      // uni.clearStorageSync();
      quit();

      this.accesstoken = data.data.sess_id;
      this.user_id = data.data.user_id;

      this.userInfo = {
        nickName: this.phoneData,
        language: "zh_CN",
        avatarUrl:
          "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png",
      };

      uni.setStorageSync("userInfo", this.userInfo);
      uni.setStorageSync("accesstoken", this.accesstoken);
      uni.setStorageSync("user_id", this.user_id);
      // #ifdef MP-WEIXIN
      uni.setStorageSync("tagtype", "weixin");
      // #endif
      // #ifdef MP-ALIPAY
      uni.setStorageSync("tagtype", "alipay");
      // #endif
      // #ifdef H5
      uni.setStorageSync("tagtype", "general");
      // #endif

      uni.switchTab({
        url: "/pages/my/main",
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import url("../../components/watch-login/css/icon.css");
@import "./style";
</style>