<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">绑定</block>
    </cu-custom>
    <view class="register">
      <view class="content">
        <!-- 头部logo -->
        <view class="header">
          <image :src="userInfo.avatarUrl"></image>
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
          text="绑定手机号"
          :rotate="isRotate"
          @click.native="startReg()"
        ></wButton>
        <view class="tg" @click="href()">跳过</view>
        <!-- <wButton
          text="跳过"
          :rotate="isRotate"
          @click.native="href()"
        ></wButton> -->
        <!-- 采用强制绑定手机号 -->
        <!-- <wButton
        text="直接登录"
        :rotate="isRotate"
        @click.native="startRegDirect()"
      ></wButton> -->
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
import { getStorageOpenid, getStorageUserInfo, quit } from "@/server/api.js";
import {
  bindingWechatApi,
  bindingAlipayApi,
  bindingSendSmsApi,
  nextBingdingMobile
} from "@/server/config.js";
import wInput from "@/components/watch-login/watch-input.vue"; //input
import wButton from "@/components/watch-login/watch-button.vue"; //button

export default {
  onShow() {
    //获取openId
    this.openId = getStorageOpenid();
    //获取用户信息
    this.userInfo = getStorageUserInfo();
	this.pid = uni.getStorageSync("parent_id");
  },
  data() {
    return {
      //logo图片 base64
      phoneData: "", // 用户/电话
      verCode: "", //验证码
      showAgree: true, //协议是否选择
      isRotate: false, //是否加载旋转
      userInfo: [],
      openId: "",
      accesstoken: "",
	  unionid: "",
	  pid:''
    };
  },
  components: {
    wInput,
    wButton
  },
  mounted() {},
  methods: {
    isShowAgree() {
      //是否选择协议
      this.showAgree = !this.showAgree;
    },
    async getVerCode() {
      //获取验证码
      if (this.phoneData.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确"
        });
        return false;
      }
      const data = await bindingSendSmsApi({
        mobile: this.phoneData
      });
      console.log("获取验证码");
      console.log(data);
      if (data.data.res) {
        //模拟倒计时触发
        this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "获取短信成功"
        });
      }
    },
	async href(){
		const data = await nextBingdingMobile({
		  openid: uni.getStorageSync('openId'),
		  unionid: uni.getStorageSync('unionid'),
		  pid:this.pid,
		  platform: "MP-WEIXIN" // 微信小程序登录
		});
		this.user_id = data.data.user_id;
		this.accesstoken = data.data.sess_id;
				console.log("-------------");
				console.log(this.user_id);
				console.log(this.accesstoken);
				console.log("-------------");
		uni.setStorageSync("accesstoken", this.accesstoken);
		uni.setStorageSync("user_id", this.user_id);
		uni.setStorageSync('tagtype','weixin');
		uni.switchTab({
		  url: "/pages/my/main"
		});
		
		// return ;
	},
    async startReg() {
      //绑定
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.showAgree == false) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请先同意《协议》"
        });
        return false;
      }
      if (this.phoneData.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确"
        });
        return false;
      }
      if (this.verCode.length < 4) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "验证码不正确"+this.verCode
        });
        return false;
      }
      // #ifdef APP-PLUS || H5
      const data = await bindingWechatApi({
        mobile: this.phoneData,
        verCode: this.verCode,
        openId: this.openId ,// 暂时先为默认的
		unionid: uni.getStorageSync("unionid"),
      });
      quit();
      uni.setStorageSync("tagtype", "weixin");
      // #endif
      // #ifdef MP-WEIXIN
      const data = await bindingWechatApi({
        mobile: this.phoneData,
        verCode: this.verCode,
        openId: this.openId,
        nickname: this.userInfo.nickName,
        gender: this.userInfo.gender,
		pid:this.pid,
        avatarUrl: this.userInfo.avatarUrl,
		unionid: uni.getStorageSync("unionid"),
        tagtype: "weixin",
        platform: "MP-WEIXIN" // 微信小程序登录
      });
      uni.setStorageSync("tagtype", "weixin");
      // #endif
      // #ifdef MP-ALIPAY
      const data = await bindingAlipayApi({
        mobile: this.phoneData,
        verCode: this.verCode,
        openId: this.openId,
        nickname: this.userInfo.nickName,
        gender: this.userInfo.gender,
        avatarUrl: this.userInfo.avatarUrl,
        tagtype: "alipay",
		unionid: uni.getStorageSync("unionid");
      });
      quit();
      uni.setStorageSync("tagtype", "alipay");
      // #endif

      if (data.data.res === false) {
        uni.showToast({
          icon: "none",
          title: data.data.msg
        });
        return false;
      }
      this.accesstoken = data.data.sess_id;
      this.openId = data.data.openId;
      this.user_id = data.data.user_id;


      uni.setStorageSync("accesstoken", this.accesstoken);
      uni.setStorageSync("openId", this.openId);
      uni.setStorageSync("user_id", this.user_id);

      uni.switchTab({
        url: "/pages/my/main"
      });
    },
    async startRegDirect() {
      //绑定
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.showAgree == false) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请先同意《协议》"
        });
        return false;
      }
      // #ifdef MP-WEIXIN
      const data = await bindingWechatApi({
        openId: this.openId,
        nickname: this.userInfo.nickName,
        gender: this.userInfo.gender,
        avatarUrl: this.userInfo.avatarUrl,
        tagtype: "weixin"
      });
      uni.setStorageSync("tagtype", "weixin");
      // #endif
      // #ifdef MP-ALIPAY
      const data = await bindingAlipayApi({
        openId: this.openId,
        nickname: this.userInfo.nickName,
        gender: this.userInfo.gender,
        avatarUrl: this.userInfo.avatarUrl,
        tagtype: "alipay"
      });
      uni.setStorageSync("tagtype", "alipay");
      // #endif
      this.accesstoken = data.accesstoken;
      this.openId = data.openId;

      uni.setStorageSync("userInfo", this.userInfo);
      uni.setStorageSync("accesstoken", this.accesstoken);
      uni.setStorageSync("openId", this.openId);

      uni.switchTab({
        url: "/pages/my/main"
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import url("../../components/watch-login/css/icon.css");
@import "./style";
</style>