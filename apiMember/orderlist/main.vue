<template>
  <view>
    <cu-custom
      bgColor="bg-white"
      :isBackHome="true"
    >
      <block slot="backText">返回</block>
      <block slot="content">订单列表</block>
    </cu-custom>
    <!-- 顶部导航 -->
    <view>
      <!-- 顶部导航 -->
      <view
        class="topTabBar"
        :style="{position:headerPosition}"
      >
        <view
          class="grid"
          v-for="(grid,tbIndex) in orderType"
          :key="tbIndex"
          @tap="showType(tbIndex)"
        >
          <view
            class="text"
            :class="[tbIndex==tabbarIndex?'on':'']"
          >{{grid}}</view>
        </view>
      </view>
      <!-- 考虑非APP端长列表和复杂的DOM使用scroll-view会卡顿，所以漂浮顶部选项卡使用page本身的滑动 -->
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
                <block v-if="row.type=='unpaid'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                  <view
                    class="default"
                    @tap="cancelOrder(row)"
                  >取消订单</view>
                  <view
                    class="pay"
                    @tap="toPayment(row.order_id)"
                  >去付款</view>
                </block>

                <block v-if="row.type=='back'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                </block>
                <block v-if="row.type=='5'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>

                  <view
                    class="default"
                    @click="goodsAfterSale(row.order_id)"
                    v-if="row.return_status ==' '"
                  >我要退货</view>
                  <view
                    class="default"
                    v-if="row.return_status =='wait'"
                  >售后审核中</view>
                  <view
                    class="default"
                    v-if="row.return_status =='error'"
                  >售后审核拒绝</view>
                  <view
                    class="default"
                    v-if="row.return_status =='succ'"
                  >通过已审核</view>

                </block>
                <block v-if="row.type=='unreceived'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                  <view
                    class="pay"
                    @tap="doReceive(row)"
                  >确认收货</view>
                </block>
                <block v-if="row.type=='received'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                </block>
				<block v-if="row.type=='spike'">
				  <view
				    class="default"
				    @tap="orderDetailGo(row.order_id)"
				  >查看详情</view>
				  <!-- <view class="default">评价</view> -->
				  <!-- <view class="pay" @click="onceAgain(row)">再次购买</view> -->
				</block>
				
				<block v-if="row.type=='pintuan'">
				  <view
				    class="default"
				    @tap="orderDetailGo(row.order_id)"
				  >查看详情</view>
				  <!-- <view class="default">评价</view> -->
				  <!-- <view class="pay" @click="onceAgain(row)">再次购买</view> -->
				</block>
				
                <block v-if="row.type=='completed'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                </block>
                <block v-if="row.type=='refunds'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                  <view class="default">查看进度</view>
                </block>
                <block v-if="row.type=='cancelled'">
                  <view
                    class="default"
                    @tap="orderDetailGo(row.order_id)"
                  >查看详情</view>
                  <view class="default">已取消</view>
                </block>

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
import {
  orderlistActionApi,
  cancelOrderApi,
  receiveOrderApi,
} from "@/server/config.js";
export default {
  onLoad(options) {
    this.tabbarIndex = options.status;
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    // if (this.status === "") {
    //   this.status = 0;
    // }
    // this.tabbarIndex = this.status;

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
      orderType: ["全部", "待付款", "待发货", "待收货", "待评价", "退换货"],
      //订单列表 演示数据
      orderList: [],
      list: [],
      tabbarIndex: 0,
      page: 1,
      total: "",
    };
  },
  //      onLoad(option) {
  // // this.status = options.status;
  //          //option为object类型，会序列化上个页面传递的参数
  //          console.log("option: " + JSON.stringify(option));
  //          let tbIndex = parseInt(option.status) + 1;
  //          //this.list = this.orderList[tbIndex];
  //          this.tabbarIndex = tbIndex;
  //          //兼容H5下排序栏位置
  //          // #ifdef H5
  //          let Timer = setInterval(() => {
  //              let uniHead = document.getElementsByTagName("uni-page-head");
  //              if (uniHead.length > 0) {
  //                  this.headerTop = uniHead[0].offsetHeight + "px";
  //                  clearInterval(Timer); //清除定时器
  //              }
  //          }, 1);
  //          // #endif
  //      },
  onPageScroll(e) {
    return;
    //兼容iOS端下拉时顶部漂移
    this.headerPosition = e.scrollTop >= 0 ? "fixed" : "absolute";
  },

  methods: {
    toPayment(id) {
      // 去付款
      uni.navigateTo({
        url: "/apiCart/pay/main?orderId=" + id,
      });
    },
    orderDetailGo(id) {
      uni.navigateTo({
        url: "/apiMember/orderdetail/main?id=" + id,
      });
    },
    // 售后服务
    goodsAfterSale(order_id) {
      uni.navigateTo({
        url: "/apiMember/aftersale/main?orderId=" + order_id,
      });
    },
    showType(tbIndex) {
      this.tabbarIndex = tbIndex;
      (this.page = 1),
        (this.list = []),
        (this.total = ""),
        //this.list = this.orderList[tbIndex];
        console.info(this.tabbarIndex);
      this.getOrderList(true);
    },
    cancelOrder(row) {
      console.info(row);
      uni.showModal({
        title: "取消订单",
        content: "确定取消此订单？",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            this.doCancelOrder(row.order_id);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    async doCancelOrder(order_id) {
      const data = await cancelOrderApi({
        openId: this.openId,
        page: this.page,
        order_id: order_id,
        member_id: this.member_id,
      });
      if (data.data.status === true) {
        this.getOrderList(true);
      }
    },
    onceAgain(goods_data) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + goods_data.goods_list[0].goods_id,
      });
    },
    showLogistics(row) {},
    async getOrderList(first) {
      /**
       * 0:全部
       * 1:待付款
       * 2:待发货
       * 3:待收货
       * 4:待评价
       * 5:退换货
       */
      const data = await orderlistActionApi({
        openId: uni.getStorageSync("openId"),
        page: this.page,
        status: this.tabbarIndex, //订单状态
        //   user_id: uni.getStorageSync("user_id")
      });
      // this.list=data.data.order_list
      console.info(data.data.order_list);
      this.total = data.data.pagetotal;
      console.log(this.total);
      if (first) {
        this.list = data.data.order_list;
      } else {
        this.list = this.list.concat(data.data.order_list);
      }

      // this.showType(this.tabbarIndex);
    },
    cancelOrder(row) {
      console.info(row);
      uni.showModal({
        title: "取消订单",
        content: "确定取消此订单？",
        success: (res) => {
          if (res.confirm) {
            console.log("用户点击确定");
            this.doCancelOrder(row.order_id);
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        },
      });
    },
    async doCancelOrder(order_id) {
      const data = await cancelOrderApi({
        openId: this.openId,
        page: this.page,
        order_id: order_id,
        member_id: this.member_id,
      });
      if (data.data.status === true) {
        this.getOrderList(true);
      }
    },

    async doReceive(first) {
      const data = await receiveOrderApi({
        openId: this.openId,
        order_id: first.order_id,
        page: this.page,
        status: this.tabbarIndex, //订单状态
      });
      first.type = "received";
      setTimeout(() => {
        uni.hideLoading();
        uni.showToast({
          title: "收货成功",
        });
        setTimeout(() => {
          uni.navigateTo({
            url: "/apiMember/orderlist/main?status=0",
          });
        }, 300);
      }, 700);
    },
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>