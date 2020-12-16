<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content" style="display: flex; justify-content: center"
        >红包</block
      >
    </cu-custom>

    <view class="tabr" :style="{ top: headerTop }">
      <view :class="{ on: typeClass == 'valid' }" @tap="switchType('valid')"
        >可用</view
      >
      <view :class="{ on: typeClass == 'invalid' }" @tap="switchType('invalid')"
        >已失效</view
      >
      <view class="border" :class="typeClass"></view>
    </view>
    <view class="place"></view>
    <view class="list">
      <!-- 优惠券列表 -->
      <view class="sub-list valid" :class="subState">
        <view class="tis" v-if="couponList.length == 0">没有数据~</view>
        <view class="row" v-for="(row, index) in couponList" :key="index">
          <!-- 删除按钮 -->
          <view class="menu" @tap.stop="deleteCoupon(row.bonus_id, couponList)">
            <view class="icon shanchu">删除</view>
          </view>
          <!-- content -->
          <view
            class="carrier"
            :class="[
              typeClass == 'valid'
                ? theIndex == index
                  ? 'open'
                  : oldIndex == index
                  ? 'close'
                  : ''
                : '',
            ]"
            @touchstart="touchStart(index, $event)"
            @touchmove="touchMove(index, $event)"
            @touchend="touchEnd(index, $event)"
          >
            <view class="left">
              <view class="title">{{ row.type_name }}</view>
              <view class="term"
                >最小商品金额为:{{ row.min_goods_amount }}元</view
              >
              <view class="term"
                >{{ row.use_start_date }} ~ {{ row.use_end_date }}</view
              >
              <view class="gap-top"></view>
              <view class="gap-bottom"></view>
            </view>
            <view class="right">
              <view class="ticket">
                <view class="num">{{ row.type_money }}</view>
                <view class="unit">元</view>
              </view>
              <view class="criteria"></view>
              <view
                v-if="is_order == 'y'"
                @click="
                  use(
                    row.bonus_id,
                    row.type_name,
                    row.type_money,
                    row.min_goods_amount
                  )
                "
                class="use"
                >去使用</view
              >
              <view v-else class="use">未失效</view>
            </view>
          </view>
        </view>
      </view>
      <view class="sub-list invalid" :class="subState">
        <view class="tis" v-if="couponList.length == 0">没有数据~</view>
        <view class="row" v-for="(row, index) in couponList" :key="index">
          <!-- 删除按钮 -->
          <view class="menu" @tap.stop="deleteCoupon(row.bonus_id, couponList)">
            <view class="icon shanchu">删除</view>
          </view>
          <!-- content -->
          <view
            class="carrier"
            :class="[
              typeClass == 'invalid'
                ? theIndex == index
                  ? 'open'
                  : oldIndex == index
                  ? 'close'
                  : ''
                : '',
            ]"
            @touchstart="touchStart(index, $event)"
            @touchmove="touchMove(index, $event)"
            @touchend="touchEnd(index, $event)"
          >
            <view class="left">
              <view class="title">{{ row.type_name }}</view>
              <view class="term"
                >最小商品金额为:{{ row.min_goods_amount }}元</view
              >
              <view class="term"
                >{{ row.use_start_date }} ~ {{ row.use_end_date }}</view
              >
              <view class="icon shixiao"></view>
              <view class="gap-top"></view>
              <view class="gap-bottom"></view>
            </view>
            <view class="right invalid">
              <view class="ticket">
                <view class="num">{{ row.type_money }}</view>
                <view class="unit">元</view>
              </view>
              <view class="criteria"></view>
              <view class="use">已失效</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { toLogin } from "@/server/api.js";
