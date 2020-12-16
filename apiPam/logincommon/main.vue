<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">登录</block>
    </cu-custom>
    <view class="login">
      <view class="content">
        <!-- 头部logo -->
        <view class="header"><image :src="logoImage"></image></view>
        <!-- 账号密码主体表单 1-->
        <view class="main" :class="typeaClass">
          <wInput
            v-model="phoneData"
            type="text"
            maxlength="11"
            placeholder="用户名/手机号"
          ></wInput>
          <wInput
            v-model="passData"
            type="password"
            maxlength="32"
            placeholder="密码"
          ></wInput>
        </view>

        <!-- 手机号登录主体 2-->
        <view class="main" :class="typebClass">
          <wInput
            v-model="phoneData"
            type="text"
            maxlength="11"
            placeholder="手机号"
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
        </view>

        <wButton
          text="登 录"
          :class="typeaClass"
          :rotate="isRotate"
          @click.native="startLoginAccount()"
        ></wButton>
        <wButton
          text="登 录"
          :class="typebClass"
          :rotate="isRotate"
          @click.native="startLoginPhone()"
        ></wButton>

        <div class="valid">
          <div :class="typeaClass" @tap="switchType('showa')">
            验证码快捷登录
          </div>
          <div :class="typebClass" @tap="switchType('showb')">密码登录</div>
        </div>
        <!-- 其他登录 -->
        <!--  #ifdef APP-PLUS -->
        <view class="other_login cuIcon">
          <view class="login_icon"
            ><view class="cuIcon-weixin" @tap="login_weixin"></view
          ></view>
        </view>
        <!--  #endif -->
        <!--  #ifdef H5 -->
        <view class="other_login cuIcon">
          <view class="login_icon"
            ><view class="cuIcon-weixin" @tap="login_weixin_H5"></view
          ></view>
        </view>
        <!--  #endif -->

        <!-- 底部信息 -->
        <view class="footer">
          <navigator url="/apiPam/forget/main" open-type="navigate"
            >找回密码</navigator
          >
          <text>|</text>
          <navigator url="/apiPam/register/main" open-type="navigate"
            >注册账号</navigator
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  logincommonAccountApi,
  logincommonPhoneApi,
  logincommonSendSmsApi,
  checkWechatRegApi,
  loginLogo,
  getWxAuthApi,
  getWXUserInfoApi,
  loginWechatApi,
  wechatAppLogin,
} from "@/server/config.js";
import { quit, getStorageUserInfo } from "@/server/api.js";
import wInput from "@/components/watch-login/watch-input.vue"; //input
import wButton from "@/components/watch-login/watch-button.vue"; //button

export default {
  onLoad(options) {
    this.logo();
    this.code = options.code;
    // this.code = "0812k87719EI7O1ZsD471TYb7712k87x";
    if (this.code) {
      uni.setStorageSync("code", this.code);
      this.getuserinfo();
    }
  },
  data() {
    return {
      isWeixin: false,
      // logoImage:"https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/logo.png",
      logoImage: "",
      phoneData: "", //用户/电话
      passData: "", //密码
      isRotate: false, //是否加载旋转
      userInfo: [],
      accesstoken: "",
      verCode: "",
      typeaClass: "",
      typebClass: "hide",
      code: "", //微信回调的code
      nickname: "",
    };
  },
  components: {
    wInput,
    wButton,
  },
  mounted() {
    let ua = navigator.userAgent.toLowerCase();
    //如果是微信浏览器就显示微信登楼
    if (ua.search(/MicroMessenger/i) > -1) {
      this.isWeixin = true;
    }
    this.isWeixin = true;
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
      const data = await logincommonSendSmsApi({
        mobile: this.phoneData,
      });
      if (data.data.is_login === false) {
        //模拟倒计时触发
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "该手机号不存在",
        });
        return false;
      }
      if (data.data.is_login === true) {
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
      //   uni.showToast({
      //     icon: "none",
      //     position: "bottom",
      //     title: "模拟倒计时终止"
      //   });
      // }, 3000);
    },
    switchType(type) {
      if (type === "showa") {
        this.typeaClass = "hide";
        this.typebClass = "";
      }
      if (type === "showb") {
        this.typebClass = "hide";
        this.typeaClass = "";
      }

      console.log(type);
    },
    async startLoginAccount() {
      //登录
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData.length == "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "用户名不能为空",
        });
        return;
      }
      if (this.passData.length < 5) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "密码不正确",
        });
        return;
      }

      const data = await logincommonAccountApi({
        username: this.phoneData,
        password: this.passData,
      });
      if (data.data.is_login === false) {
        uni.showToast({
          title: "用户名/密码错误", //提示的内容,
          duration: 3000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
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
      console.log("登录成功");

      uni.switchTab({
        url: "/pages/my/main",
      });
      // this.isRotate=true
      // setTimeout(function(){
      // 	this.isRotate=false
      // },3000)
    },
    async startLoginPhone() {
      //登录
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
      if (this.verCode.length < 3) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "验证码不正确",
        });
        return false;
      }
      const data = await logincommonPhoneApi({
        mobile: this.phoneData,
        verCode: this.verCode,
      });
      if (data.data.is_login == false) {
        uni.showToast({
          icon: "none",
          title: "验证码错误",
        });
        return;
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

      console.log("登录成功");
      uni.switchTab({
        url: "/pages/my/main",
      });
      // this.isRotate=true
      // setTimeout(function(){
      // 	this.isRotate=false
      // },3000)
    },
    // 获取微信用户信息
    async login_weixin() {
      let authResult = {};
      let _this = this;
      uni.login({
        provider: "weixin",
        success: async function (loginRes) {
          authResult = loginRes.authResult;
          _this.wechatAppLogin(authResult);
        },
      });
    },
    // 微信APP登录
    async wechatAppLogin(authResult) {
      const res = await wechatAppLogin({
        openid: authResult.openid,
        unionid: authResult.unionid,
        access_token: authResult.access_token,
      });

      uni.setStorageSync("userInfo", {
        nickName: res.data.nickname,
        language: "zh_CN",
        avatarUrl: res.data.avatar_url,
      });

      uni.setStorageSync("accesstoken", res.data.sess_id);
      uni.setStorageSync("user_id", res.data.user_id);
      uni.setStorageSync("openid", res.data.openid);

      uni.switchTab({
        url: "/pages/my/main",
      });
    },
    login_global() {
      //H5-APP支付宝登录开始
    },
    async login_weixin_H5() {
      const data = await getWxAuthApi({});
      window.location.href = data.data.url;
    },
    async getuserinfo() {
      const information = await getWXUserInfoApi({
        code: this.code,
      });

      // console.log(information)
      // console.log('111111111')
      // console.log(information.data.nickname)
      quit();

      uni.setStorageSync("userInfo", {
        nickName: information.data.nickname,
        language: "zh_CN",
        avatarUrl: information.data.avatar_url,
      });

      uni.setStorageSync("accesstoken", information.data.sess_id);
      uni.setStorageSync("user_id", information.data.user_id);
      uni.setStorageSync("openid", information.data.openid);

      // #ifdef H5
      uni.setStorageSync("tagtype", "general");
      // #endif

      console.log("登录成功123");
      uni.switchTab({
        url: "/pages/my/main",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../components/watch-login/css/icon.css");
@import "./style";
</style>
