<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">支付</block>
    </cu-custom>
    <div class="container">
      <div class="total">
        <div class="label">订单号</div>
        <div class="txt">{{ orderId }}</div>
      </div>
      <div class="total">
        <div class="label">订单金额</div>
        <div class="txt">¥ {{ actualPrice }}</div>
      </div>
      <div class="pay-list">
        <div class="h">请选择支付方式</div>
        <div class="b">
          <!--  #ifdef  MP-WEIXIN -->
          <div
            class="item"
            @tap="paytype = 'wxpaywxapp'"
            v-if="small_is_use == 'on'"
          >
            <div
              class="checkbox"
              :class="['wxpaywxapp' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-wechat"></div>
            <div class="name">微信支付</div>
          </div>
          <!--  #endif -->

          <!--  #ifdef  MP-ALIPAY -->
          <div
            class="item"
            @tap="paytype = 'malipaymyapp'"
            v-if="zhifu_is_use == 'on'"
          >
            <div
              class="checkbox"
              :class="['malipaymyapp' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-Alipay"></div>
            <div class="name">支付宝</div>
          </div>
          <!--  #endif -->

          <!--  #ifdef  H5-->
          <div
            class="item"
            @tap="paytype = 'wxpayh5'"
            v-if="hfive_is_use == 'on'"
          >
            <div
              class="checkbox"
              :class="['wxpayh5' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-wechat"></div>
            <div class="name">微信支付</div>
          </div>
          <div
            class="item"
            @tap="paytype = 'malipaynew'"
            v-if="zhifu_is_use == 'on'"
          >
            <div
              class="checkbox"
              :class="['malipaynew' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-Alipay"></div>
            <div class="name">支付宝</div>
          </div>
          <!--  #endif -->
          <!--  #ifdef  APP-PLUS -->
          <div
            class="item"
            @tap="paytype = 'wxpayappplus'"
            v-if="app_is_use == 'on'"
          >
            <div
              class="checkbox"
              :class="['wxpayappplus' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-wechat"></div>
            <div class="name">微信支付</div>
          </div>
          <div
            class="item"
            @tap="paytype = 'malipayappplus'"
            v-if="zhifu_is_use == 'on'"
          >
            <div
              class="checkbox"
              :class="['malipayappplus' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-Alipay"></div>
            <div class="name">支付宝</div>
          </div>
          <!--  #endif -->
          <div class="item" @tap="paytype = 'deposit'">
            <div
              class="checkbox"
              :class="['deposit' === paytype ? 'checked' : '']"
            ></div>
            <div class="icon-balance"></div>
            <div class="name">预存款支付 (余额：{{ advance }})</div>
          </div>
        </div>
      </div>

      <!--  #ifdef  MP-WEIXIN -->
      <div class="tips">
        微信小程序只支持微信支付和预存款支付，如需其它支付方式，请在网页版支付
      </div>
      <!--  #endif -->
      <!--  #ifdef  MP-ALIPAY -->
      <div class="tips">
        支付宝小程序只支持支付宝支付和预存款支付，如需其它支付方式，请在网页版支付
      </div>
      <!--  #endif -->
      <!-- 		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-title text-orange "></text> 对话窗口
			</view>
			<view class="action">
				<button class="cu-btn bg-green shadow" @tap="showModal" data-target="DialogModal1">Dialog</button>
				<button class="cu-btn bg-blue shadow margin-left" @tap="showModal" data-target="DialogModal2">Dialog</button>
			</view>
		</view> -->
      <view class="cu-modal" :class="modalName == 'DialogModal1' ? 'show' : ''">
        <view class="cu-dialog">
          <view class="cu-bar bg-white justify-end">
            <view class="content">确定离开？</view>
            <view class="action" @tap="hideModal">
              <text class="cuIcon-close text-red"></text>
            </view>
          </view>
          <view class="padding-xl"> 是否需要放弃支付？ </view>
          <view class="cu-bar bg-white justify-end">
            <view class="action">
              <button class="cu-btn line-green text-green" @tap="hideModal">
                取消
              </button>
              <button class="cu-btn bg-green margin-left" @click="back">
                确定
              </button>
            </view>
          </view>
        </view>
      </view>
      <div class="pay-btn" @click="startPay">确定</div>

      <div class="pay-btn-qu" @tap="showModal" data-target="DialogModal1">
        取消
      </div>
    </div>
  </view>
</template>

<script>
import {
  payDetailApi,
  getPaymentListApi,
  doPaymentBalanceApi,
  payDopaymentApi,
  doPaymentMpH5Api,
  memberInfoApi,
  doPaymentAliAppAPi,
  doPaymentWxAppAPi,
  loginWechatApi,
  wechatPayApi,
  payCardApi,
  getPaymentIsUseApi,
} from "../../server/config.js";
import { toLogin } from "@/server/api.js";

