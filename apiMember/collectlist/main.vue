<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">收藏列表</block>
    </cu-custom>
    <div class="collection">
      <div class="sublist">
        <div
          @click="goodsDetail(subitem.id)"
          v-for="(subitem, subindex) in collectlist"
          :key="subindex"
        >
          <img :src="subitem.list_pic_url" alt="" />
          <p>{{ subitem.name }}</p>
          <p>￥{{ subitem.retail_price }}</p>
        </div>
      </div>
      <div class="onorder" v-if="count === 0">
        <image :src="img_blank"></image>
        <div class="text">这里空空如也~~</div>
      </div>
    </div>
  </view>
</template>

<script>
import { collectlistActionApi } from "@/server/config.js";
import { toLogin } from "@/server/api.js";
export default {
  onShow() {
    //判断是否登录，没有直接跳转登录界面
    toLogin();

    this.page = 1;
    this.getlist(true);
  },
  onPullDownRefresh() {
    setTimeout(function () {
      uni.stopPullDownRefresh(); //停止下拉刷新动画
    }, 1000);
    this.page = this.page - 1;
    if (this.page == 0) {
      this.page = 1;
    }
    this.getlist(true);
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.pagetotal) {
      return false;
    }
    this.getlist();
  },
  created() {},
  mounted() {},
  data() {
    return {
      page: 1,
      collectlist: [],
      count: 0,
      img_blank:
        "http://imgt1.oss-cn-shanghai.aliyuncs.com/ecAllRes/images/no_order.png",
    };
  },
  components: {},
  methods: {
    async getlist(first) {
      if (first) {
        const data = await collectlistActionApi({
          page: this.page,
        });
        this.collectlist = data.data.data;
        this.pagetotal = data.data.pagetotal;
        this.count = this.collectlist.length;
      } else {
        const data = await collectlistActionApi({
          page: this.page,
        });

        this.collectlist = this.collectlist.concat(data.data.data);
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
