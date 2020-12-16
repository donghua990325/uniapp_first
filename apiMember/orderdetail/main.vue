<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">订单详情</block>
    </cu-custom>
    <div class="container">
      <div class="order-bottom">
        <div class="address">
          <div class="t">
            <text
              class="name"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                height: 28rpx;
                white-space: nowrap;
              "
              >{{ orderInfo.consignee }}</text
            >
            <text class="mobile">{{ orderInfo.mobile }}</text>
          </div>
          <div class="b">{{ orderInfo.full_region + orderInfo.address }}</div>
        </div>
      </div>
      <div class="order-goods">
        <div class="h">
          <div class="label">
            订单号
            <span class>{{ orderInfo.order_sn }}</span>
          </div>
          <div class="status">{{ orderInfo.order_status_text }}</div>
        </div>
        <div class="goods">
          <div
            class="item"
            v-for="(item, index) of orderGoods"
            :key="item.id"
            :data-index="index"
          >
            <div class="img">
              <image :src="item.list_pic_url" @click="goodsDetail(item.id)" />
            </div>
            <div class="info">
              <div class="t">
                <text class="name" @click="goodsDetail(item.id)">{{
                  item.goods_name
                }}</text>
                <text class="number">*{{ item.number }}</text>
              </div>
              <div class="attr">{{ item.goods_specifition_name_value }}</div>
              <div class="price">￥{{ item.retail_price }}</div>
              <div
                class="judge"
                v-if="
                  orderInfo.order_status == '5' &&
                  orderInfo.shipping_status == '2' &&
                  item.judge == '0'
                "
                @click="goodsJudge(item.id, orderInfo.id)"
              >
                评价
              </div>
              <div class="judge" v-if="item.judge == '1'">已评价</div>
              <div class="judge" @click="getgoodsJudge(item.id)">查看评价</div>
            </div>
          </div>
          <div class="btn-group">
            <div
              class="service"
              v-if="
                orderInfo.return_status == 'wait' &&
                orderInfo.apply_for_status == 'true'
              "
            >
              售后审核中
            </div>

            <div
              class="service"
              v-if="
                orderInfo.return_status == 'error' &&
                orderInfo.apply_for_status == 'true'
              "
            >
              售后审核拒绝
            </div>

            <div
              class="service"
              v-if="
                orderInfo.return_status == 'succ' &&
                orderInfo.apply_for_status == 'true'
              "
            >
              审核已通过
            </div>

            <div
              class="service"
              v-if="
                orderInfo.order_status != '0' &&
                orderInfo.order_status != '1' &&
                orderInfo.order_status != '2' &&
                orderInfo.order_status != '4' &&
                orderInfo.apply_for_status == 'false'
              "
              @click="goodsAfterSale(orderInfo.order_sn)"
            >
              售后服务
            </div>
          </div>
        </div>
      </div>

      <div class="order-info">
        <div class="item-a">下单时间：{{ orderInfo.add_time }}</div>
        <div class="item-b">订单编号：{{ orderInfo.order_sn }}</div>
      </div>

      <div class="order-info" v-if="pintuan == '1'">
        <div class="pt_status">
          {{ pintuan_status }}
          <div class="portrait">
            <image class="portrait_acator" :src="avator"></image>
            <image
              v-if="pt_id != '0'"
              class="portrait_acator_pd"
              :src="avator"
            ></image>
          </div>
        </div>
      </div>

      <div class="order-bottom">
        <div class="total">
          <div v-if="orderInfo.extension_code != 'exchange_goods'" class="t">
            <text class="label">支付方式：</text>
            <text class="txt">{{ a.path }}</text>
          </div>
          <div v-if="orderInfo.extension_code == 'exchange_goods'" class="t">
            <text class="label">支付方式：</text>
            <text class="txt">积分兑换</text>
          </div>

          <div class="t">
            <text class="label">商品金额：</text>
            <text class="txt">￥+{{ a.goods_amount }}</text>
          </div>
          <div class="t">
            <text class="label">运费：</text>
            <text class="txt">￥+{{ a.deliver_cost }}</text>
          </div>
          <div class="t" v-if="a.bonus != '0.00'">
            <text class="label">红包：</text>
            <text class="txt">￥-{{ a.bonus }}</text>
          </div>
          <div class="t" v-if="a.pack_fee != '0.00'">
            <text class="label">包装费：</text>
            <text class="txt">￥+{{ a.pack_fee }}</text>
          </div>
          <div class="t" v-if="a.integral_money != '0.00'">
            <text class="label">积分抵扣：</text>
            <text class="txt">￥-{{ a.integral_money }}</text>
          </div>
          <div class="t" v-if="a.inv_type != ''">
            <text class="label">税额：</text>
            <text class="txt">￥+{{ a.tax }} ({{ a.inv_type }})</text>
          </div>
          <div class="t">
            <text class="label">订单合计：</text>
            <text class="txt">￥{{ a.cost }}</text>
          </div>
        </div>
      </div>
      <div
        @tap="logisticstrackGo(orderInfo.order_sn)"
        style="
          padding: 5px 8px;
          margin-top: -20px;
          margin-left: 5px;
          border: 0.5px solid #ccc;
          border-radius: 6px;
          color: #666;
          font-size: 13px;
          margin-right: 10px;
          float: right;
        "
      >
        物流跟踪
      </div>

      <!-- 后续开发这个 -->
      <!-- <div class="common-problem">
      <div class="h">
        <div class="line"></div>
        <text class="title">大家都在看</text>
        <div class="line"></div>
      </div>
      <div class="sublist">
        <div
          @click="togoodsDetail(subitem.id)"
          v-for="(subitem, subindex) in productList"
          :key="subindex"
        >
          <img
            :src="subitem.list_pic_url"
            alt=""
          >
          <p>{{subitem.name}}</p>
          <p>￥{{subitem.retail_price}}</p>
        </div>
      </div>
      </div>-->
    </div>
  </view>
