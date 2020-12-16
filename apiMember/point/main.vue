<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">积分</block>
    </cu-custom>
    <div class="bill">
      <div
        class="order-info"
        v-if="allnumber != 0"
        v-for="(item, index) of pointList"
        :key="index"
      >
        <div class="left">
          <image :src="img_url"></image>
        </div>
        <div class="right">
          <div class="name">{{ item.addtime }}</div>
          <div class="spec">{{ item.reason }}</div>
        </div>
        <div class="price-number">
          <div class="number">{{ item.change_point }}</div>
        </div>
      </div>
      <div class="onorder" v-if="allnumber == 0">
        <image :src="img_blank"></image>
        <div class="text">这里空空如也~~</div>
      </div>
    </div>
  </view>
</template>

<script>
import { toLogin } from "@/server/api.js";
import { pointListApi } from "@/server/config.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getPointList(true);
  },
  // onPullDownRefresh() {
  //   setTimeout(function () {
  //     uni.stopPullDownRefresh();  //停止下拉刷新动画
  //   }, 1000);
  //   this.page = this.page - 1;
  //   if(this.page ==0){
  //     this.page = 1;
  //   }
  //   this.getPointList(true);
  // },
  onReachBottom() {
    this.page = this.page + 1;
    console.log(this.page);
    if (this.page > this.total) {
      return false;
    }
    this.getPointList();
  },
  created() {},
  mounted() {},
  data() {
    return {
      pointList: [],
      allnumber: 0,
      page: 1,
      img_url:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/charge_icon.png",
      img_blank:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
      total: "",
    };
  },
  methods: {
    async getPointList(first) {
      const data = await pointListApi({
        openId: this.openId,
        page: this.page,
      });
      this.pointList = data.data.data;
      this.allnumber = data.data.a;
      this.total = data.data.pagetotal;
      if (first) {
        this.pointList = data.data.data;
        console.log("数据" + this.pointList);
      } else {
        this.pointList = this.pointList.concat(data.data.data);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
