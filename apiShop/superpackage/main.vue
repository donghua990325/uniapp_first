<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">超值礼包</block>
    </cu-custom>
    <div class="newgoods">
      <!-- <div class="banner">
      <img
        src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/newgoods-top.png"
        alt=""
      >
    </div> -->
      <!-- <div class="sortnav">
           <div
             @click="changeTab(0)"
             :class="[0==nowIndex ?'active':'']"
           >综合</div>
           <div
             @click="changeTab(1)"
             class="price"
             :class="[1==nowIndex ?activeClass:'']"
           >价格</div>
           <div
             @click="changeTab(2)"
             class="price"
             :class="[2==nowIndex ?activeClass:'']"
           >销量</div>
         </div> -->
      <div class="sortlist">
        <div v-for="(item, index) in listData" :key="index" class="item">
          <img :src="item.package_image" alt="" />
          <p class="name">{{ item.package_name }}</p>
          <p class="price">
            ￥{{ item.ext_info.package_price }}
            <span @click="goodsDetail(item.act_id)">购买</span>
          </p>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import {
  SuperPackageApi,
  goodsAddCartFastApi,
  AddPackageCartApi,
  cartCheckApi,
} from "@/server/config.js";
import { toLogin } from "@/server/api.js";

export default {
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.pagetotal) {
      return false;
    }
    this.getlistData();
  },
  created() {},
  onLoad(options) {
    this.isHot = options.isHot;
    this.isNew = options.isNew;
    this.id = options.id;
  },
  mounted() {
    if (this.isHot) {
      this.isHot = this.isHot;
    }
    if (this.isNew) {
      this.isNew = this.isNew;
    }
    this.id = this.id;
    if (this.id === undefined) {
      this.id = "";
    }
    this.getlistData(true);
  },
  data() {
    return {
      id: "",
      page: 1,
      order: "",
      isHot: "",
      isNew: "",
      nowIndex: 0,
      navData: ["综合", "价格", "分类"],
      listData: [],
      activeClass: "",
    };
  },
  components: {},
  methods: {
    async getlistData() {
      const data = await SuperPackageApi({
        page: this.page,
      });
      if (this.page == 1) {
        this.listData = data.data.info;
      }

      this.pagetotal = data.data.pagetotal;
      if (this.page > 1) {
        this.listData = this.listData.concat(data.data.info);
      }
    },

    async goodsDetail(id) {
      //判断是否登录，没有直接跳转登录界面
      toLogin();

      // const data = await AddPackageCartApi({
      //   goods_id: id,
      // });
      // console.log(data.data.data);
      // return  false;
      // if(data.data.data == true){
      uni.setStorageSync("superGoodsid", id);
      uni.navigateTo({
        url: "/apiCart/order/main?super=true",
      });

      // }else {
      //   uni.showToast({
      //     title: data.data.msg, //提示app/apiMember/coupon/main.vue
      //     icon: "none", //图标,
      //     duration: 2000, //延迟时间,
      //     mask: true, //显示透明蒙层，防止触摸穿透,
      //   });

      // }
      // return  false;
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>