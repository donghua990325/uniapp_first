<template>
  <view class="cash">
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">申请提现</block>
    </cu-custom>
    <view class="H10"></view>
    <view class="txz">
      提现至:
      <input
        type="number"
        style="display: inline-block; overflow: inherit"
        v-model="card"
        placeholder="银行卡号"
      />
    </view>
    <view class="khh"
      >开户行 ：&emsp;<input
        type="type"
        style="display: inline-block; overflow: inherit"
        v-model="bank_account"
        placeholder="开户行"
    /></view>
    <view class="khh"
      >开户行地址: &emsp;<input
        type="type"
        style="display: inline-block; overflow: inherit"
        v-model="bank_addr"
        placeholder="开户行地址"
    /></view>
    <view class="H10"></view>
    <view class="jine">
      <view class="jine_01">¥</view>
      <view class="jine_02"
        ><input
          class="uni-input"
          focus
          placeholder="请输入金额"
          type="digit"
          v-model="withdrawal"
      /></view>
    </view>
    <view class="money">
      <view class="ktx">可提现金额：{{ user_money | priceFormat(2) }}元</view>
    </view>
    <!--      <view class='kg'>        -->
    <!--		<view class="kg_l">大额提现(单笔5万以上）</view>-->
    <!--		<switch  style="transform:scale(0.7)" @change="judge"/>            -->
    <!--      </view>-->

    <view class="txfy">
      <!--        <view class='txfy_01'>-->
      <!--          <view class='txfy_01_l'>提现费用:</view>-->
      <!--          <view class='txfy_01_r'>{{withdrawalFee|priceFormat(2)}}元（每月首次免费）</view>-->
      <!--        </view>-->
      <view class="txfy_02">
        <view class="txfy_02_l">预计到账时间</view>
        <view class="txfy_02_r">当日到账</view>
      </view>
    </view>
    <view class="btn" @click="toWithdrawal">提现</view>
  </view>
</template>

<script>
import {
  getUserAccountApi,
  withdrawalApi,
  getIsFirstApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";

export default {
  data() {
    return {
      checked: false, //开关
      card: "", //银行卡号
      user_money: 0, //可提现金额
      bank_addr: "", //可提现金额
      bank_account: "", //可提现金额
      withdrawal: "", //提现数值
      bankNo: "", //开户行行号
      withdrawalFee: "", //提现费用
      fee: "", //手续费比例
    };
  },
  computed: {},
  onShow() {
    toLogin();
    this.getInfo();
  },
  components: {},
  methods: {
    async getInfo() {
      const data = await getUserAccountApi({});
      this.user_money = data.data.account.user_money; //用户类型
    },
    judge: function (e) {
      if (e.target.value === true) {
        if (this.withdrawal < 50000) {
          uni.showToast({
            icon: "none",
            position: "bottom",
            title: "单笔提现数值小于50000！",
          });
          this.withdrawal = "";
        }
      }
    },
    async toWithdrawal() {
      if (this.user_money <= 0) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "余额不足，无法提现！",
        });
        return false;
      }

      if (
        this.card.length === "" ||
        this.card.length < 16 ||
        this.card.length > 19
      ) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "银行卡号不准确！",
        });
        this.card = "";
        return false;
      }
      if (this.bank_account == "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请填写开户行",
        });
        return false;
      }
      if (this.bank_addr == "") {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "请填写开户行地址",
        });
        return false;
      }

      if (this.withdrawal === "" || this.withdrawal > this.user_money) {
        uni.showToast({
          icon: "none",
          position: "bottom",
          title: "提现金额为空或金额不准确！",
        });
        this.withdrawal = "";
        return false;
      }

      let platform = "";

      // #ifdef MP-WEIXIN
      platform = "MP-WEIXIN";
      // #endif
      // #ifdef H5
      platform = "H5";
      // #endif
      // #ifdef APP-PLUS
      platform = "APP-PLUS";
      // #endif

      const getWithdrawal = await withdrawalApi({
        card: this.card,
        bank_account: this.bank_account,
        bank_addr: this.bank_addr,
        withdrawal: this.withdrawal,
        // bankNo: this.bankNo,
        withdrawalFee: this.withdrawalFee,
        platform: platform,
      });

      uni.showToast({
        icon: "none",
        position: "bottom",
        title: getWithdrawal.data.msg,
      });
      setTimeout(function () {
        uni.navigateTo({
          url: "/apiMember/agent/main",
        });
      }, 2000);
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
