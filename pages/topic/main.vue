<template>
  <view>
    <cu-custom bgColor="bg-white" :isBack="false">
      <block slot="backText">返回</block>
      <block slot="content">文章列表</block>
    </cu-custom>
    <div class="topic">
      <ul class="list">
        <li
          @click="topicDetail(item.id)"
          v-for="(item, index) in topicList"
          :key="index"
        >
          <div class="t-img">
            <img :src="item.scene_pic_url" alt="" />
          </div>
          <div class="info">
            <p>{{ item.title }}</p>
            <p>{{ item.subtitle }}</p>
            <!-- <p>{{item.price_info}}元起</p> -->
          </div>
        </li>
      </ul>
    </div>
  </view>
</template>

<script>
import { topicListApi } from "@/server/config.js";
import Jfooter from "@/components/footer/footer.vue";
export default {
  onPullDownRefresh() {
    this.page = 1;
    this.getListData(true);
    //刷新完成后关闭
    uni.stopPullDownRefresh();
  },
  onReachBottom() {
    this.page = this.page + 1;
    if (this.page > this.total) {
      return false;
    }
    this.getListData();
  },
  created() {},
  mounted() {
    this.getListData(true);
  },
  data() {
    return {
      topicList: [],
      page: 1,
      total: "",
    };
  },
  components: {},
  methods: {
    async getListData(first) {
      const data = await topicListApi({ page: this.page });
      this.total = data.data.total;
      if (first) {
        this.topicList = data.data.data;
      } else {
        //上拉加载跟多
        this.topicList = this.topicList.concat(data.data.data);
      }
    },
    topicDetail(id) {
      // console.log(id);
      uni.navigateTo({ url: "/apiShop/topicdetail/main?id=" + id });
    },
  },
  computed: {},
};
</script>
<style lang='scss' scoped>
@import "./style";
</style>
