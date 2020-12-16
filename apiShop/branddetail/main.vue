<template>
  <view>
    <cu-custom
      bgColor="bg-white"
      :isBack="true"
    >
      <block slot="backText">返回</block>
      <block slot="content">品牌详情</block>
    </cu-custom>
    <div class="branddetail">
    <div class="banner">
      <img
        :src="detailData.list_pic_url"
        alt=""
      >
      <div class="info">
        <span>{{ detailData.brand_name }}</span>
      </div>
    </div>
    <div class="info-desc">
      <rich-text :nodes="content" />
      </rich-text>
    </div>
    <div
      v-if="goodsList.length!=0"
      class="sortlist"
    >
      <div
        @click="goodsDetail(item.goods_id)"
        v-for="(item, index) in goodsList"
        :key="index"
        class="item"
      >
        <img
          :src="item.list_pic_url"
          alt=""
        >
        <p class="name">{{item.name}}</p>
        <p class="price">￥{{item.retail_price}}</p>
      </div>
    </div>
    <div
      v-else
      class="none"
    >
      数据库暂无数据...
    </div>
  </div>
  </view>
</template>

<script>
import { brandDetaiLactionApi } from "@/server/config.js";

export default {
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.pagetotal) {
      return false;
    }
    this.getDetail();
  },
  created() {},
  onLoad(options) {
    this.id = options.id;
  },
  mounted() {
    this.id = this.id;
    this.getDetail(true);
  },
  data() {
    return {
      id: "",
      page: 1,
      detailData: {},
      goodsList: [],
      content: "",
    };
  },
  components: {},
  methods: {
    goodsDetail(id) {
      uni.navigateTo({
        url: "/apiShop/goods/main?id=" + id,
      });
    },
    async getDetail(first) {
      if (first) {
        this.page = 1;
        const data = await brandDetaiLactionApi({
          id: this.id,
          page: this.page,
        });
        this.detailData = data.data.data;
        this.goodsList = data.data.goodsList;
        this.content = data.data.data.brand_desc;
        this.pagetotal = data.data.pagetotal;
        console.log(this.pagetotal);
      } else {
        const data = await brandDetaiLactionApi({
          id: this.id,
          page: this.page,
        });
        this.goodsList = this.goodsList.concat(data.data.goodsList);
      }
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>