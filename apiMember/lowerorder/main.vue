<template>
  <view>
    <cu-custom
      bgColor="bg-white"
      :isBack="true"
    >
      <block slot="backText">返回</block>
      <block slot="content">下级订单列表</block>

    </cu-custom>
    <!-- 顶部导航 -->
    <view>

      <view class="order-list">
        <view class="list">
          <view
            class="row"
            v-if="total != 0"
            v-for="(row,index) in list"
            :key="index"
          >

            <view
              class="top"
              @click="orderDetailGo(row.order_id)"
            >
              <view class="order-num">订单编号:{{row.order_id}}</view>
              <view class="type">{{row.type_status}}</view>
			  
            </view>
			
            <view
              class="order-info"
              v-for="(item,j) in row.goods_list"
              :key="j"
            >
			
              <view class="left">
                <image :src="item.list_pic_url">
              </view>
              <view class="right">
                <view class="name">{{item.name}}</view>
                <view class="spec">{{item.spec}}</view>
              </view>
              <view class="price-number">
                <view class="price">￥{{item.price}}</view>
                <view class="number">*{{item.number}}</view>
              </view>
            </view>
            <view class="btns">
              <view class="bill">实付：￥{{row.total_amount}}</view>
              <view class="con">

               <view class="bill" v-if="row.promote_money">分成：￥{{row.promote_money}}  </view>
                <view class="bill" style="padding-left: 10px;" v-if="row.promote_integral">积分：{{row.promote_integral}}</view>
<!--                <block>-->
<!--                  <view class="default" @tap="orderDetailGo(row.order_id)" >查看详情</view>-->
<!--                </block>-->
              </view>
            </view>

          </view>
          <view
            class="onorder"
            v-if="total == 0"
          >
            <image :src="img_blank"></image>
            <view class="text">
              这里空空如也~~
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import { toLogin } from "@/server/api.js";
import { lowerCommissionApi } from "@/server/config.js";
import WatchButton from "../../components/watch-login/watch-button";
export default {
  components: { WatchButton },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.tabbarIndex = this.$root.$mp.query.status;
    this.user_id = this.$root.$mp.query.id;
    this.showType(this.tabbarIndex);
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getOrderList();
  },
  created() {},
  mounted() {
    // this.getOrderList(true);
  },
  data() {
    return {
      img_blank:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
      headerPosition: "",
      typeText: {
        unpaid: "等待付款",
        back: "等待发货",
        unreceived: "已发货",
        received: "等待评价",
        completed: "交易已完成",
        refunds: "退货中",
        cancelled: "订单已取消",
      },

      //订单列表 演示数据
      orderList: [],
      list: [],
      tabbarIndex: 0,
      page: 1,
      excelUrl: "",
      total: "",
    };
  },
  onLoad(option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log("option: " + JSON.stringify(option));
    let tbIndex = parseInt(option.tbIndex) + 1;
    this.tabbarIndex = tbIndex;
    //兼容H5下排序栏位置
    // #ifdef H5
    let Timer = setInterval(() => {
      let uniHead = document.getElementsByTagName("uni-page-head");
      if (uniHead.length > 0) {
        this.headerTop = uniHead[0].offsetHeight + "px";
        clearInterval(Timer); //清除定时器
      }
    }, 1);
    // #endif
  },
  onPageScroll(e) {
    return;
    //兼容iOS端下拉时顶部漂移
    this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
  },
  methods: {
    orderDetailGo(id) {
      uni.navigateTo({
        url: "/apiPromote/orderdetail/main?id=" + id,
      });
    },
    showType(tbIndex) {
      this.tabbarIndex = tbIndex;
      (this.page = 1),
        (this.list = []),
        (this.total = ""),
        this.getOrderList(true);
    },

    onceAgain(goods_data) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + goods_data.goods_list[0].goods_id,
      });
    },
    async getOrderList(first) {
      const data = await lowerCommissionApi({
        id: this.user_id,
        page: this.page,
      });
      this.total = data.data.pagetotal;
      if (first) {
        this.list = data.data.lowerorder;
      } else {
        this.list = this.list.concat(data.data.lowerorder);
      }
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>