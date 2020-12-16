<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">配送时间</block>
    </cu-custom>
    <div class="container">
      <div class="pay-list">
        <div class="h">请选择配送时间(当日有效)</div>
        <div class="b">
          <div
            class="item"
            @click="tagVal(index)"
            :data-index="index"
            v-for="(item, index) in packageList"
            :key="index"
          >
            <div
              :class="[index == dtchecked ? 'checked checkbox' : 'checkbox']"
            ></div>
            <div class="name">{{ item.o_time }}</div>
          </div>
        </div>
      </div>
      <div class="pay-btn" @click="startOrder">确定</div>
    </div>
  </view>
</template>

<script>
import { GetDeliveryTimeApi, DeliveryTimeApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getOrderDeliveryAPi();
  },
  data() {
    return {
      dtchecked: 0,
      package: [],
      packageList: "",
    };
  },
  onLoad(options) {
    this.ral = options.ral;
    this.superpack = options.superpack;
  },
  async mounted() {},
  methods: {
    // 点击确定
    async startOrder() {
      //存配送包装信息
      this.delivery = {
        delivery_id: this.packageList[this.dtchecked].id,
        o_time: this.packageList[this.dtchecked].o_time,
      };
      uni.setStorageSync("delivery", this.delivery);
      const data = await DeliveryTimeApi({
        delivery_id: this.packageList[this.dtchecked].id,
      });
      if (data.data.status == "fail") {
        uni.showToast({
          title: data.data.message,
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      uni.setStorageSync("order_delivery", this.delivery);
      if (this.ral) {
        uni.navigateBack({ url: "/apiCart/order/main?ral=true" });
      } else if (this.superpack) {
        uni.navigateBack({ url: "/apiCart/order/main?super=true" });
      } else {
        uni.navigateBack({ url: "/apiCart/order/main" });
      }

      uni.setStorageSync("package", this.package);
      // uni.redirectTo({ url: "/apiCart/order/main" });
    },
    async tagVal(iIndex) {
      this.dtchecked = iIndex;
    },
    async getOrderDeliveryAPi() {
      const data = await GetDeliveryTimeApi({});
      this.packageList = data.data;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>