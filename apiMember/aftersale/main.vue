<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">售后申请</block>
    </cu-custom>
    <div class="container">
      <div class="reback-addr top">
        <text class="name">请选择服务</text>
      </div>
      <div class="check-box">
        <view class="uni-list">
          <radio-group>
            <label
              class="uni-list-cell uni-list-cell-pd"
              v-for="(item, index) in items"
              :key="item.value"
            >
              <radio
                :value="item.value"
                :checked="index === current"
                @click="tagVal(item.value)"
              />{{ item.name }}
            </label>
          </radio-group>
        </view>
      </div>
      <div class="order-goods">
        <div class="goods">
          <div class="item" v-for="(item, index) in orderGoods" :key="item.id">
            <div
              class="icon"
              @click="changeColor(index, item.id, item)"
              :class="[Listids[index] ? 'active' : '']"
            ></div>
            <div class="img">
              <image :src="item.list_pic_url" />
            </div>
            <div class="info">
              <div class="t">
                <text class="name">{{ item.goods_name }}</text>
              </div>
              <div class="mid">
                <div class="left">
                  <div class="attr">
                    {{ item.goods_specifition_name_value }}
                  </div>
                  <div class="price">￥{{ item.retail_price }}</div>
                </div>
                <div class="right">
                  <span
                    @click="countGoodsNumber(item, false)"
                    :class="{ disabled: item.number === 1 }"
                    >-</span
                  >
                  <input
                    type="number"
                    v-model="item.number"
                    disabled="disabled"
                  />
                  <span @click="countGoodsNumber(item, true)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="reback-info">
        <div class="titles" @click="showList" :class="[show ? 'active' : '']">
          请选择原因
          <span class="note">
            <div v-if="title == ''">请选择原因</div>
            <div v-else>{{ title }}</div>
            <img
              src="https://res.jinjiajin.net/vue-wx/images/address_right.png"
              class="right"
              :class="[show ? 'active' : '']"
            />
          </span>
        </div>
        <div
          class="coupon-lists"
          v-if="show"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="li" @click="selectList(item)">{{ item }}</div>
        </div>
        <div class="desc">
          <textarea
            style="display: block"
            name
            id
            cols="100%"
            rows="3"
            v-model="content"
            placeholder="为了尽快处理您的申请，请填写详细描述（10-300字）"
          ></textarea>
        </div>
      </div>
      <div class="btn-group">
        <div class="cancle" @click="submitAfterSale()">提交</div>
      </div>
    </div>
  </view>
</template>

<script>
import {
  orderdetailGetApi,
  cartCheckApi,
  aftersaleGetDetailApi,
  submitAfterSaleApi,
  aftersaleAddApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onLoad(options) {
    this.orderId = options.orderId;
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.orderId = this.orderId;
  },
  data() {
    return {
      list: [
        //下拉款要展示的数据
        "拍错了，重拍",
        "不想要了",
        "型号不对",
      ],
      items: [
        {
          //服务选择
          value: "仅退款",
          name: "仅退款",
        },
        {
          value: "退货退款",
          name: "退货退款",
          checked: "true",
        },
      ],
      i: 0,
      Listids: [],
      current: 0,
      notice: "为了尽快处理你的售后申请，请填写详细描述（10-300字）",
      value: "",
      productList: [],
      orderId: 0,
      user: {
        name: "张三",
        tel: 13888886666,
      },
      orderInfo: {},
      orderGoods: [],
      handleOption: {},
      orderId: "",
      afterType: "仅退款",
      goods_active: "false",
      title: "",
      content: "",
      goods_id: "",
      show: false,
    };
  },
  components: {},
  async mounted() {
    if (this.$mp.query.id) {
      this.orderId = parseInt(this.$mp.query.id);
    }
    this.getOrderDetail();
  },
  methods: {
    showList() {
      if (this.show == true) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    selectList(item) {
      this.title = item;
      this.show = false;
    },
    changeMsg(event) {
      this.title = event.newVal;
    },
    tagVal(value) {
      this.afterType = value;
    },
    goods_Id(value) {
      alert(value);
      this.goods_id = value;
    },
    // 获取订单数据
    async getOrderDetail() {
      //下面订单编号写死了
      const res = await orderdetailGetApi({
        orderId: this.orderId,
      });
      this.orderInfo = res.data.orderInfo;
      this.orderGoods = res.data.orderGoods;
      this.goods_id = this.orderGoods[0].id;
      this.handleOption = res.data.handleOption;
    },
    // 商品数量加减
    async countGoodsNumber(goods, flag) {
      console.log(goods);
      const num = goods.number;
      if (flag) {
        goods.number++;
        if (goods.number > num) {
          uni.showToast({
            title: "不能超过最大商品数量",
            icon: "none",
            duration: 1500,
          });
          goods.number--;
        }
      } else {
        if (goods.number <= 1) {
          uni.showToast({
            title: "最少选择一件商品",
            icon: "none",
            duration: 1500,
          });

          goods.number = 1;
          return;
        }
        goods.number--;
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
    async submitAfterSale() {
      if (this.goods_active == "false") {
        uni.showToast({
          title: "请选择商品",
          icon: "none",
          duration: 1500,
          mask: true,
          success: (res) => {},
        });
        return false;
      }
      if (this.content === "" || this.title === "") {
        uni.showToast({
          title: "请填写申请原因/申请内容",
          icon: "none",
          duration: 1500,
          mask: true,
          success: (res) => {},
        });
        return false;
      }
      let goods_id = [];
      let goods_num = [];
      for (let i = 0; i < this.orderGoods.length; i++) {
        if (this.orderGoods[i].is_checked) {
          goods_id += +this.orderGoods[i].id + ",";
          goods_num += this.orderGoods[i].number + ",";
        }
      }
      const data = await submitAfterSaleApi({
        orderId: this.orderId,
        note: "[" + this.afterType + " " + this.title + "]" + this.content,
        user_id: uni.getStorageSync("user_id"),
        goods_id: goods_id,
        goods_num: goods_num,
      });
      console.log(data.data.status);
      if (data.data.status == "succ") {
        uni.showToast({
          title: "申请成功",
          icon: "none",
          duration: 1500,
        });
        uni.navigateTo({
          url: "/apiMember/orderlist/main?status=0",
        });
      } else {
        uni.showToast({
          title: data.data.message,
          icon: "none",
          duration: 1500,
        });
      }
    },
    async changeColor(index, id, item) {
      console.log(index);
      if (this.Listids[index]) {
        this.$set(this.Listids, index, false);
        item.is_checked = "false";
        this.goods_active = "false";
      } else {
        this.$set(this.Listids, index, id);
        item.is_checked = "true";
        this.goods_active = "true";
      }
    },
    toaddrpage() {
      uni.navigateTo({
        url: "/apiCart/address/main",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>