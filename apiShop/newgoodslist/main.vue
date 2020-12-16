<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">新品首发</block>
    </cu-custom>
    <div class="newgoods">
      <div class="sortlist">
        <div
          @click="goodsDetail(item.goods_id)"
          v-for="(item, index) in listData"
          :key="index"
          class="item"
        >
          <img :src="item.list_pic_url" alt="" />
          <p class="name">{{ item.goods_name }}</p>
          <p class="price">¥{{ item.shop_price }}</p>
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import {
  integralgoodsGoodsListApi,
  pintuanGoodsListApi,
  spikeGoodsListApi,
} from "@/server/config.js";

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
      listData: [],
      activeClass: "",
    };
  },
  components: {},
  methods: {
    async getlistData() {
      const data = await spikeGoodsListApi({
        page: this.page,
      });

      if (this.page == 1) {
        this.listData = data.data.list;
      }
      this.pagetotal = data.data.pagetotal;
      if (this.page > 1) {
        this.listData = this.listData.concat(data.data.list);
      }
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