</template>

<script>
import { orderdetailGetApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";

export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
  },
  data() {
    return {
      productList: [],
      orderId: 0,
      a: {
        path: "微信",
        cost: 500,
        deliver_cost: "免邮",
        discount: "36.8",
      },
      orderInfo: {},
      orderGoods: [],
      handleOption: {},
      pintuan: "0", // 默认不是拼团的订单
      avator:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png",
      pintuan_status: "",
      pt_id: "0",
    };
  },
  components: {},
  onLoad(opt) {
    this.orderId = opt.id;
    this.getOrderDetail();
  },
  async mounted() {},
  methods: {
    // 获取订单数据
    async getOrderDetail() {
      const res = await orderdetailGetApi({
        orderId: this.orderId,
      });
      this.orderInfo = res.data.orderInfo;
      this.orderGoods = res.data.orderGoods;
      this.handleOption = res.data.handleOption;
      this.a = res.data.a;
      if (res.data.orderInfo.order_type === "1") {
        this.pintuan = "1";
        this.pintuan_status = res.data.orderInfo.pintuan_status_text;
        this.pt_id = res.data.orderInfo.pt_id;
      }
      console.log(this.orderGoods);
      //   const res = await api.getOrderDetail({ orderId: this.orderId })
      //   // console.log('订单详情,请求结果', res);
      //   if (res.errno === 0) {
      //     this.orderInfo = res.data.orderInfo
      //     this.orderGoods = res.data.orderGoods
      //     this.handleOption = res.data.handleOption
      //     // this.payTimer();
      //   }
    },
    logisticstrackGo(id) {
      uni.redirectTo({
        url: "/apiUtil/logisticstrack/main?id=" + id,
      });
    },
    // 制作倒计时用的，暂时不需要
    payTimer() {
      let orderInfo = this.orderInfo;
      setInterval(() => {
        // console.log(orderInfo);
        orderInfo.add_time -= 1;
        this.orderInfo = orderInfo;
      }, 1000);
    },
    // 前往商品页
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id,
      });
    },
    // 前往商品评价
    goodsJudge(id, order_id) {
      uni.navigateTo({
        url: "/apiMember/judge/main?orderId=" + order_id + "&goodsId=" + id,
      });
    },
    //查看商品评价
    getgoodsJudge(id) {
      console.log(id);
      uni.navigateTo({
        url: "/apiShop/userjudge/main?id=" + id,
      });
    },
    // 售后服务
    goodsAfterSale(order_id) {
      uni.navigateTo({
        url: "/apiMember/aftersale/main?orderId=" + order_id,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
