<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="true">
      <block slot="backText">返回</block>
      <block slot="content">品牌列表</block>
    </cu-custom>
    <div class="brand">
      <div
        @click="branddetail(item.id)"
        v-for="(item, index) in listData"
        :key="index"
        class="list"
      >
        <img :src="item.app_list_pic_url" alt="" />
        <div class="info">
          <span>{{ item.name }}</span>
          <!-- <span>|</span>
        <span>{{item.floor_price}}元起</span> -->
        </div>
      </div>
    </div>
  </view>
</template>

<script>
import { brandlistActionApi } from "@/server/config.js";

export default {
  onPullDownRefresh() {
    this.page = 1;
    this.getData(true);
    //刷新完成后关闭
    uni.stopPullDownRefresh();
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getData();
  },
  created() {},
  mounted() {
    this.getData(true);
  },
  data() {
    return {
      listData: [],
      page: 1,
      total: "",
    };
  },
  components: {},
  methods: {
    async getData(first) {
      const data = await brandlistActionApi({
        page: this.page,
      });
      this.total = data.data.total;
      if (first) {
        this.listData = data.data.data;
      } else {
        this.listData = this.listData.concat(data.data.data);
      }
    },
    branddetail(id) {
      uni.navigateTo({ url: "/apiShop/branddetail/main?id=" + id });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>