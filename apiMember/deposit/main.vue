<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">充值</block>
    </cu-custom>
    <view class="block">
      <view class="title"> 我的账户 </view>
      <view class="content">
        <view class="my">
          账户余额：
          <div class="account">{{ advance }}</div>
          元
        </view>
      </view>
    </view>
    <view class="block">
      <view class="title"> 充值金额 </view>
      <view class="content">
        <view class="amount">
          <view class="list">
            <view
              class="box"
              v-for="(amount, index) in amountList"
              :key="index"
              @tap="select(amount)"
              :class="{ on: amount == inputAmount }"
            >
              {{ amount }}元
            </view>
          </view>
          <view class="num">
            <view class="text"> 自定义充值金额 </view>
            <view class="input">
              <input type="number" v-model="inputAmount" @input="oninput" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="block">
      <view class="title"> 选择支付方式 </view>
      <view class="content">
        <view class="pay-list">
          <!--  #ifdef  MP-WEIXIN -->
          <view class="row" @tap="paytype = 'wxpaywxapp'">
            <view class="left">
              <image
                src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/wxpay.png"
              ></image>
            </view>
            <view class="center"> 微信支付 </view>
            <view class="right">
              <radio :checked="paytype == 'wxpaywxapp'" color="#f06c7a" />
            </view>
          </view>
          <!--  #endif -->
          <!--  #ifdef  MP-ALIPAY -->
          <view class="row" @tap="paytype = 'malipaymyapp'">
            <view class="left">
              <image
                src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/alipay.png"
              ></image>
            </view>
            <view class="center"> 支付宝支付 </view>
            <view class="right">
              <radio :checked="paytype == 'malipaymyapp'" color="#f06c7a" />
            </view>
          </view>
          <!--  #endif -->

          <!--  #ifdef  H5 -->
          <view class="row" @tap="paytype = 'wxpayh5'">
            <view class="left">
              <image
                src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/wxpay.png"
              ></image>
            </view>
            <view class="center"> 微信支付 </view>
            <view class="right">
              <radio :checked="paytype == 'wxpayh5'" color="#f06c7a" />
            </view>
          </view>
          <view class="row" @tap="paytype = 'malipaynew'">
            <view class="left">
              <image
                src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/alipay.png"
              ></image>
            </view>
            <view class="center"> 支付宝支付 </view>
            <view class="right">
              <radio :checked="paytype == 'malipaynew'" color="#f06c7a" />
            </view>
          </view>
          <!--  #endif -->

          <!--  #ifdef  APP-PLUS -->
          <view class="row" @tap="paytype = 'wxpayappplus'">
            <view class="left">
              <image
                src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/wxpay.png"
              ></image>
            </view>
            <view class="center"> 微信支付 </view>
            <view class="right">
              <radio :checked="paytype == 'wxpayappplus'" color="#f06c7a" />
            </view>
          </view>
          <view class="row" @tap="paytype = 'malipayappplus'">
            <view class="left">
              <image
                src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/alipay.png"
              ></image>
            </view>
            <view class="center"> 支付宝支付 </view>
            <view class="right">
              <radio :checked="paytype == 'malipayappplus'" color="#f06c7a" />
            </view>
          </view>
          <!--  #endif -->
        </view>
      </view>
    </view>
    <view class="pay">
      <view class="btn" @tap="doDeposit">立即充值</view>
      <view class="tis">
        点击立即充值，即代表您同意<view class="terms"> 《条款协议》 </view>
      </view>
    </view>
  </view>
</template>

