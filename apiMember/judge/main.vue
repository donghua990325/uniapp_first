<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">商品评价</block>
    </cu-custom>
    <div class="container">
      <div class="order-goods">
        <div class="goods">
          <div class="item">
            <div class="img">
              <image :src="orderGoods.list_pic_url" />
            </div>
            <div class="info">
              <div class="t">
                <text class="name">{{ orderGoods.goods_name }}</text>
                <!-- <text class="name">如果是则关闭所有打开的微信开发者工具，然后再重</text> -->
                <text class="number">*{{ orderGoods.number }}</text>
              </div>
              <div class="attr">
                {{ orderGoods.goods_specifition_name_value }}
              </div>
              <!-- <div class="attr">启动多个微信开发者</div> -->
              <div class="price">￥{{ orderGoods.retail_price }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="reback-addr">
        <text class="name">物流服务评价</text>
      </div>
      <div class="judge-star">
        <div class="box">
          <div class="left">物品评价</div>
          <div class="right">
            <uni-rate
              v-model="comment_rank"
              size="18"
              value="5"
              ref="uniRate"
            ></uni-rate>
          </div>
        </div>
      </div>
      <div class="reback-addr">
        <text class="name">分享你的使用体验吧</text>
      </div>
      <div class="reback-info">
        <div class="desc">
          <textarea
            v-model="comment"
            name="true"
            id
            cols="100%"
            rows="3"
            placeholder="感觉怎么样？跟大家分享一下吧~~"
          ></textarea>
        </div>
      </div>
      <view class="cu-form-group margin-top">
        <view class="title">匿名评价</view>
        <switch
          @change="checkboxChange"
          :class="anonymous ? 'checked' : ''"
          :checked="anonymous ? true : false"
        ></switch>
      </view>
      <div class="btn-group">
        <div class="cancle" @tap="addComment()">提交</div>
      </div>
    </div>
  </view>
</template>

<script>
import {
  goodsdetailGetApi,
  cartCheckApi,
  addGoodsCommentApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";
import uniRate from "@/components/uni-rate/uni-rate.vue";
export default {
  onLoad(options) {
    this.goodsId = options.goodsId;
    this.orderId = options.orderId;
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    this.goodsId = this.goodsId;
    this.orderId = this.orderId;
    toLogin();
  },
  mounted() {
    this.goodsId = this.goodsId;
    this.orderId = this.orderId;
    console.log("获取到" + this.goodsId + "----" + this.orderId);
    this.getGoodsDetail();
  },
  components: { uniRate },
  data() {
    return {
      orderGoods: [],
      productList: [],
      orderId: "",
      orderInfo: {},
      handleOption: {},
      goodsId: "",
      comment_rank: "5",
      comment: "",
      anonymous: true,
    };
  },
  async mounted() {
    if (this.$mp.query.id) {
      this.orderId = parseInt(this.$mp.query.id);
    }
    this.getGoodsDetail();
  },
  methods: {
    // 获取订单数据
    async getGoodsDetail() {
      //下面订单编号写死了
      const res = await goodsdetailGetApi({
        orderId: this.orderId,
        goodsId: this.goodsId,
      });
      this.orderGoods = res.data;
      this.handleOption = res.data.handleOption;
    },
    // 评论
    async addComment() {
      const res = await addGoodsCommentApi({
        orderId: this.orderId,
        goodsId: this.goodsId,
        comment: this.comment,
        comment_rank: this.$refs.uniRate.valueSync,
        anonymous: this.anonymous,
      });
      console.log(res.data);
      console.log(res.data.status);
      if (res.data.status == true) {
        uni.redirectTo({
          // 防止回退到评价页面再次评价的问题
          url: "/apiMember/orderlist/main?status=4",
        });
      }
    },
    // 制作倒计时用的，暂时不需要
    payTimer() {
      let orderInfo = this.orderInfo;
      setInterval(() => {
        orderInfo.add_time -= 1;
        this.orderInfo = orderInfo;
      }, 1000);
    },
    checkboxChange(e) {
      this.anonymous = e.mp.detail.value;
    },
    async changeColor(index, id) {
      if (this.Listids[index]) {
        this.$set(this.Listids, index, false);

        const data = await cartCheckApi({
          id: this.listData[index].id,
          ischecked: 0,
        });
        this.allPrise = data.totalPrice;
      } else {
        this.$set(this.Listids, index, id);

        const data = await cartCheckApi({
          id: this.listData[index].id,
          ischecked: 1,
        });
        this.allPrise = data.totalPrice;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
@import "./style";
</style>
