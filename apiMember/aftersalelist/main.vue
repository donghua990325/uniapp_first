<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">售后列表</block>
    </cu-custom>
    <view class="order-list">
      <view class="list">
        <view
          class="row"
          v-if="total != 0"
          v-for="(row, index) in list"
          :key="index"
        >
          <view class="top">
            <view class="order-num">订单编号:{{ row.order_id }}</view>
            <view class="type">{{ row.type_status }}</view>
          </view>
          <view class="order-info">
            <view class="right">
              <view class="name">{{ row.return_id }}</view>
              <view class="spec">{{ row.add_time }}</view>
            </view>
            <view class="return-info">
              <view class="name">{{ row.title }}</view>
              <view class="spec">{{ row.content }}</view>
            </view>
          </view>
          <view class="order-info" v-for="(item, j) in row.goods_list" :key="j">
            <view class="left">
              <image :src="item.list_pic_url"></image>
            </view>
            <view class="right">
              <view class="name">{{ item.name }}</view>
            </view>
            <view class="price-number">
              <view class="price">￥{{ item.price }}</view>
              <view class="number">*{{ item.number }}</view>
            </view>
          </view>
        </view>
        <view class="onorder" v-if="total == 0">
          <image :src="img_blank"></image>
          <view class="text"> 这里空空如也~~ </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { toLogin } from "@/server/api.js";
import { aftersalelistActionApi } from "@/server/config.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getOrderList();
  },
  data() {
    return {
      img_blank:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
      headerPosition: "fixed",
      headerTop: "0px",
      total: 0,
      orderList: [],
      list: [],
      tabbarIndex: 0,
      page: 1,
    };
  },
  onLoad(option) {},
  onapiCartroll(e) {
    return;
    //兼容iOS端下拉时顶部漂移
    this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
  },
  methods: {
    //订单详情
    orderDetailGo(id) {
      uni.navigateTo({
        url: "/apiMember/orderdetail/main?id=" + id,
      });
    },
    aftersaleDeliveryGo(id) {
      uni.navigateTo({
        url: "/apiMember/aftersaledelivery/main?id=" + id,
      });
    },
    //售后
    aftersaleGo(id) {
      uni.navigateTo({
        url: "/apiMember/aftersale/main?id=" + id,
      });
    },
    //售后
    aftersaleDeliveryGo(id) {
      uni.navigateTo({
        url: "/apiMember/aftersaledelivery/main?id=" + id,
      });
    },
    async getOrderList() {
      const data = await aftersalelistActionApi({
        page: this.page,
        user_id: uni.getStorageSync("user_id"),
      });
      this.list = data.data.order_list;
      this.total = data.data.pagetotal;
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>