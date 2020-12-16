<template>
  <view>
    <cu-custom bgColor="bg-white" :isBackHome="true">
      <block slot="backHome">返回</block>
      <block slot="content">登录</block>
    </cu-custom>
    <div class="login">
      <view class="header">
        <image :src="logoImage"></image>
      </view>
	  <!-- <div>{{parent_id}}</div> -->
      <!--  #ifdef  MP-WEIXIN  -->
      <button
        class="login-btn"
        open-type="getUserInfo"
        lang="zh_CN"
        @getuserinfo="doLogin"
      >
        微信登录
      </button>
      <!--  #endif -->
      <!--  #ifdef  MP-ALIPAY -->
      <button
        lang="zh_CN"
        class="login-btn"
        open-type="getAuthorize"
        onGetAuthorize="onGetAuthorize"
        @click="onGetAuthorize"
        onError="onAuthError"
        scope="userInfo"
      >
        支付宝登录
      </button>
      <!--  #endif -->

      <button class="login-btn number" @click="phoneLogin">账号登录</button>
    </div>
  </view>
</template>

<script>
import { loginWechatApi, loginAlipayApi, loginLogo } from "@/server/config.js";
import { getStorageUserInfo, quit } from "@/server/api.js";

export default {
  onShow() {
    //获取用户信息
    this.userInfo = getStorageUserInfo();
  },
  created() {},
  onLoad(options) {
	  this.parent_id = options.parent_id;
    this.logo();
  },
  mounted() {
    if (this.parent_id) {
      this.parent_id = this.parent_id;
      uni.setStorageSync("parent_id", this.parent_id);
  
      console.log(uni.getStorageSync("parent_id"));
    }
  },
  data() {
    return {
      openId: "",
      userInfo: [],
      code: "",
      accesstoken: "",
      user_id: "",
      logoImage: "",
      unionid: "",
	  parent_id: "",
    };
  },
  components: {},
  methods: {
    async logo() {
      const data = await loginLogo({});
      this.logoImage = data.data.logo_other;
    },
    phoneLogin() {
      uni.navigateTo({
        url: "/apiPam/logincommon/main",
      });
    },
    async onGetAuthorize(res) {
      //支付宝登录开始
      uni.getOpenUserInfo({
        fail: (res) => {},
        success: (res) => {
          let userInfo = JSON.parse(res.response).response; // 以下方的报文格式解析两层 response
          console.log(userInfo);
          this.userInfo = userInfo;
          this.userInfo.language = "zh_CN";
          this.userInfo.country = userInfo.countryCode;
          this.userInfo.avatarUrl = userInfo.avatar;
          uni.setStorageSync("userInfo", this.userInfo);

          uni.showLoading({
            title: "登录中...", //提示的内容,
            //支付宝小程序 showLoading暂不支持mask
            // mask: true, //显示透明蒙层，防止触摸穿透,
            success: (res) => {},
          });
          //支付宝登录code授权
          uni.getAuthCode({
            scopes: "auth_user", // 主动授权：auth_user，静默授权：auth_base。或者其它scope
            success: async (res) => {
              if (res.authCode) {
                // 认证成功
                // 调用自己的服务端接口，让服务端进行后端的授权认证，并且种session，需要解决跨域问题
                const data = await loginAlipayApi({
                  code: res.authCode,
                  nickname: this.userInfo.nickName,
                  gender: this.userInfo.gender,
                  avatarUrl: this.userInfo.avatarUrl,
                  tagtype: "alipay",
                });
                //用户存在直接跳转会员中心
                if (data.accesstoken) {
                  // uni.clearStorageSync();
                  quit();

                  this.accesstoken = data.accesstoken;
                  this.openId = data.openId;
                  this.user_id = data.user_id;

                  uni.setStorageSync("userInfo", this.userInfo);
                  uni.setStorageSync("accesstoken", this.accesstoken);
                  uni.setStorageSync("user_id", this.user_id);
                  uni.setStorageSync("openId", this.openId);
                  uni.setStorageSync("tagtype", "alipay");
                  uni.hideLoading();
                  uni.switchTab({
                    url: "/pages/my/main",
                  });
                } else {
                  //用户不存在去绑定会员
                  this.openId = data.openId;
                  uni.setStorageSync("openId", this.openId);
                  uni.hideLoading();
                  uni.navigateTo({
                    url: "/apiPam/binding/main",
                  });
                }
              }
            },
          });
        },
      });
    },
    async doLogin() {
      //微信登录开始
      uni.showLoading({
        title: "登录中...", //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: (res) => {},
      });
	  
      //微信登录开始
      uni.login({
        success: (res) => {
          if (res.code) {
            this.code = res.code;
            console.log("code的值为：" + this.code);
            uni
              .getUserInfo()
              .then(async (infoRes) => {
                console.log(infoRes);
                //兼容性处理，我也不知道返回后是这种格式了
                let userInfo = infoRes[1].userInfo;
                uni.setStorageSync("userInfo", userInfo);
                this.userInfo = userInfo;
                const data = await loginWechatApi({
                  code: this.code,
                  nickname: this.userInfo.nickName,
                  gender: this.userInfo.gender,
                  avatarUrl: this.userInfo.avatarUrl,
                  tagtype: "weixin",
                  platform: "MP-WEIXIN", // 微信小程序登录
                });
                //用户存在直接跳转会员中心
                if (data.data.sess_id) {
                  // uni.clearStorageSync();
                  quit();

                  this.accesstoken = data.data.sess_id;
                  this.openId = data.data.openid;
                  this.user_id = data.data.user_id;
                  this.unionid = data.data.unionid;

                  uni.setStorageSync("userInfo", this.userInfo);
                  uni.setStorageSync("accesstoken", this.accesstoken);
                  uni.setStorageSync("user_id", this.user_id);
                  uni.setStorageSync("openId", this.openId);
                  uni.setStorageSync("unionid", this.unionid);
                  uni.setStorageSync("tagtype", "weixin");

                  uni.hideLoading();
                  uni.switchTab({
                    url: "/pages/my/main",
                  });
                } else {
                  //用户不存在去绑定会员
                  this.openId = data.data.openid;
                  this.unionid = data.data.unionid;
                  uni.setStorageSync("openId", this.openId);
                  uni.setStorageSync("unionid", this.unionid);
                  uni.hideLoading();
                  uni.navigateTo({
                    url: "/apiPam/binding/main",
                  });
                }
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                uni.hideLoading();
              });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        },
        fail: () => {},
        complete: () => {},
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
