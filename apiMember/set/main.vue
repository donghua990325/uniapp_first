<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">设置</block>
    </cu-custom>
    <view class="container">
      <view
        class="list-cell b-b m-t"
        @click="navTo('/apiMember/memberinfo/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
      >
        <text class="cell-tit">个人资料</text>
        <text class="cell-tip"></text>
        <text class="cell-more yticon icon-you"></text>
      </view>
      <view
        class="list-cell b-b m-t"
        @click="navTo('/apiPam/securitypwd/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
      >
        <text class="cell-tit">修改登录密码</text>
        <text class="cell-tip"></text>
        <text class="cell-more yticon icon-you"></text>
      </view>

      <!-- #ifdef APP-PLUS || H5 -->
      <view
        class="list-cell b-b m-t"
        @click="navTo('/apiPam/securityphone/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
      >
        <text class="cell-tit">更改手机号码</text>
        <text class="cell-tip"></text>
        <text class="cell-more yticon icon-you"></text>
      </view>
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN -->
      <view
        class="list-cell b-b m-t"
        @click="navTo('/apiPam/securityphone/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
        v-if="mobile_phone != ''"
      >
        <text class="cell-tit">更改手机号码</text>
        <text class="cell-tip"></text>
        <text class="cell-more yticon icon-you"></text>
      </view>
      <!-- #endif -->

      <!-- #ifdef MP-WEIXIN -->
      <view
        class="list-cell b-b m-t"
        @click="navTo('/apiPam/mobile/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
        v-if="mobile_phone == ''"
      >
        <text class="cell-tit">绑定手机号码</text>
        <text class="cell-tip"></text>
        <text class="cell-more yticon icon-you"></text>
      </view>
      <!-- #endif -->
      <view
        class="list-cell b-b"
        @click="navTo('/apiUtil/feedback/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
      >
        <text class="cell-tit">意见反馈</text>
        <text class="cell-more yticon icon-you"></text>
      </view>
      <!-- #ifdef APP-PLUS -->
      <view
        class="list-cell m-t b-b"
        @click="delCache()"
        hover-class="cell-hover"
        :hover-stay-time="50"
      >
        <text class="cell-tit">清除缓存</text>
        <text class="cell-tip"></text>
        <text class="cell-more yticon icon-you"></text>
      </view>
      <!-- #endif -->

     <!-- <view class="list-cell" @click="navTo('/apiUtil/meteorshower/main')">
        <text class="cell-tit">许个愿</text>
        <text class="cell-more yticon icon-you"></text>
      </view> -->
      <!-- <view
        class="list-cell b-b"
        @click="navTo('/apiUtil/timeline/main')"
        hover-class="cell-hover"
        :hover-stay-time="50"
      >
        <text class="cell-tit">更新日志</text>
        <text class="cell-more yticon icon-you"></text>
      </view> -->
      <view class="list-cell log-out-btn" @click="toLogout">
        <text class="cell-tit">退出登录</text>
      </view>
    </view>
  </view>
</template>

<script>
import { toLogin, quit } from "@/server/api.js";
import { getSetting } from "@/server/config.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getSettingfunc();
  },
  onLoad() {
    this.getSettingfunc();
  },
  data() {
    return {
      helptopicUrl: "",
      mobile_phone: "",
    };
  },
  methods: {
    async getSettingfunc() {
      const data = await getSetting({});
      this.mobile_phone = data.data.mobile_phone;
    },

    /**
     * 统一跳转接口,拦截未登录路由
     * navigator标签现在默认没有转场动画，所以用view
     */
    navTo(url) {
      uni.navigateTo({
        url,
      });
    },
    delCache() {
      uni.showModal({
        title: "缓存",
        content: "是否清除缓存?",
        confirmText: "清除",
        success: function (res) {
          if (res.confirm) {
            console.log("清除缓存");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    //退出登录
    toLogout() {
      uni.showModal({
        content: "确定要退出登录么",
        success: (e) => {
          if (e.confirm) {
            // uni.clearStorageSync();
            quit();
            setTimeout(() => {
              uni.navigateTo({
                url: "/apiPam/logincommon/main",
              });
            }, 200);
          }
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
