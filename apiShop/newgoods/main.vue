<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">商品列表</block>
    </cu-custom>
    <div class="newgoods">
      <!-- <div class="banner">
        <img
          src="https://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/bgnew.png"
          alt=""
        >
      </div> -->
      <div class="sortnav">
        <div @click="changeTab(0)" :class="[0 == nowIndex ? 'active' : '']">
          综合
        </div>
        <div
          @click="changeTab(1)"
          class="price"
          :class="[1 == nowIndex ? activeClass : '']"
        >
          价格
        </div>
        <div
          @click="changeTab(2)"
          class="price"
          :class="[2 == nowIndex ? activeClass : '']"
        >
          销量
        </div>
      </div>
      <div class="sortlist">
        <div
          @click="goodsDetail(item.id)"
          v-for="(item, index) in listData"
          :key="index"
          class="item"
        >
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.name }}</p>
          <p
            class="price"
            v-if="item.active != 'true' && item.is_pintuan != '1'"
          >
            ￥{{ item.retail_price }}
          </p>
          <p
            class="price"
            v-if="item.active == 'true' && item.is_pintuan != '1'"
          >
            ￥{{ item.spike_sum }}
          </p>
          <p
            class="price"
            v-if="item.active != 'true' && item.is_pintuan == '1'"
          >
            ￥{{ item.pt_price }}
          </p>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import { newgoodsGoodsListApi } from "@/server/config.js";

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
    this.spike = options.spike;
    this.pintuan = options.pintuan;
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
    if (this.spike) {
      this.spike = this.spike;
    }
    if (this.pintuan) {
      this.pintuan = this.pintuan;
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
      type: "",
      nowIndex: 0,
      navData: ["综合", "价格", "分类"],
      listData: [],
      activeClass: "",
      spike: "",
      pintuan: "",
    };
  },
  components: {},
  methods: {
    async getlistData(first) {
      if (first) {
        const data = await newgoodsGoodsListApi({
          isHot: this.isHot,
          isNew: this.isNew,
          order: this.order,
          type: this.type,
          id: this.id,
          page: this.page,
          spike: this.spike,
          pintuan: this.pintuan,
        });
        this.listData = data.data.data;
        this.pagetotal = data.data.pagetotal;
      } else {
        const data = await newgoodsGoodsListApi({
          isHot: this.isHot,
          isNew: this.isNew,
          order: this.order,
          id: this.id,
          page: this.page,
          spike: this.spike,
          pintuan: this.pintuan,
        });
        this.listData = this.listData.concat(data.data.data);
      }
    },
    changeTab(index) {
      this.nowIndex = index;
      if (index == 1) {
        this.order = this.order == "asc" ? "desc" : "asc";
        this.page = 1;
        this.type = "price";
        this.activeClass == "";
        this.activeClass = this.order + " active";
      } else if (index == 2) {
        this.order = this.order == "asc" ? "desc" : "asc";
        this.page = 1;
        this.type = "sales";
        this.activeClass = this.order + " active";
      }
      this.getlistData(true);
    },
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id,
      });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>