import { couponListApi, deleteCouponApi } from "@/server/config.js";
export default {
  onLoad(options) {
    this.money = options.money;
    this.order = options.order;
    //兼容H5下排序栏位置
    // #ifdef H5
    //定时器方式循环获取高度为止，这么写的原因是onLoad中head未必已经渲染出来。
    let Timer = setInterval(() => {
      let uniHead = document.getElementsByTagName("uni-page-head");
      if (uniHead.length > 0) {
        this.headerTop = uniHead[0].offsetHeight + "px";
        clearInterval(Timer); //清除定时器
      }
    }, 1);
    // #endif
  },
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();
    this.getCouponList();
    if (this.order) {
      // 确认从订单页面过来
      this.is_order = this.order;
      this.costItem = this.money;
    }
  },
  data() {
    return {
      couponList: [],
      // #ifdef H5
      headerTop: "50px",
      // #endif
      // #ifdef MP
      headerTop: "9%",
      // #endif
      // #ifdef APP-PLUS
      headerTop: "10%",
      // #endif
      //控制滑动效果
      typeClass: "valid",
      subState: "showvalid",
      theIndex: null,
      oldIndex: null,
      isStop: false,
      may_use: 0, // 可使用的数量
      failure: 0, // 已失效的数量
      is_order: "n", // 是否从订单页面过来
      costItem: "", // 订单金额
      page: 1, // 当前的页数
    };
  },
  onPageScroll(e) {},
  //下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: {
    // 点击去使用
    use(id, type_name, type_money, min_money) {
      //id为红包id
      if (Number(this.costItem) < min_money) {
        uni.showToast({
          title: "不满足红包使用条件", //提示的内容,
          duration: 2000, //延迟时间,
          icon: "none",
          mask: true, //显示透明蒙层，防止触摸穿透,
          success: (res) => {},
        });
        return false;
      }
      uni.setStorageSync("bonus_id", id); // 记录红包id
      uni.setStorageSync("bonusName", type_name); // 记录红包名称
      uni.setStorageSync("bonusMoney", type_money); // 记录红包金额
      uni.navigateBack({
        url: "/apiCart/order/main",
      });
    },
    async getCouponList(tyep) {
      const data = await couponListApi({
        status: this.subState,
        openId: this.openId,
        page: this.page,
      });

      this.couponList = data.data.bonus;
      this.may_use = data.data.showvalid;
    },
    switchType(type) {
      if (this.typeClass == type) {
        return;
      }
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
      });
      this.typeClass = type;
      this.subState = this.typeClass == "" ? "" : "show" + type;
      setTimeout(() => {
        this.oldIndex = null;
        this.theIndex = null;
        this.subState = this.typeClass == "valid" ? "" : this.subState;
      }, 200);
      this.getCouponList(type);
    },
    //控制左滑删除效果-begin
    touchStart(index, event) {
      //多点触控不触发
      if (event.touches.length > 1) {
        this.isStop = true;
        return;
      }
      this.oldIndex = this.theIndex;
      this.theIndex = null;
      //初始坐标
      this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
    },
    touchMove(index, event) {
      //多点触控不触发
      if (event.touches.length > 1) {
        this.isStop = true;
        return;
      }
      let moveX = event.touches[0].pageX - this.initXY[0];
      let moveY = event.touches[0].pageY - this.initXY[1];

      if (this.isStop || Math.abs(moveX) < 5) {
        return;
      }
      if (Math.abs(moveY) > Math.abs(moveX)) {
        // 竖向滑动-不触发左滑效果
        this.isStop = true;
        return;
      }

      if (moveX < 0) {
        this.theIndex = index;
        this.isStop = true;
      } else if (moveX > 0) {
        if (this.theIndex != null && this.oldIndex == this.theIndex) {
          this.oldIndex = index;
          this.theIndex = null;
          this.isStop = true;
          setTimeout(() => {
            this.oldIndex = null;
          }, 150);
        }
      }
    },

    touchEnd(index, $event) {
      //解除禁止触发状态
      this.isStop = false;
    },

    //删除商品
    async deleteCoupon(id, List) {
      const data = await deleteCouponApi({
        coupon_id: id,
      });
      if (data.data.msg == "suc") {
        let _this = this;
        uni.showToast({
          icon: "none",
          title: "删除成功",
          success: function () {
            setTimeout(function () {
              _this.getCouponList();
            }, 1000);
          },
        });
      }
      let len = List.length;
      for (let i = 0; i < len; i++) {
        if (id == List[i].id) {
          List.splice(i, 1);
          break;
        }
      }
      this.oldIndex = null;
      this.theIndex = null;
    },

    discard() {
      //丢弃
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>