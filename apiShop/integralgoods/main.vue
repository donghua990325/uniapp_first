<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">积分商品列表</block>
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
        <div
          @click="goodsDetail(item.goods_id)"
          v-for="(item, index) in listData"
          :key="index"
          class="item"
        >
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.goods_name }}</p>
          <p class="price">{{ item.exchange_integral }}积分</p>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import { integralgoodsGoodsListApi } from "@/server/config.js";

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
      const data = await integralgoodsGoodsListApi({
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
    changeTab(index) {
      this.nowIndex = index;
      if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
        this.isHot = "";
        this.page = 1;
        this.activeClass == "";
        this.activeClass = this.order + " active";
      } else if (index == 2) {
        this.isHot = this.isHot == "asc" ? "desc" : "asc";
        this.order = "";
        this.page = 1;
        this.activeClass = this.isHot + " active";
      }
      this.getlistData(true);
    },
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id + "&ral=true",
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>