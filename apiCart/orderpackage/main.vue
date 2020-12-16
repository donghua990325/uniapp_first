<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">商品包装</block>
    </cu-custom>
    <div class="container">
      <div class="pay-list">
        <div class="h">请商品包装</div>
        <div class="b">
          <div
            class="item"
            @click="tagVal(index)"
            :data-index="index"
            v-for="(item, index) in packageList"
            :key="index"
          >
            <div
              :class="[index === dtchecked ? 'checked checkbox' : 'checkbox']"
            ></div>
            <div class="name">{{ item.pack_name }}</div>
          </div>
        </div>
      </div>
      <div class="pay-btn" @click="startOrder">确定</div>
    </div>
  </view>
</template>

<script>
import { packageListApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getOrderpackage();
  },
  data() {
    return {
      dtchecked: 0,
      package: [],
      packageList: "",
    };
  },
  async mounted() {},
  onLoad(options) {
    this.ral = options.ral;
    this.superpack = options.superpack;
  },
  methods: {
    // 点击确定
    async startOrder() {
      //存配送包装信息
      this.package = {
        pack_id: this.packageList[this.dtchecked].pack_id,
        pack_name: this.packageList[this.dtchecked].pack_name,
        pack_fee: this.packageList[this.dtchecked].pack_fee,
        free_money: this.packageList[this.dtchecked].free_money,
      };

      uni.setStorageSync("package", this.package);
      if (this.ral) {
        uni.navigateBack({ url: "/apiCart/order/main?ral=true" });
      } else if (this.superpack) {
        uni.navigateBack({ url: "/apiCart/order/main?super=true" });
      } else {
        uni.navigateBack({ url: "/apiCart/order/main" });
      }
    },
    async tagVal(iIndex) {
      this.dtchecked = iIndex;
    },
    async getOrderpackage() {
      const data = await packageListApi({});
      this.packageList = data.data;
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>