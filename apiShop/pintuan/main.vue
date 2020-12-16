<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">拼团列表</block>
    </cu-custom>
    <div class="container">
      <div class="order-goods">
        <div class="h">
          <div class="label">
            拼单商品
            <span class="status"></span>
          </div>
          <div class="status"></div>
        </div>
        <div class="goods">
          <div class="item">
            <div class="img">
              <image
                :src="goods_data.goods_thumb"
                @click="goodsDetail(goods_data.goods_id)"
              />
            </div>
            <div class="info">
              <div class="t">
                <text class="name" @click="goodsDetail(goods_data.goods_id)">{{
                  goods_data.goods_name
                }}</text>
                <!-- <text class="number">*1</text> -->
              </div>
              <div class="attr"></div>
              <div class="price">拼团价：￥{{ goods_data.pt_price }}</div>
              <div class="price">销售价：￥{{ goods_data.shop_price }}</div>
            </div>
          </div>
          <div class="btn-group"></div>
        </div>
      </div>
      <div class="pintuanitem">
        <div class="item" v-for="(item, index) in list" :key="index">
          <image class="portrait" v-if="item.avator" :src="item.avator"></image>
          <image class="portrait" v-if="!item.avator" :src="avator"></image>
          <div class="name">{{ item.consignee }}</div>
          <!-- <div class="time">{{item.add_time|timeFormat()}}</div> -->
          <div class="time">
            <uni-countdown
              color="#FFFFFF"
              background-color="#00B26A"
              border-color="#00B26A"
              :show-day="true"
              :hour="item.hour"
              :minute="item.min"
              :second="item.sec"
            >
            </uni-countdown>
          </div>
          <div class="pd" @click="pindan(item.order_id)">去拼单</div>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import { pintuanListApi } from "@/server/config.js";
import uniCountdown from "@/components/linnian-CountDown/uni-countdown.vue";
export default {
  onLoad(options) {
    this.id = options.id;
    this.status = options.status;
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    // toLogin();

    this.tabbarIndex = this.status;
    // this.showType(this.tabbarIndex);
    this.goodsList();
  },
  onReachBottom() {
    this.page = this.page + 1;
    console.log(this.pagetotal);
    console.log(this.page);
    if (this.page > this.pagetotal) {
      return false;
    }
    this.goodsList();
  },
  // onLoad() {
  //     this.goodsList();
  // },

  data() {
    return {
      orderType: ["进行中", "即将开始", "已结束"],
      headerPosition: "fixed",
      allnumber: 0,
      page: 1,
      pagetotal: "",
      tabbarIndex: 0,
      // #ifdef H5 || MP
      headerTop: "6%",
      // #endif
      // #ifdef APP-PLUS
      headerTop: "8%",
      // #endif
      id: "",
      list: [],
      goods_data: "",
      pagetotal: 1,
      avator:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png",
    };
  },
  components: {
    uniCountdown,
  },
  computed: {},
  methods: {
    // 前往商品页
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + this.id,
      });
    },
    // 去拼单
    pindan(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + this.id + "&order_id=" + id,
      });
    },
    async goodsList() {
      const data = await pintuanListApi({
        goods_id: this.id,
        page: this.page,
      });
      this.goods_data = data.data.goods_data;
      this.pagetotal = data.data.pagetotal;
      console.log(this.pagetotal);
      if (this.page > 1) {
        this.list = this.list.concat(data.data.pt_list);
      } else {
        this.list = data.data.pt_list;
      }
      // this.allnumber = data.total;
      // this.pagetotal = data.pagetotal;
    },

    showType(tbIndex) {
      this.page = 1;
      this.tabbarIndex = tbIndex;
      this.goodsList();
    },
    showTypePage(tbIndex) {
      this.tabbarIndex = tbIndex;
      this.goodsList();
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>