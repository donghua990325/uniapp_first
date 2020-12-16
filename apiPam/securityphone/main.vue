<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">变更手机号码</block>
    </cu-custom>
    <view class="bg-white padding">
      <view class="cu-steps">
        <view
          class="cu-item"
          :class="index > basics ? '' : 'text-jred'"
          v-for="(item, index) in basicsList"
          :key="index"
        >
          <text :class="'cuIcon-' + item.cuIcon"></text> {{ item.name }}
        </view>
      </view>
    </view>
    <!-- 主体1 -->
    <view class="main" v-if="showpop1">
      <!-- <view class="tips">若你忘记了密码，可在此重置新密码。</view> -->
      <wInput
        v-model="phoneData1"
        type="text"
        maxlength="11"
        placeholder="请输入手机号码"
        isDisabled
      ></wInput>
      <wInput
        v-model="verCode1"
        type="number"
        maxlength="6"
        placeholder="验证码"
        isShowCode
        codeText="获取重置码"
        setTime="60"
        ref="runCode"
        @setCode="getVerCode1()"
      ></wInput>
    </view>
    <!-- 主体2 -->
    <view class="main" v-if="showpop2">
      <!-- <view class="tips">若你忘记了密码，可在此重置新密码。</view> -->
      <wInput
        v-model="phoneData2"
        type="text"
        maxlength="11"
        placeholder="请输入新的手机号码"
      ></wInput>
      <wInput
        v-model="verCode2"
        type="number"
        maxlength="6"
        placeholder="验证码"
        isShowCode
        codeText="获取重置码"
        setTime="60"
        :ref="runCode2"
        @setCode="getVerCode2()"
      ></wInput>
      <!-- <wInput
        v-model="passData"
        type="password"
        maxlength="11"
        placeholder="请输入新密码"
        isShowPass
      ></wInput> -->
    </view>

    <wButton
      v-if="showpop1"
      text="下一步"
      @click.native="BasicsSteps1()"
    ></wButton>

    <wButton
      v-if="showpop2"
      text="提交"
      @click.native="BasicsSteps2()"
    ></wButton>
  </view>
</template>

<script>
import { toLogin, quit } from "@/server/api.js";
import {
  securityphoneSendBeforeApi,
  securityphoneUpdateBeforeApi,
  securityphoneUpdateAfterApi,
  memberInfoApi,
} from "@/server/config.js";
import wInput from "@/components/watch-login/watch-input.vue"; //input
import wButton from "@/components/watch-login/watch-button.vue"; //button
export default {
  onShow() {
    toLogin(); // 判断是否登录
  },
  data() {
    return {
      basicsList: [
        {
          cuIcon: "usefullfill",
          name: "验证身份",
        },
        {
          cuIcon: "radioboxfill",
          name: "绑定手机号",
        },
      ],
      showpop1: true,
      showpop2: false,
      phoneData1: "", //电话
      phoneData2: "", //电话
      passData: "", //密码
      verCode1: "", //验证码
      verCode2: "", //验证码
      isRotate: false, //是否加载旋转
      runCode2: "",
      basics: 0,
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
      this.phoneData1 = data.data.info.mobile;
    },
    async getVerCode1() {
      //获取验证码
      if (this.phoneData1.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      const data = await securityphoneSendBeforeApi({
        mobile: this.phoneData1,
        status: "before",
      });

      console.log("获取验证码");
      console.log(data);
      if (data.data.res === true) {
        //模拟倒计时触发
        this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "发送成功",
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
    async getVerCode2() {
      //获取验证码
      if (this.phoneData2.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      const data = await securityphoneSendBeforeApi({
        mobile: this.phoneData2,
        status: "after",
      });

      console.log("获取验证码");
      if (data.data.res === false) {
        //模拟倒计时触发
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: data.data.msg,
        });
        return false;
      }
      if (data.data.res === true) {
        //模拟倒计时触发
        this.$refs.runCode.$emit("runCode"); //触发倒计时（一般用于请求成功验证码后调用）
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "发送成功",
        });
      }

      // setTimeout(function() {
      //   this.$refs.runCode.$emit("runCode2", 0); //假装模拟下需要 终止倒计时
      //   // uni.showToast({
      //   //     icon: 'none',
      //   // 	position: 'bottom',
      //   //     title: '模拟倒计时终止'
      //   // });
      // }, 3000);
    },
    async BasicsSteps1() {
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData1.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      if (this.verCode1.length < 3) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "验证码不正确",
        });
        return false;
      }

      const data = await securityphoneUpdateBeforeApi({
        mobile: this.phoneData1,
        verCode: this.verCode1,
      });

      console.log(data);
      if (data.data.res === false) {
        uni.showToast({
          title: data.data.msg,
          icon: "none",
          duration: 1500,
        });
        console.log("验证码错误");
        return false;
      }
      if (data.data.res === true) {
        uni.showToast({
          title: data.data.msg,
          icon: "none",
          duration: 1500,
        });
        console.log("验证手机号正确");

        this.showpop1 = false;
        this.showpop2 = true;
        this.$refs.runCode.$emit("runCode", 0); //触发倒计时（一般用于请求成功验证码后调用）
        this.runCode2 = "runCode";
        this.basics =
          this.basics == this.basicsList.length - 1 ? 0 : this.basics + 1;
      }
    },
    async BasicsSteps2() {
      if (this.isRotate) {
        //判断是否加载中，避免重复点击请求
        return false;
      }
      if (this.phoneData1.length != 11) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "手机号不正确",
        });
        return false;
      }
      // if (this.passData.length < 6) {
      //   uni.showToast({
      //     icon: "none",
      //     position: "bottom",
      //     title: "密码不正确"
      //   });
      //   return false;
      // }
      if (this.verCode1.length < 3) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "验证码不正确",
        });
        return false;
      }

      const data = await securityphoneUpdateAfterApi({
        mobile: this.phoneData2,
        // passData: this.passData,
        verCode: this.verCode2,
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
    },
  },
};
</script>

<style lang='scss' scoped>
@import url("../../components/watch-login/css/icon.css");
@import "./style";
</style>