export default {
  onLoad(opt) {
    this.orderId = opt.orderId;
    this.code = opt.code;
    this.orderDetail();
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    uni.getStorageSync("bonusName", ""); // 清除红包信息
    uni.getStorageSync("bonus_id", "");
    this.advance = uni.getStorageSync("advance");
    // #ifdef H5
    this.iswechatH5 = this.is_weixn();
    // #endif

    if (this.code) {
      this.wxpayh5Pay();
    }

    // #ifdef MP-WEIXIN
    if (!uni.getStorageSync("openId")) {
      this.getWechatOpenid();
    }
    // #endif
  },
  mounted() {
    this.getPayment();
    this.GetAdvance();
    this.getPaymentIsUse();
  },
  data() {
    return {
      modalName: null,
      orderId: 0,
      actualPrice: 0.0,
      advance: "",
      payParams: [],
      balance_amount: 0.0,
      pay_id: "",
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
      paytype: "bankcard", //支付类型
      // #endif
      alipaywap: "", // 支付宝手机网页支付地址
      goods_name: "", // 订单商品名称 即支付订单显示描述 取订单第一个商品的名字
      advance: 0, // 余额  取缓存
      code: "", // 微信code
      small_is_use: "", //微信支付、小程序
      hfive_is_use: "", //微信支付、h5
      app_is_use: "", //微信支付、app
      zhifu_is_use: "", //支付宝支付
      iswechatH5: "", //是否是微信H5支付
    };
  },
  methods: {
    showModal(e) {
      this.modalName = e.currentTarget.dataset.target;
    },
    hideModal(e) {
      this.modalName = null;
    },
    async back() {
      uni.switchTab({
        url: "/pages/my/main",
      });
    },
    // #ifdef H5
    is_weixn() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    },
    // #endif

    async orderDetail() {
      const data = await payDetailApi({
        order_id: this.orderId,
      });
      if (data.data.pay_detail === false) {
        uni.showToast({
          title: "不存在此订单",
          icon: "none",
          duration: 2000,
        });
        uni.navigateTo({ url: "/pages/index/main" });

        return false;
      }
      this.actualPrice = data.data.info.total_fee;
      this.order = data.data.info;
      this.order_id = this.$root.$mp.query.orderId;
      this.payment_list = data.data.info.payment_list;
      this.alipaywap = data.data.other.url;
      this.goods_name = data.data.other.goods_name;

      console.log("-----");
      console.log(data);
      console.log("-----");
    },

    selectPayment(paymentId) {
      this.pay_id = paymentId;
    },
    async GetAdvance() {
      const data = await memberInfoApi({});
      this.advance = data.data.info.user_money;
    },
    async doPay() {
      if (this.pay_id === "balance") {
        let data = await doPaymentBalanceApi({
          order_id: this.$root.$mp.query.orderId,
          pay_id: this.pay_id,
        });
        if (!data.data.dopay) {
          uni.showToast({
            title: data.data.info,
            icon: "none",
            duration: 1000,
          });
          setTimeout(() => {
            uni.redirectTo({
              url:
                "/apiMember/orderdetail/main?id=" +
                this.$root.$mp.query.orderId,
            });
          }, 1000);
        } else {
          uni.showToast({
            title: "订单支付成功",
            icon: "none",
            duration: 1000,
          });
          setTimeout(() => {
            uni.redirectTo({
              url:
                "/apiMember/orderdetail/main?id=" +
                this.$root.$mp.query.orderId,
            });
          }, 1000);
        }
      }
    },

    async getPayment() {
      let paymentData = await getPaymentListApi({});
      if (paymentData.data.info.length === 0) {
        uni.showToast({
          title: "请配置支付方式",
          icon: "none",
          duration: 2000,
        });
      } else {
        this.pay_id = paymentData.data.info[0].pay_code;
      }

      paymentData.data.info.forEach((obj) => {
        if (obj.pay_code === "balance") {
          this.balance = true;
          this.balance_amount = obj.amount_txt;
        }
        if (obj.pay_code === "alipay") {
          this.alipay = true;
        }
        if (obj.pay_code === "wxpay") {
          this.wxpay = true;
        }
      });
    },
    //总的点击按钮
    async startPay() {
      // console.log("类型"+this.paytype);
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
        //线下支付
        case "bankcard":
          this.bankcardPay();
          return false;
          break;
        default:
          return false;
          break;
      }
    },
    //预存款支付
    async depositPay() {
      if (Number(this.advance) < Number(this.actualPrice)) {
        uni.showToast({
          icon: "none",
          title: "余额不足",
        });
        return false;
      }
      const payParams = await doPaymentBalanceApi({
        pay_id: this.paytype,
        order_id: this.orderId,
        money: this.actualPrice,
      });
      if (payParams.data.dopay === false) {
        // 支付失败

        uni.redirectTo({
          url:
            "/apiCart/payresult/main?status=0&orderId=" +
            this.orderId +
            "&money=" +
            this.actualPrice +
            "&paytype=" +
            this.paytype,
        });
        return false;
      }
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
        pay_type: "wxpayMp",
        order_id: this.orderId,
        money: this.actualPrice,
        openid: uni.getStorageSync("openId"),
      });
      if (payParams.data.res === false) {
        uni.showToast({
          icon: "none",
          title: payParams.data.msg,
        });
        return false;
      }
      this.payParams = payParams;
      let _this = this;
      uni.requestPayment({
        provider: "wxpay",
        timeStamp: payParams.data.timeStamp,
        nonceStr: payParams.data.nonceStr,
        package: payParams.data.package,
        signType: "MD5",
        paySign: payParams.data.paySign,
        success: function (res) {
          uni.redirectTo({
            url:
              "/apiCart/payresult/main?status=1&orderId=" +
              _this.orderId +
              "&money=" +
              _this.actualPrice,
          });
        },
        fail: function (res) {
          console.log(_this.orderId);
          uni.redirectTo({
            url:
              "/apiCart/payresult/main?status=0&orderId=" +
              _this.orderId +
              "&money=" +
              _this.actualPrice,
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
    async wxpayh5Pay() {
      if (this.iswechatH5) {
        const wechatPay = await wechatPayApi({
          order_id: this.orderId,
          code: this.code,
          money: this.actualPrice,
        });

        if (wechatPay.data.status == "code") {
          window.location = wechatPay.data.url;
          return false;
        }
        if (wechatPay.data.res === true) {
          // var pay_info = wechatPay.data.result;
          var params = {
            //公众号名称，由商户传入
            appId: wechatPay.data.result.appId, // merchant id
            //时间戳，自1970年以来的秒数
            timeStamp: wechatPay.data.result.timeStamp, // prepay id
            //随机字符串
            nonceStr: wechatPay.data.result.nonceStr, // nonce

            package: wechatPay.data.result.package, // timestamp
            //微信签名方式：
            signType: "MD5", // signed string
            //Sign=WXPay
            paySign: wechatPay.data.result.paySign,
          };
          this.onBridgeReady(params, wechatPay.data.redirect_url);
        } else {
          // 失败
          uni.showToast({
            title: wechatPay.data.msg,
            icon: "none",
            duration: 1500,
          });
          return false;
        }
        return false;
      }
      const payParams = await payDopaymentApi({
        pay_id: this.paytype,
        order_id: this.orderId,
        money: this.actualPrice,
        pay_type: "wxpayH5",
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
    // 支付宝H5支付
    async malipaynewPay() {
      console.log(window.location.href);
      let pay_url =
        this.alipaywap +
        "&order_sn=" +
        this.orderId +
        "&body=" +
        this.goods_name +
        "&money=" +
        this.actualPrice +
        "&quit_url=" +
        window.location.href;
      console.log(pay_url);
      location.href = pay_url;
    },
    // 微信app支付
    async wxpayappplusPay() {
      console.log("微信APP支付");
      const payParams = await payDopaymentApi({
        order_id: this.orderId,
        money: this.actualPrice,
        pay_type: "wxpayApp",
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
    async bankcardPay() {
      let _this = this;
      const payParams = await payDopaymentApi({
        order_id: this.orderId,
        money: this.actualPrice,
        pay_type: "bankcard",
      });

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
    async onBridgeReady(target, redirect_url) {
      WeixinJSBridge.invoke("getBrandWCPayRequest", target, function (res) {
        // alert(JSON.stringify(target));
        // alert(JSON.stringify(res));
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          location.href = redirect_url;
        }
      });
    },
    // 支付宝app支付
    async malipayappplusPay() {
      console.log("支付宝支付");
      const payParams = await payDopaymentApi({
        order_id: this.orderId,
        money: this.actualPrice,
        pay_type: "alipayApp",
      });
      let _this = this;
      uni.requestPayment({
        provider: "alipay",
        orderInfo: payParams.data.response.payInfo,
        success: function (res) {
          console.log(res);
          console.log("成功支付");
          console.log(_this.orderId);
          console.log("-------");
          uni.redirectTo({
            url: "/apiCart/payresult/main?status=1&orderId=" + _this.orderId,
          });
        },
        fail: function (res) {
          console.log(res);
          console.log("支付失败");
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
            uni.setStorageSync("openId", data.data.openid); // 将openid记录
          }
        },
      });
    },
    async getPaymentIsUse() {
      const data = await getPaymentIsUseApi({});
      this.small_is_use = data.data.small_is_use;
      this.hfive_is_use = data.data.hfive_is_use;
      this.app_is_use = data.data.app_is_use;
      this.zhifu_is_use = data.data.zhifu_is_use;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>