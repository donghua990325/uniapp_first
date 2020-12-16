<template>
  <view>
    <cu-custom
      bgColor="bg-white"
      :isBack="false"
    >
      <block slot="backText">返回</block>
      <block slot="content">支付结果</block>
    </cu-custom>
    <div class="container">
      <div class="pay-result">
        <div
          class="success"
          v-if="status == true"
        >
          <div class="msg">付款成功</div>
          <div class="btns">
            <navigator
              class="btn"
              @click="orderDetailGo(orderId)"
            >查看订单</navigator>
            <navigator
              class="btn"
              @click="HomeGo()"
            >继续逛</navigator>
          </div>
        </div>
        <div
          class="error"
          v-if="status != true"
        >
          <div class="msg">付款中断</div>
          <div class="tips">
            <!-- <div class="p">请在 <text class="time">1小时</text> 内完成付款</div> -->
            <div class="p">可能的原因有以下几种：</div>
            <div class="p">1.账户余额不足 2.订单不存在 3.订单已支付</div>
            <!-- <div class="p">否则订单将会被系统取消</div> -->
          </div>
          <div class="btns">
            <navigator
              class="btn"
              @click="orderDetailGo(orderId)"
            >查看订单</navigator>
            <navigator
              class="btn"
              @click="rePay(orderId)"
            >重新付款</navigator>
          </div>
        </div>
        <div
          class="activity-line"
          v-if="pintuan"
        >
          <div class="activity">
            <div class="title">拼团中</div>
          </div>
          <div class="timer">
            <div class="text">距离拼团结束</div>
            <uni-countdown
              color="#FFFFFF"
              background-color="#00B26A"
              border-color="#00B26A"
              :show-day="true"
              :day="end_day"
              :hour="end_hour"
              :minute="end_minute"
              :second="end_second"
              @timeup="orderDetail"
            >
            </uni-countdown>
          </div>
        </div>
      </div>
      <div
        class="activity-line"
        v-if="pintuan"
      >
        <div class="activity">
          <div class="title">请分享：{{pin_goods_url}}</div>
        </div>
      </div>
    </div>
    </div>
  </view>
</template>

<script>
import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
import share from "@/common/share.js";

import { orderdetailGetApi } from "../../server/config.js";

import { toLogin } from "@/server/api.js";

export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
  },
  data() {
    return {
      status: false,
      orderId: "",
      actualPrice: "",
      order: [],
      pintuan: "",
    };
  },
  onLoad(options) {
    this.status = options.status;
    this.orderId = options.orderId;
    this.money = options.money;
  },
  async mounted() {
    this.status = this.status;
    this.orderId = this.orderId;
    this.actualPrice = this.money;
  },
  components: {
    uniCountdown,
  },
  methods: {
    HomeGo() {
      uni.switchTab({
        url: "/pages/index/main",
      });
    },
    orderDetailGo(id) {
      uni.redirectTo({
        url: "/apiMember/orderdetail/main?id=" + id,
      });
    },
    async orderDetail() {
      const order = await orderdetailGetApi({
        orderId: this.orderId,
      });
      this.order = order;
    },
    rePay(id) {
      uni.redirectTo({
        url: "/apiCart/pay/main?orderId=" + id,
      });
    },
    //总的点击按钮
    async startPay() {
      switch (this.paytype) {
        //预存款支付
        case "deposit":
          this.depositPay();
          return false;
          break;
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
    //预存款支付
    async depositPay() {
      const payParams = await payDopaymentApi({
        paytype: this.paytype,
        orderId: this.orderId,
        money: this.actualPrice,
      });
      //也没个返回，时间有限暂时不跟代码了
      uni.redirectTo({
        url:
          "/apiCart/payresult/main?status=1&orderId=" +
          this.orderId +
          "&money=" +
          this.actualPrice +
          "&paytype=" +
          this.paytype,
      });
    },
    // 微信小程序支付
    async wxpaywxappPay() {
      const payParams = await payDopaymentApi({
        paytype: this.paytype,
        orderId: this.orderId,
        money: this.actualPrice,
      });
      this.payParams = payParams;
      let _this = this;
      uni.requestPayment({
        timeStamp: this.payParams.timeStamp,
        nonceStr: this.payParams.nonceStr,
        package: this.payParams.package,
        signType: "MD5",
        paySign: this.payParams.paySign,
        success: function (res) {
          uni.redirectTo({
            url:
              "/apiCart/payresult/main?status=1&orderId=" +
              _this.orderId +
              "&money=" +
              _this.actualPrice +
              "&paytype=" +
              this.paytype,
          });
        },
        fail: function (res) {
          console.log(_this.orderId);
          uni.redirectTo({
            url:
              "/apiCart/payresult/main?status=0&orderId=" +
              _this.orderId +
              "&money=" +
              _this.actualPrice +
              "&paytype=" +
              this.paytype,
          });
        },
      });
    },
    // 支付宝小程序支付
    async malipaymyappPay() {
      const payParams = await payDopaymentApi({
        paytype: this.paytype,
        orderId: this.orderId,
        money: this.actualPrice,
      });
      console.log(payParams);
      this.payParams = payParams;
      let _this = this;
      if (this.payParams.trade_no) {
        uni.tradePay({
          tradeNO: this.payParams.trade_no,
          success: function (res) {
            // uni.alert(res.resultCode);
            console.log(res);
            uni.redirectTo({
              url:
                "/apiCart/payresult/main?status=1&orderId=" +
                _this.orderId +
                "&money=" +
                _this.actualPrice +
                "&paytype=" +
                this.paytype,
            });
          },
          fail: function (res) {
            uni.redirectTo({
              url:
                "/apiCart/payresult/main?status=0&orderId=" +
                _this.orderId +
                "&money=" +
                _this.actualPrice +
                "&paytype=" +
                this.paytype,
            });
            // uni.alert(res.resultCode);
            console.log(res);
          },
        });
      }
    },
    // 微信H5支付
    async wxpayh5Pay() {},
    // 支付宝H5支付
    async malipaynewPay() {},
    // 微信app支付
    async wxpayappplusPay() {},
    // 支付宝app支付
    async malipayappplusPay() {},
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>