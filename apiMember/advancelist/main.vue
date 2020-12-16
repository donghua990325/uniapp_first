<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">充值记录</block>
    </cu-custom>
    <div class="bill">
      <div
        class="order-info"
        v-if="count != 0"
        v-for="(item, index) of advanceList"
        :key="index"
      >
        <div class="left">
          <image :src="img_url"></image>
        </div>
        <div class="right">
          <div class="name">{{ item.mtime }}</div>
          <div class="spec">{{ item.message }}</div>
        </div>
        <div class="price-number">
          <!-- <div class="price">{{row.price}}</div> -->
          <div class="number">{{ item.do_money }}</div>
        </div>
      </div>
      <div class="onorder" v-if="count == 0">
        <image :src="img_blank"></image>
        <div class="text">这里空空如也~~</div>
      </div>
    </div>
  </view>
</template>

<script>
import { advancelistActionApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getAdvanceList(true);
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getAdvanceList();
  },
  created() {},
  mounted() {},
  data() {
    return {
      advanceList: [],
      count: 0,
      img_blank:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
      img_url:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/charge_icon.png",
      page: 1,
      total: "",
    };
  },
  methods: {
    async getAdvanceList(first) {
      const data = await advancelistActionApi({
        openId: this.openId,
        page: this.page,
      });
      this.total = data.data.pagetotal;
      console.log("当前页：" + this.total);
      if (first) {
        this.advanceList = data.data.data;
      } else {
        this.advanceList = this.advanceList.concat(data.data.data);
      }
      this.count = data.data.count;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
