<template>
  <view class="agent">
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">推广统计人数</block>
    </cu-custom>
    <view class="head">
      共 <span>{{ num }}</span> 人 <br />
      <p @click="cash">去提现 >></p>
    </view>
    <view class="t_tou">
      <view class="tou_1">注册时间</view>
      <view class="tou_1">用户名</view>
      <view class="tou_1">等级</view>
    </view>
    <view class="t">
      <block v-for="(item, index) of cycle_2" :key="index">
        <li class="t_01" @click="jump(item.user_id)">
          <!--				<view class="t_01_1"> <img :src="item.user_pic"></img> </view>-->
          <!--				<view class="t_01_1"> <img src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/missing-face.png"></img> </view>-->
          <view class="t_01_1">{{ item.reg_time }}</view>
          <view class="t_01_1">{{ item.user_name }}</view>
          <view class="t_01_1">{{ item.level }}</view>
        </li>
      </block>
    </view>
    <view class="t">
      <block v-for="(item, index) of cycle_3" :key="index">
        <li class="t_01" @click="jump(item.user_id)">
          <!--				<view class="t_01_1"> <img :src="item.user_pic"></img> </view>-->
          <view class="t_01_1">{{ item.reg_time }}</view>
          <view class="t_01_1">{{ item.user_name }}</view>
          <view class="t_01_1">{{ item.level }}</view>
        </li>
      </block>
    </view>
    <view class="onorder" v-if="num == 0">
      <image :src="img_blank"></image>
      <view class="text"> 这里空空如也~~ </view>
    </view>
  </view>
</template>

<script>
import { getPromoteNumApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      img_blank:
        "https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
      num: "", //推广人数
      cycle_2: "", //获取的api返回数据的第几层，例level_2,level_3
      cycle_3: "", //
      page: 1, //
    };
  },
  onShow() {
    toLogin();
    this.getInfo(false);
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.num) {
      return false;
    }
    this.getInfo(true);
  },
  methods: {
    async getInfo(first) {
      const data = await getPromoteNumApi({
        page: this.page,
      });
      if (first === false) {
		  console.log(data);
        this.cycle_2 = data.data.level_2;
      } else {
        this.cycle_2 = this.cycle_2.concat(data.data.level_2);
      }
      this.num = data.data.num;
    },
    jump(user_id) {
      uni.navigateTo({
        url: "/apiMember/lowerorder/main?id=" + user_id,
      });
    },
    cash() {
      uni.navigateTo({
        url: "/apiMember/cash/main",
      });
    },
  },
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