<script>
import {
  memberInfoApi,
  depositApi,
  createOrderApi,
  payDopaymentApi,
  loginWechatApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    console.log();
    // #ifdef MP-WEIXIN
    if (!uni.getStorageSync("openId")) {
      this.getWechatOpenid();
    }
    // #endif
  },
  data() {
    return {
      advance: "0",
      inputAmount: "", //金额
      amountList: [10, 50, 100], //预设3个可选快捷金额
      //默认支付方式显示
      // #ifdef MP-WEIXIN
      paytype: "wxpaywxapp", //支付类型
      // #endif
      // #ifdef MP-ALIPAY
      paytype: "malipaymyapp", //支付类型
      // #endif
      // #ifdef H5
      paytype: "wxpayh5", //支付类型
      // #endif
      // #ifdef APP-PLUS
      paytype: "wxpayappplus", //支付类型
      // #endif
      alipaywap: "", // 支付宝手机充值支付地址
      order_sn: "", // 余额支付订单号
    };
  },
  created() {
    this.GetAdvance();
  },
  methods: {
    async GetAdvance() {
      const data = await memberInfoApi({});
      this.advance = data.data.info.user_money;
      this.alipaywap = data.data.info.alipay_url;
    },
    oninput(e) {
      if (this.inputAmount.split(".")[1].length >= 2) {
        this.inputAmount = parseFloat(this.inputAmount).toFixed(2);
        uni.showToast({ title: "最多只能输入两位小数哦", icon: "none" });
        return this.inputAmount;
      }
    },
    select(amount) {
      this.inputAmount = amount;
    },
    async doDeposit() {
      if (parseFloat(this.inputAmount).toString() == "NaN") {
        uni.showToast({ title: "请输入正确金额", icon: "none" });
        return;
      }
      if (this.inputAmount <= 0) {
        uni.showToast({ title: "请输入大于0的金额", icon: "none" });
        return;
      }
      if (
        parseFloat(this.inputAmount).toFixed(2) != parseFloat(this.inputAmount)
      ) {
        uni.showToast({ title: "最多只能输入两位小数哦~", icon: "none" });
        return;
      }
      // 提交前需要进行订单的生成  返回生成的订单号
      const data = await createOrderApi({
        money: this.inputAmount,
      });
      if (data) {
        this.order_sn = data.data;
      }

      switch (this.paytype) {
        //小程序微信支付
        case "wxpaywxapp":
          this.wxpaywxappPay();
          return false;
          break;
        //小程序支付宝支付
        case "malipaymyapp":
          this.malipaymyappPay();
          return false;
          break;
        //微信H5支付
        case "wxpayh5":
          this.wxpayh5Pay();
          return false;
          break;
        //支付宝H5支付
        case "malipaynew":
          this.malipaynewPay();
          return false;
          break;
        //微信app支付
        case "wxpayappplus":
          this.wxpayappplusPay();
          return false;
          break;
        //支付宝app支付
        case "malipayappplus":
          this.malipayappplusPay();
          return false;
          break;
        default:
          return false;
          break;
      }
    },
    // 支付宝H5支付
    async malipaynewPay() {
      console.log(window.location.href);
      let pay_url =
        this.alipaywap +
        "&order_sn=" +
        this.order_sn +
        "&body=账户余额充值&passback_params=deposit" +
        "&money=" +
        this.inputAmount +
        "&quit_url=" +
        window.location.href;
      location.href = pay_url;
    },
    // 支付宝app支付
    async malipayappplusPay() {
      console.log("支付宝支付");
      const payParams = await payDopaymentApi({
        order_id: this.order_sn,
        money: this.inputAmount,
        pay_type: "alipayApp",
        passback_params: "deposit",
      });
      let _this = this;
      uni.requestPayment({
        provider: "alipay",
        orderInfo: payParams.data.response.payInfo,
        success: function (res) {
          uni.redirectTo({
            url: "/apiMember/advancelist/main",
          });
        },
        fail: function (res) {
          console.log(res);
          console.log("支付失败");
        },
      });
    },
    // 微信小程序支付
    async wxpaywxappPay() {
      console.log("微信小程序支付");
      const data = await payDopaymentApi({
        order_id: this.order_sn,
        money: this.inputAmount,
        pay_type: "wxpayMp",
        openid: uni.getStorageSync("openId"),
        passback_params: "deposit",
      });
      if (data.data.res === false) {
        uni.showToast({
          icon: "none",
          title: data.data.msg,
        });
        return false;
      }
      console.log("---------------");
      console.log(data);
      console.log("---------------");
      // return false;
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: data.data.timeStamp,
        nonceStr: data.data.nonceStr,
        package: data.data.package,
        signType: "MD5",
        paySign: data.data.paySign,
        success: function (res) {
          console.log("充值成功");
          console.log("success:" + JSON.stringify(res));
          uni.switchTab({
            url: "/pages/my/main",
          });
        },
        fail: function (err) {
          console.log("fail:" + JSON.stringify(err));
        },
      });
    },
    // 微信H5支付
    async wxpayh5Pay() {
      const payParams = await payDopaymentApi({
        pay_id: this.paytype,
        order_id: this.order_sn,
        money: this.inputAmount,
        pay_type: "wxpayH5",
        passback_params: "deposit",
      });
      if (payParams.data.res === false) {
        // 失败
        uni.showToast({
          title: payParams.data.msg,
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (payParams.data.res === true) {
        // 跳往微信

        location.href = payParams.data.url;
      }
    },
    // 微信APP支付
    async wxpayappplusPay() {
      console.log("微信APP支付");
      const payParams = await payDopaymentApi({
        order_id: this.order_sn,
        money: this.inputAmount,
        pay_type: "wxpayApp",
        passback_params: "deposit",
      });
      uni.requestPayment({
        provider: "wxpay",
        orderInfo: payParams.data.response,
        success: function (res) {
          console.log("支付成功");
          console.log(res);
        },
        fail: function (res) {
          console.log("失败");
          console.log(res);
        },
      });
    },
    async getWechatOpenid() {
      //微信登录开始
      uni.showLoading({
        title: "登录中...", //提示的内容,
        mask: true, //显示透明蒙层，防止触摸穿透,
        success: (res) => {},
      });

      // 微信登录开始
      uni.login({
        success: async (res) => {
          if (res.code) {
            this.code = res.code;
            console.log("code：" + this.code);
            const data = await loginWechatApi({
              code: this.code,
              platform: "MP-WEIXIN-MOBILE",
            });
            if (data.data.res === true) {
              // 获取成功 记录openid
              uni.setStorageSync("openId", data.data.openid); // 将openid记录
            }
          }
        },
      });
    },
  },
  onLoad() {},
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>

